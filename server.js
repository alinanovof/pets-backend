const path = require("path");
const result = require("dotenv").config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
  throw new Error(result.error);
}

const express = require("express");
const pino = require("pino-http");
const logger = require("pino-http");
const app = express();
const { uploadedFilesFolderName } = require("./middlewares/multipart");
const cors = require("cors");
const { postgrator, query } = require("./lib/db");

app.use(express.json());
app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(require("cors")());
app.use(cors());

app.use("/" + uploadedFilesFolderName, express.static(uploadedFilesFolderName));

app.use("/pets", require("./routes/pets"));
app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  req.log.debug(req.params);
  res.send("Welcome, guest");
});

const host = process.env.HOST;
const port = +process.env.PORT;

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(port, host, () => {
      console.log(`server is listening at http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
