const { query } = require("../lib/db");
const SQL = require("@nearform/sql");
const { v4: uuid } = require('uuid');

function getPets() {
  return query(SQL`SELECT * FROM pets`);
}
exports.getPets = getPets;

function createPet(
  pet_type,
  pet_name,
  adopt_status,
  image_link,
  pet_height,
  pet_weight,
  color,
  bio,
  hypoallerg,
  diet_restr,
  breed,
  userId
) {
  const id = uuid();
  const sql = SQL`INSERT INTO pets (id, pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed, userId) VALUES (${id}, ${pet_type}, ${pet_name}, ${adopt_status}, ${image_link}, ${pet_height}, ${pet_weight}, ${color}, ${bio}, ${hypoallerg}, ${diet_restr}, ${breed}, ${userId} )`;
  return query(sql);
}
exports.createPet = createPet;

function getPetsByUserId(userId) {
  const sql = SQL`SELECT * FROM pets WHERE userId = ${userId}`;
  return query(sql);
}
exports.getPetsByUserId = getPetsByUserId;

function getPetById(id) {
  const sql = SQL`SELECT * FROM pets WHERE id = ${id}`;
  return query(sql);
}
exports.getPetById = getPetById;

// function deletePet(id){
//   const sql = SQL`DELETE FROM pets WHERE id = id`;
//   return query(sql)
// }
// exports.deletePet = deletePet()
