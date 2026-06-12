-- Add private_key for PRIVATE conversations and enforce uniqueness
-- Backfill private_key as minUserId:maxUserId for private conversations
-- Deduplicate existing private conversations by keeping the smallest id

-- add column if not exists (safe to run multiple times)
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS private_key VARCHAR(100);

-- backfill private_key for PRIVATE conversations that have exactly two members
WITH pairs AS (
  SELECT c.id,
         LEAST(m1.user_id, m2.user_id)::text AS a,
         GREATEST(m1.user_id, m2.user_id)::text AS b
  FROM conversations c
  JOIN conversation_members m1 ON m1.conversation_id = c.id
  JOIN conversation_members m2 ON m2.conversation_id = c.id AND m1.user_id < m2.user_id
  WHERE c.type = 'PRIVATE'
)
UPDATE conversations
SET private_key = pairs.a || ':' || pairs.b
FROM pairs
WHERE conversations.id = pairs.id;

-- find duplicates (same private_key) and delete all but the smallest id
WITH duplicates AS (
  SELECT private_key, MIN(id) AS keep_id, ARRAY_AGG(id) AS all_ids
  FROM conversations
  WHERE type = 'PRIVATE' AND private_key IS NOT NULL
  GROUP BY private_key
  HAVING COUNT(*) > 1
),
to_delete AS (
  SELECT (unnest(all_ids))::bigint AS id, keep_id FROM duplicates
)
DELETE FROM conversations
WHERE id IN (SELECT id FROM to_delete WHERE id <> keep_id);

-- remove PRIVATE conversations that have more than 2 members (data inconsistency)
DELETE FROM conversations c
USING (
  SELECT conversation_id
  FROM conversation_members
  GROUP BY conversation_id
  HAVING COUNT(user_id) > 2
) cm
WHERE c.id = cm.conversation_id AND c.type = 'PRIVATE';

-- create partial unique index for PRIVATE conversations
CREATE UNIQUE INDEX IF NOT EXISTS ux_conversations_private_key ON conversations (private_key)
WHERE type = 'PRIVATE' AND private_key IS NOT NULL;

-- Note: Flyway runs each migration in a transaction for Postgres by default;
-- avoid explicit BEGIN/COMMIT in SQL migration files.