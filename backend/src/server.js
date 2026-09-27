const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("CampusDoc backend is running!");
});

app.listen(PORT, () => {
  console.log(`CampusDoc backend running on http://localhost:${PORT}`);
});