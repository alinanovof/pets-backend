const express = require("express");
const bcrypt = require("bcrypt");
const {
  addUser,
  getUserByEmail,
  getUserById,
  updateUser,
  getUsers
} = require("../data/users");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { check, checkSchema, validationResult } = require("express-validator");
const { signUpSchema, updateProfileSchema } = require('../lib/validationSchema')

router.post(
  "/",
  checkSchema(signUpSchema),
  check("passwordConfirmation")
  .custom((passwordConfirmation, {req}) => {
      if (passwordConfirmation !== req.body.password) {
          throw new Error("Passwords don't match");
      } else {
          return passwordConfirmation;
      }
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, first_name, last_name, tel } = req.body;
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) next(err);
      else {
        await addUser(email, hash, first_name, last_name, tel);
        res.status(200).json({ message: 'Signed in successfully' });
      }
    });
  }
);

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  res.send({ user: user });
});

router.get('/all', auth, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  if(!user){
    res.status(401).send({ message: 'Only registered users can see the users'})
  }
  const results = await getUsers();
  res.send({ users: results });
});

router.put("/:id", auth, async (req, res, next) => {
  const { email, password, firstName, lastName, tel, bio } = req.body;
  const userId = req.user.id;

  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) next(err);
    else {
      const updUser = await updateUser(
        email,
        hash,
        firstName,
        lastName,
        tel,
        bio,
        userId
      );
      res.status(200).json({ message: 'Profile updated successfully' })
    }
  });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(404).send("User not found with this email");
    return;
  }
  bcrypt.compare(password, user.password_hash, (err, result) => {
    if (err) next(err);
    else {
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.send({
          token,
          user: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            tel: user.tel,
            created_date: user.created_date,
            id: user.id,
          },
        });
      } else {
        res.status(401).send("Incorrect password");
      }
    }
  });
});

module.exports = router;
