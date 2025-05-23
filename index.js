const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const urlencode = require("urlencode");

const app = express();
const port = 3100;

// Middleware
app.use(express.static("./styles"));
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

// Middleware for logging
app.use("/download/:imageFile", (req, res, next) => {
  console.log(
    "Time at Download Request:",
    new Date(Date.now()).toLocaleString()
  );
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something you did caused an Internal Server Error!");
});

app.engine("ejs", ejs.renderFile);

app.set("views", "./views");
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  const data = {
    title: "Express and EJS",
    content: "Rendering with Express and EJS is fun.",
  };

  res.render("homeview", data);
});

app.get("/about", (req, res) => {
  const data = {
    title: "This page is about a kitten.",
    imgSrc: "/images/pexels-oday-774936370-21937870.jpg",
    content: "Here is a picture of a kitten sleeping.",
  };

  res.render("aboutview", data);
});

app
  .route("/contact")
  .get((req, res) => {
    const data = {
      title: "Contact Page",
      content: "Send us a comment!",
    };

    res.render("contactview", data);
  })
  .post((req, res) => {
    const data = {
      title: "Contact Page",
      imgSrc: "https://media.tenor.com/fRwU2Z3GKtgAAAAM/busy-working.gif",
      content: "Your Opinion has been Noted!",
    };

    console.log("Form Submitted:", new Date(Date.now()).toLocaleString());
    console.log(req.body);

    res.render("sent", data);
  });

app.get("/login", (req, res) => {
  const data = {
    title: "Log in if you dare!",
    content: "Under Construction.",
  };

  res.render("homeview", data);
});

// For button
app.get("/download/:imageFile", (req, res) => {
  try {
    res.download("./public/images/" + req.params.imageFile);
  } catch (err) {
    return res.status(404).send("Image not found!");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
