const express = require('express');
const { getPets, createPet, getPetsByUserId, getPet, deletePet, getPetById, updatePet, changePetOwner } = require('../data/pets');
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

router.put('/me/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const pet = await getPetById(id);
  const newPet = await changePetOwner(userId, id, req.body.adoptStatus);
  res.send({ newPet })
})

router.get('/:id', auth, async(req, res) =>{
  const { id } = req.params;
  const pet = await getPetById(id);
  res.send({ pet })
})

router.put('/:id', auth, async(req, res) =>{
  const { id } = req.params;
  const pet = await getPetById(id);
  const { pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } = req.body;
  await updatePet(id, pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed);
  console.log(req.body)
  res.send({ pet: { id, pet_type, pet_name, adopt_status, image_link, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } });
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