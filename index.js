const express = require("express");
const fs = require("fs");
const ejs = require("ejs");

const app = express();
const port = 3100;

// Middleware
app.use(express.static("./styles"));
app.use(express.static("./public"));

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

app.get("/about", (req, res) => {
  const data = {
    title: "About Page",
    content: "Here is a picture of a cat.",
  };

  res.render("aboutview", data);
});

app.get("/contact", (req, res) => {
  const data = {
    title: "This is a rendered Contact page",
    content: "Blah blah blah.",
  };

  res.render("homeview", data);
});

// For button
app.get("/download", (req, res) => {
  console.log("download");
  res.download("./public/images/pexels-oday-774936370-21937870.jpg");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
