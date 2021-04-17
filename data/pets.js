const { query } = require('../lib/db');
const SQL = require('@nearform/sql');

function getPets() {
  return query(SQL`SELECT * FROM pets`);
}
exports.getPets = getPets;

function createPet(name, type, color, breed) {
  const sql = SQL`INSERT INTO pets (name, type, color, breed) VALUES ('${name}', ${type}, '${color}', '${breed}')`;
  return query(sql);
}
exports.createPet = createPet;