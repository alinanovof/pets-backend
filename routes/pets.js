const express = require('express');
const { getPets, createPet, getPetsByUserId, updatePetPicture, getPet, deletePet, getPetById, updatePet, changePetOwner, addPetPicture, searchPet, searchText } = require('../data/pets');
const jwt = require('jsonwebtoken');
const { auth } = require('../middlewares/auth');
const { getUserById } = require('../data/users');
const { upload } = require('../middlewares/multipart');
const { uploadToCloudinary } = require('../lib/cloudinary');
const fs = require('fs');
const router = express.Router();
const { validationResult } = require("express-validator");
const { petsAddSchema } = require('../lib/validationSchema')

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
  // const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  const {id} = req.body;
  const { pet_type, pet_name, adopt_status, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } = req.body.pet;
  await createPet(id, pet_type, pet_name, adopt_status, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed, null);
  res.send({ pet: { id, pet_type, pet_name, adopt_status,  pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } });
});

router.post('/:id/picture_url', upload.single('file'), auth, 
  async (req, res) => {
  const result = await uploadToCloudinary(req.file.path);
  const { id } = req.params;
  const url = result.secure_url
  await updatePetPicture(url, id)
  fs.unlinkSync(req.file.path);
  res.send({ pictureUrl: result.secure_url });
});

router.get('/me', auth, async (req, res) => {
  const userId = req.user.id;
  const pets = await getPetsByUserId(userId);
  res.send({ pets })
})

router.put('/me/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const pet = await getPetById(id);
  const newPet = await changePetOwner(userId, id, req.body.adoptStatus);
  res.send({ newPet })
})

router.get('/:id', auth, async(req, res) =>{
  const { id } = req.params;
  const pet = await getPetById(id);
  res.send({ pet })
})

router.put('/:id', auth,  async(req, res) =>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    console.log(req.body)
  const { id } = req.params;
  const { pet_type, pet_name, adopt_status, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed } = req.body;
  await updatePet(pet_type, pet_name, adopt_status, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed, id);
   res.send({ pet: { pet_type, pet_name, adopt_status, pet_height, pet_weight, color, bio, hypoallerg, diet_restr, breed, id } });
  } catch(err){
    console.error(err)
  }
  
})

router.put('/:id/picture_url', upload.single('file'), auth, 
async (req, res) =>{
  try{
    const result = await uploadToCloudinary(req.file.path);
  const { id } = req.params;
  const url = result.secure_url
  await updatePetPicture(url, id)
  fs.unlinkSync(req.file.path);
  res.send({ pictureUrl: result.secure_url });
  } catch(err){
    console.error(err)
  }
  
});

router.get('/search/:type', async (req, res) =>{
  const petType = req.params.type
  const results = await searchPet(petType);
  res.send({ pets: results });
})

router.get('/search/:name', auth, async (req, res) =>{
  const name = req.params.type
  const results = await searchText(name);
  res.send({ pets: results });
})

router.delete('/:id', auth, async (req, res) => {
    const userId = req.user.id;
    const { petId } = req.params
    const pet = await getPetById(petId);
  const user = await getUserById(userId)
  const canDeletePet = user.role === 'admin';
  if(!canDeletePet){
    res.status(403).send({message: 'Only admin can delete'})
    return;
  }
  await deletePet(petId);
  res.send({ message: 'Deleted successfully'})
})

module.exports = router; 