export const GAME_DB_SQL_QUERIES = {
  GET_GAME_POSITION: `
  SELECT 
    x,
    y,
    end_time
  FROM game_position
  WHERE device_id = ?
  LIMIT 1
`,
  UPSERT_GAME_POSITION: `
    INSERT INTO game_position (
      device_id,
      x,
      y,
      end_time
    ) VALUES (
      ?,
      ?,
      ?,
      CURRENT_TIMESTAMP
    )
    ON DUPLICATE KEY UPDATE
      x = VALUES(x),
      y = VALUES(y),
      end_time = CURRENT_TIMESTAMP
  `,
};
