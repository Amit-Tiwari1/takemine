export const insertQuery = (dbconn, table_name, data) => {
  return `INSERT INTO ${table_name} (${Object.keys(data).join(
    ", "
  )}) VALUES (${Object.values(data)
    .map((value) => dbconn.escape(value))
    .join(", ")})`;
};
