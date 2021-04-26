const express = require('express');
const bcrypt = require('bcrypt');
const { addUser, getUserByEmail, getUserById } = require('../data/users');
const jwt = require('jsonwebtoken')
const router = express.Router();
const { auth } = require('../middlewares/auth');

router.post('/', async (req, res, next) => {
  const { email, password,  first_name, last_name, tel } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) next(err);
    else {
      await addUser(email, hash,  first_name, last_name, tel);
      res.send({ user: { email } });
    }
  })
});

router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  if(!user){
    res.status(401).send({ message: 'No user'})
  }
  res.send({ user: user });
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(404).send('User not found with this email');
    return;
  }
  bcrypt.compare(password, user.password_hash, (err, result) => {
    if (err) next(err);
    else {
      if (result) {
        const token = jwt.sign({ id: user.id }, "secretPasswordush")
        res.send({
          token,
          user: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            tel: user.tel,
            created_date: user.created_date,
            id: user.id
          }
        });
      } else {
        res.status(401).send('Incorrect password');
      }
    }
  });
})

// router.post('/logout', auth, async (req, res) =>{
  
// })

module.exports = router;