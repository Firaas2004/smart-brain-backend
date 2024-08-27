const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: 123,
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entry: 0,
      joined: new Date(),
    },
    {
      id: 124,
      name: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entry: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("sucess");
  } else {
    res.status(400).json("failed");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: 125,
    name: name,
    email: email,
    password: password,
    entry: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  database.users.forEach((user) => {
    if (user.id == Number(id)) {
      return res.json(user);
    }
  });
});

app.listen(3000, () => {
  console.log("app is  running perfectly on port 3000");
});
