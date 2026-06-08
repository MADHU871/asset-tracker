const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Asset Tracker Application</h1>
    <h2>DevOps Project Running Successfully</h2>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});