export const insertQuery = (dbconn, table_name, data) => {
  return `INSERT INTO ${table_name} (${Object.keys(data).join(
    ", "
  )}) VALUES (${Object.values(data)
    .map((value) => dbconn.escape(value))
    .join(", ")})`;
};

export const updateQuery = (dbconn, table_name, data, condition) => {
  const setClause = Object.keys(data)
    .map((key) => `${key} = ${dbconn.escape(data[key])}`)
    .join(", ");

  return `UPDATE ${table_name} SET ${setClause} WHERE ${condition}`;
};
