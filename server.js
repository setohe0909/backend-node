const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("./socket");
const router = require("./network/routes");
const db = require("./db");

require("dotenv").config();
db(process.env.ATLAS_URI);

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use("/app", express.static("public"));
app.listen(process.env.PORT, () =>
  console.log("Server is running on port: http://localhost:3000")
);
