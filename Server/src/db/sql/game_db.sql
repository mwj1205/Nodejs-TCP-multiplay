CREATE TABLE IF NOT EXISTS user_coordinate
(
    device_id  VARCHAR(255) PRIMARY KEY,
    x          DOUBLE,
    y          DOUBLE,
    end_time   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);