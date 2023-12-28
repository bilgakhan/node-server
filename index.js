const express = require("express");
const app = express();
const fs = require("fs");
require("dotenv").config();

app.use(express.json());

let users = [];

// shunchaki home page
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  fs.readFile("static/index.html", function (err, pgress) {
    if (err) {
      res.write("PAGE NOT FOUND 404");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(pgress);
      res.send();
    }
  });
});

// post qilish qismi

app.post("/register", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { email, password, f_name, l_name } = req.body;
  const token = "qwiefgwiefgv$iuwbgiwurgfriubgwon_";

  if (!(email && password)) {
    res.status(400).send({
      status: 400,
      message: "Email yoki parolda xatolik",
    });
  }

  for (let i = 0; i < users.length; i++) {
    if (email === users[i]["email"]) {
      res.send({
        status: 200,
        message: "Bu email avval ro'yxatdan o'tgan",
      });
    }
  }

  res.send({
    status: 201,
    message: "Ro'yxatdan o'tdingiz",
    token: token,
  });
  users.push(req.body);
  res.end();
});

// login

app.post("/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send({
      status: 400,
      message: "email va parol kiritilishligi shart",
    });
  }

  for (let i = 0; i < users.length; i++) {
    if (email === users[i]["email"]) {
      if (password === users[i]["password"]) {
        res.status(200).json({
          message: "akkountga kirdigiz",
          accessToken: "wieuyfgiweugfi$oborebwbwgrbo@",
        });
      } else {
        res.status(400).json({
          error: "Parol yoki login xato!",
        });
      }
    }
  }

  res.end();
});

// get users
app.get("/users", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.send(users);
  res.end();
});

// put users
app.put("/put/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const { email, password } = req.body;

  let isEdited = false;
  for (let index = 0; index < users.length; index++) {
    if (users[index]["email"] === req.params.id) {
      users[index] = req.body;
      isEdited = true;
    } else {
      isEdited = false;
    }
  }

  if (isEdited) {
    res.status(200).json({
      message: "Tegishli ma'lumot yangilandi",
    });
  } else {
    res.status(200).json({
      message: "Yangilanmadi",
      error: "tarmoq xatoligi",
    });
  }
  res.end();
});


// run the server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server running: http://${process.env.IP}:${process.env.PORT}`);
});
