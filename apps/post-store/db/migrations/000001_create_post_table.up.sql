CREATE TABLE IF NOT EXISTS posts
(
    id UUID PRIMARY KEY,

    message STRING NOT NULL,

    user_id STRING NOT NULL,

    publish_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,

    INDEX user_id_index (user_id, publish_at ASC)
);