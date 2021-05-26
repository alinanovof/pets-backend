const { query } = require("../lib/db");
const SQL = require("@nearform/sql");
const { v4: uuid } = require('uuid');

function getPets() {
  return query(SQL`SELECT * FROM pets`);
}
exports.getPets = getPets;

function createPet(
  id,
  pet_type,
  pet_name,
  adopt_status,
  pet_height,
  pet_weight,
  color,
  bio,
  hypoallerg,
  diet_restr,
  breed,
  userId
) {

  const sql = SQL`INSERT INTO pets (id, pet_type, pet_name, adopt_status, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed, userId) VALUES ( ${id}, ${pet_type}, ${pet_name}, ${adopt_status}, ${pet_height}, ${pet_weight}, ${color}, ${bio}, ${hypoallerg}, ${diet_restr}, ${breed}, ${userId} )`;
  console.log(sql)
  return query(sql);
}
exports.createPet = createPet;

// function addPetPicture(pictureUrl, id){
//   console.log(pictureUrl, id)
//   const sql = SQL`INSERT INTO pets (image_link) VALUES ${pictureUrl} WHERE id = ${id}`;
//   console.log(sql)
//   return query(sql);
// }
// exports.addPetPicture = addPetPicture;

function updatePetPicture(pictureUrl, id){
  const sql = SQL`UPDATE pets SET image_link = ${pictureUrl} WHERE id = ${id}`;
  console.log(sql)
  return query(sql);
}
exports.updatePetPicture = updatePetPicture;

function updatePet(
  pet_type,
  pet_name,
  adopt_status,
  pet_height,
  pet_weight,
  color,
  bio,
  hypoallerg,
  diet_restr,
  breed,
  id,
) {
  const sql = SQL`UPDATE pets SET pet_type = ${pet_type}, pet_name = ${pet_name}, adopt_status = ${adopt_status}, pet_height = ${pet_height}, pet_weight = ${pet_weight}, color = ${color}, bio = ${bio}, hypoallerg = ${hypoallerg}, diet_restr = ${diet_restr}, breed = ${breed} WHERE id = ${id}`;
  
  return query(sql);
}
exports.updatePet = updatePet;


function changePetOwner(userId, id, adopt_status){
  const sql = SQL`UPDATE pets SET userId = ${userId}, adopt_status = ${adopt_status}  WHERE id = ${id}`
  return query(sql);
}
exports.changePetOwner = changePetOwner;

function getPetsByUserId(userId) {
  const sql = SQL`SELECT * FROM pets WHERE userId = ${userId}`;
  return query(sql);
}
exports.getPetsByUserId = getPetsByUserId;

function getPetById(id) {
  const sql = SQL`SELECT * FROM pets WHERE id = ${id} `;
  return query(sql);
}
exports.getPetById = getPetById;

function deletePet(id){
  const sql = SQL`DELETE FROM pets WHERE id = ${id}`;
  return query(sql)
}
exports.deletePet = deletePet;

function searchPet(pet_type) {
  const sql = SQL`SELECT * FROM pets WHERE pet_type = ${pet_type} `;
  return query(sql);
}
exports.searchPet = searchPet;

function searchText(search) {
  const sql = SQL`SELECT * FROM pets WHERE pet_name LIKE '%${search}%'`;
  return query(sql);
}
exports.searchText = searchText;