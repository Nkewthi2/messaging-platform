-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar TEXT,
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    role VARCHAR(20) DEFAULT 'USER'
        CHECK (role IN ('USER', 'ADMIN'))
);

-- =========================
-- CONVERSATIONS
-- =========================
CREATE TABLE conversations (
    id BIGSERIAL PRIMARY KEY,

    type VARCHAR(20) NOT NULL
        CHECK (type IN ('PRIVATE', 'GROUP')),

    name VARCHAR(100),

    last_message_id VARCHAR(64), -- reference MongoDB message

    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- CONVERSATION MEMBERS
-- =========================
CREATE TABLE conversation_members (
    conversation_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    role VARCHAR(20) DEFAULT 'MEMBER'
        CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER')),

    joined_at TIMESTAMP DEFAULT NOW(),

    PRIMARY KEY (conversation_id, user_id),

    FOREIGN KEY (conversation_id)
        REFERENCES conversations(id)
        ON DELETE CASCADE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =========================
-- MESSAGE RECEIPTS (DELIVERED / READ)
-- =========================
CREATE TABLE message_receipts (
    message_id VARCHAR(64) NOT NULL,  -- MongoDB ObjectId

    user_id BIGINT NOT NULL,

    delivered_at TIMESTAMP,
    read_at TIMESTAMP,

    PRIMARY KEY (message_id, user_id),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX idx_members_user
ON conversation_members(user_id);

CREATE INDEX idx_receipts_user
ON message_receipts(user_id);

CREATE INDEX idx_conversations_last_message
ON conversations(last_message_id);

CREATE INDEX idx_users_role
ON users(role);