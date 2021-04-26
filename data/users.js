const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function addUser(email, passwordHash, firstName, lastName, tel) {
  return query(SQL`INSERT INTO users (email, password_hash, first_name, last_name, tel) VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName}, ${tel})`)
}
exports.addUser = addUser;

async function getUserByEmail(email) {
  const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
  return rows[0];
}
exports.getUserByEmail = getUserByEmail;

async function getUserById (userId) {
  const sql = SQL`SELECT * FROM users WHERE id=${userId}`;
  const rows = await query(sql);
  return rows[0];
}
exports.getUserById = getUserById;