const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 3000;

require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI_PROD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "MyDataBase",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const routes = require("./Routes/Routes");
app.use("/", routes);

app.get("/", (req, res) => res.status(200).send("Server up!"));

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
