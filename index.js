const express = require("express");
const app = express();

app.use(express.json());

let users = [];

// server post

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
});

// put users
// app.put("/put/:id", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   const { email, password } = req.body;
//   console.log(req.params.id);
// });

// IP settings
const IP = "192.168.100.10";
const PORT = 3300;

// running server

app.listen(PORT, IP, () => {
  console.log(`Server running: http://${IP}:${PORT}`);
});
