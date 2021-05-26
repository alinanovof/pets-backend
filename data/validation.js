const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

async function checkEmailExists(email){
    const sql = SQL`SELECT email FROM users WHERE email=${email}`;
    const rows = await query(sql);
    return rows.length;
  }
exports.checkEmailExists = checkEmailExists

async function checkTelExists(tel){
    const sql = SQL`SELECT tel FROM users WHERE tel=${tel}`;
    const rows = await query(sql);
    return rows.length;
  }
exports.checkTelExists = checkTelExists