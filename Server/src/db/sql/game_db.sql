CREATE TABLE IF NOT EXISTS user_coordinate
(
    id         VARCHAR(36) PRIMARY KEY,
    device_id  VARCHAR(255) UNIQUE NOT NULL,
    x          DOUBLE,
    y          DOUBLE,
    end_time   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
