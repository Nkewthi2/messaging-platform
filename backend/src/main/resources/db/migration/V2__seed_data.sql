-- =========================
-- SEED DATA - Users
-- =========================
INSERT INTO users (username, password, avatar, last_seen, created_at, role) VALUES
('john_doe', '$2a$10$slYQmyNdGzin7olVi9hFNOYvxWXbVxVrQv8.N8.9ZQ.K3QQP.7Zp.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '7 days', 'ADMIN'),
('jane_smith', '$2a$10$slYQmyNdGzin7olVi9hFNOYvxWXbVxVrQv8.N8.9ZQ.K3QQP.7Zp.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '10 days', 'USER'),
('bob_johnson', '$2a$10$slYQmyNdGzin7olVi9hFNOYvxWXbVxVrQv8.N8.9ZQ.K3QQP.7Zp.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '5 days', 'USER'),
('alice_williams', '$2a$10$slYQmyNdGzin7olVi9hFNOYvxWXbVxVrQv8.N8.9ZQ.K3QQP.7Zp.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', NOW() - INTERVAL '45 minutes', NOW() - INTERVAL '3 days', 'USER'),
('charlie_brown', '$2a$10$slYQmyNdGzin7olVi9hFNOYvxWXbVxVrQv8.N8.9ZQ.K3QQP.7Zp.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', NOW() - INTERVAL '20 minutes', NOW() - INTERVAL '1 day', 'USER');

-- =========================
-- SEED DATA - Conversations (Private)
-- =========================
INSERT INTO conversations (type, name, last_message_id, created_at) VALUES
('PRIVATE', NULL, '66a1b2c3d4e5f6g7h8i9j0k1', NOW() - INTERVAL '6 days'),
('PRIVATE', NULL, '66a1b2c3d4e5f6g7h8i9j0k2', NOW() - INTERVAL '4 days'),
('PRIVATE', NULL, '66a1b2c3d4e5f6g7h8i9j0k3', NOW() - INTERVAL '2 days'),
('PRIVATE', NULL, '66a1b2c3d4e5f6g7h8i9j0k4', NOW() - INTERVAL '1 day');

-- =========================
-- SEED DATA - Conversations (Group)
-- =========================
INSERT INTO conversations (type, name, last_message_id, created_at) VALUES
('GROUP', 'Development Team', '66a1b2c3d4e5f6g7h8i9j0k5', NOW() - INTERVAL '14 days'),
('GROUP', 'Project Managers', '66a1b2c3d4e5f6g7h8i9j0k6', NOW() - INTERVAL '10 days'),
('GROUP', 'General Discussion', '66a1b2c3d4e5f6g7h8i9j0k7', NOW() - INTERVAL '8 days');

-- =========================
-- SEED DATA - Conversation Members (Private: John <-> Jane)
-- =========================
INSERT INTO conversation_members (conversation_id, user_id, role, joined_at) VALUES
(1, 1, 'OWNER', NOW() - INTERVAL '6 days'),
(1, 2, 'MEMBER', NOW() - INTERVAL '6 days');

-- =========================
-- SEED DATA - Conversation Members (Private: John <-> Bob)
-- =========================
INSERT INTO conversation_members (conversation_id, user_id, role, joined_at) VALUES
(2, 1, 'OWNER', NOW() - INTERVAL '4 days'),
(2, 3, 'MEMBER', NOW() - INTERVAL '4 days');

-- =========================
-- SEED DATA - Conversation Members (Private: Jane <-> Bob)
-- =========================
INSERT INTO conversation_members (conversation_id, user_id, role, joined_at) VALUES
(3, 2, 'OWNER', NOW() - INTERVAL '2 days'),
(3, 3, 'MEMBER', NOW() - INTERVAL '2 days');

-- =========================
-- SEED DATA - Conversation Members (Private: Alice <-> Charlie)
-- =========================
INSERT INTO conversation_members (conversation_id, user_id, role, joined_at) VALUES
(4, 4, 'OWNER', NOW() - INTERVAL '1 day'),
(4, 5, 'MEMBER', NOW() - INTERVAL '1 day');

-- =========================
-- SEED DATA - Conversation Members (Group: Development Team)
-- =========================
INSERT INTO conversation_members (conversation_id, user_id, role, joined_at) VALUES
(5, 1, 'OWNER', NOW() - INTERVAL '14 days'),
(5, 2, 'ADMIN', NOW() - INTERVAL '14 days'),
(5, 3, 'MEMBER', NOW() - INTERVAL '14 days'),
(5, 4, 'MEMBER', NOW() - INTERVAL '10 days');

-- =========================
-- SEED DATA - Conversation Members (Group: Project Managers)
-- =========================
INSERT INTO conversation_members (conversation_id, user_id, role, joined_at) VALUES
(6, 2, 'OWNER', NOW() - INTERVAL '10 days'),
(6, 1, 'ADMIN', NOW() - INTERVAL '10 days'),
(6, 4, 'MEMBER', NOW() - INTERVAL '8 days');

-- =========================
-- SEED DATA - Conversation Members (Group: General Discussion)
-- =========================
INSERT INTO conversation_members (conversation_id, user_id, role, joined_at) VALUES
(7, 1, 'OWNER', NOW() - INTERVAL '8 days'),
(7, 2, 'MEMBER', NOW() - INTERVAL '8 days'),
(7, 3, 'MEMBER', NOW() - INTERVAL '7 days'),
(7, 4, 'MEMBER', NOW() - INTERVAL '6 days'),
(7, 5, 'MEMBER', NOW() - INTERVAL '5 days');

-- =========================
-- SEED DATA - Message Receipts (Private: John <-> Jane)
-- =========================
INSERT INTO message_receipts (message_id, user_id, delivered_at, read_at) VALUES
('66a1b2c3d4e5f6g7h8i9j0k1', 1, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('66a1b2c3d4e5f6g7h8i9j0k1', 2, NOW() - INTERVAL '6 days' + INTERVAL '5 minutes', NOW() - INTERVAL '6 days' + INTERVAL '10 minutes');

-- =========================
-- SEED DATA - Message Receipts (Private: John <-> Bob)
-- =========================
INSERT INTO message_receipts (message_id, user_id, delivered_at, read_at) VALUES
('66a1b2c3d4e5f6g7h8i9j0k2', 1, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('66a1b2c3d4e5f6g7h8i9j0k2', 3, NOW() - INTERVAL '4 days' + INTERVAL '2 minutes', NOW() - INTERVAL '4 days' + INTERVAL '15 minutes');

-- =========================
-- SEED DATA - Message Receipts (Group: Development Team)
-- =========================
INSERT INTO message_receipts (message_id, user_id, delivered_at, read_at) VALUES
('66a1b2c3d4e5f6g7h8i9j0k5', 1, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('66a1b2c3d4e5f6g7h8i9j0k5', 2, NOW() - INTERVAL '1 day' + INTERVAL '3 minutes', NOW() - INTERVAL '1 day' + INTERVAL '20 minutes'),
('66a1b2c3d4e5f6g7h8i9j0k5', 3, NOW() - INTERVAL '1 day' + INTERVAL '5 minutes', NULL),
('66a1b2c3d4e5f6g7h8i9j0k5', 4, NOW() - INTERVAL '1 day' + INTERVAL '7 minutes', NULL);

-- =========================
-- SEED DATA - Message Receipts (Group: General Discussion)
-- =========================
INSERT INTO message_receipts (message_id, user_id, delivered_at, read_at) VALUES
('66a1b2c3d4e5f6g7h8i9j0k7', 1, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),
('66a1b2c3d4e5f6g7h8i9j0k7', 2, NOW() - INTERVAL '2 hours' + INTERVAL '2 minutes', NOW() - INTERVAL '2 hours' + INTERVAL '10 minutes'),
('66a1b2c3d4e5f6g7h8i9j0k7', 3, NOW() - INTERVAL '2 hours' + INTERVAL '4 minutes', NULL),
('66a1b2c3d4e5f6g7h8i9j0k7', 4, NOW() - INTERVAL '2 hours' + INTERVAL '6 minutes', NULL),
('66a1b2c3d4e5f6g7h8i9j0k7', 5, NOW() - INTERVAL '2 hours' + INTERVAL '8 minutes', NOW() - INTERVAL '90 minutes');
