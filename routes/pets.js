const express = require('express');
const { getPets, createPet } = require('../data/pets');

const router = express.Router();

router.get('/', async (req, res) => {
  const results = await getPets();
  res.send({ pets: results });
});


router.post('/', async (req, res) => {
  const { pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } = req.body;
  await createPet(pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed);
  res.send({ pets: { pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } });
});

module.exports = router;