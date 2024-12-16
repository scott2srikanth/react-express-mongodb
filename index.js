require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const express = require("express");
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "dist")));

if (dev) {
  const webpackDev = require("./dev");
  app.use(webpackDev.comp).use(webpackDev.hot);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get('/check-mongo', (req, res) => {
  exec('sudo systemctl is-active mongod', (error, stdout, stderr) => {
    console.log("stderr --->", stderr)
      
      res.json({ status: stdout.trim() });
  });
});

app.listen(3000, function () {
  console.log("Server started on :3000");
});