const express = require('express');
const { getPets, createPet, getPetsByUserId, getPet, deletePet } = require('../data/pets');
const jwt = require('jsonwebtoken');
const { auth } = require('../middlewares/auth');
const { getUserById } = require('../data/users');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  if(!user){
    res.status(401).send({ message: 'Only registered users can see the pets'})
  }
  const results = await getPets();
  res.send({ pets: results });
});


router.post('/', auth, async (req, res) => {
  
  const { pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } = req.body;
  const id = await createPet(pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed, req.user.id);
  res.send({ pet: { id, pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } });
});

router.get('/me', auth, async (req, res) => {
  const userId = req.user.id;
  const pets = await getPetsByUserId(userId);
  res.send({ pets })
})


// router.delete('/:petId', auth, async (req, res) => {
  //   const userId = req.user.id;
  //   const { petId } = req.params
  //   const pet = await getPetById(petId);
//   const user = await getUserById(userId)
//   const canDeletePet = user.role === 'admin';
//   if(!canDeletePet){
//     res.status(403).send({message: 'Only admin can delete'})
//     return;
//   }
//   await deletePet(petId);
//   res.send({ message: 'Deleted successfully'})
// })

module.exports = router; 