const express = require("express");
const fs = require("fs");
const ejs = require("ejs");

const app = express();
const port = 3100;

// Middleware
app.use(express.static("./styles"));

app.engine("ejs", ejs.renderFile);

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = {
    title: "Rendering with Express and EJS is fun.",
    content: "Blah blah blah.",
  };

  res.render("homeview", data);
});

// For button
app.get("/download", (req, res) => {
  console.log("download");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
