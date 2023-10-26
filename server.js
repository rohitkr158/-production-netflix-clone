const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://bhaktikotak3858:bhakti1234@cluster0.2d2j2q6.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

//static files
app.use(express.static(path.join(__dirname, "./netflix-ui/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./netflix-ui/build/index.html"));
});

app.listen(PORT, () => {
  console.log("server started on port 8000");
});

