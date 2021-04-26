const path = require('path');
const result = require('dotenv').config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});



const express = require("express");
const app = express();
// const pino = require('pino-http');
const cors = require('cors')
const { postgrator, query } = require('./lib/db');


// app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(express.json());
app.use(require('cors')());
app.use(cors());
 
app.use('/pets', require('./routes/pets'));
app.use('/users', require('./routes/users'));

app.get("/", (req, res) => {
    res.send("Welcome, guest");
});
 
const host = '127.0.0.1';
const port = '5050'; 
 
postgrator.migrate().then((result) => {
  console.log(`migrated db successfully:`, result);
  app.listen(port, host, () => {
    console.log(`server is listening at http://${host}:${port}`);
  });
}).catch(error => console.error(error)); 
 