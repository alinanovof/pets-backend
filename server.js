// //login app is created with help of Web Dev Simplified and this video: https://www.youtube.com/watch?v=-RCnNyD0L-s

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require('method-override')
const cors = require('cors')
const { postgrator, query } = require('./lib/db');


const initializePassport = require("./passport-config");
initializePassport(passport, 
  email => users.find((user) => user.email === email),
  id => users.find(user => user.id === id)
);

// const users = [];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))
app.use(cors());
app.use('/pets', require('./routes/pets'));
app.use('/users', require('./routes/users'));

app.get("/", (req, res) => {
    res.send("Welcome, guest");
  
});
 
const host = '127.0.0.1';
const port = '5500';

app.listen(5050, () => console.log('Listening on port 5050'))
 
postgrator.migrate().then((result) => {
  console.log(`migrated db successfully:`, result);
  app.listen(port, host, () => {
    console.log(`server is listening at http://${host}:${port}`);
  });
}).catch(error => console.error(error));
 
// // app.get("/login", checkNotAuthenticated, (req, res) => {
// //   res.send('');
// // });

// // app.get("/register", checkNotAuthenticated, (req, res) => {
// //   res.render("register.ejs");
// // });

// // app.post(
// //   "/login", checkNotAuthenticated,
// //   passport.authenticate("local", {
// //     successRedirect: "/home",
// //     failureRedirect: "/login",
// //     failureFlash: true,
// //   })
// // );

// app.post("/register", 
// // checkNotAuthenticated, 
// async (req, res) => {
//   try {

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//       fname: req.body.fname,
//       lname: req.body.lname,
//       tel: req.body.tel,
//     });
//     // res.redirect("/login");
//   } catch {
//     if (e.code === 11000) {
//       res.status(400).send("Account with this email already exists");
//     } else {
//       res.status(400).send(e.message);
//     }
//   }
// });

// // app.delete('/logout', (req, res) => {
// //   req.logOut()
// //   // res.redirect('/login')
// // })

// // function checkAuthenticated(req ,res, next){
// //   if(req.isAuthenticated()){
// //     return next()
// //   }

// //   // res.redirect('/login')
// // }

// // function checkNotAuthenticated(req ,res, next){
// //   if(req.isAuthenticated()){
// //     res.redirect('/')
// //   }
// //   next()
// //   // return res.redirect('/login')
// // }
