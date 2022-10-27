const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config/env/dev.env" });

const port = process.env.PORT || 8000;
const db = require("./config/db");
const movieRoutes = require("./modules/movies/routes");

app.use(cors());
app.use(express.json());
app.use("/", movieRoutes);

app.listen(port, () => {
  db.connect((err) => {
    if (err) console.error(err);
  });
  console.log(`server is listening on port ${port}`);
});
