const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { User } = require("../db/model.js");
const app = express();
const port = process.env.PORT || 3001;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const config = require("../db/config");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//You can use this to check if your server is working
app.get("/", (req, res) => {
  res.send("Welcome to your server");
});

app.post("/api/signup", async (req, res) => {
  try { 
    const { email } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const exists=await User.findOne({where:{email:email},raw:true})
     if(exists){
       res.send({message:"user already exists"})
     }else{
      const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });
   
      const token = jwt.sign({ email }, "hhh", { expiresIn: "1h" });
      res.send({ user, token });
     }
   
    
    
      
    
  } catch (err) {
    res.send(err);
  }
});
app.post("/api/login", async (req, res) => {
  try {
    var { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
      raw: true,
    });
    if (user) {
      console.log("this is the user", user);
      var check = bcrypt.compareSync(password, user.password);
      if (check) {
        var token = jwt.sign({ email }, "hhh", { expiresIn: "1h" })
        res.send({ message: "success", user, token });
      } else {
        res.send({ message: "incorrect password", user, token: null });
      }
    } else {
      res.send({ message: "user not found", user, token: null });
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/api/verify", async (req, res) => {
  try {
    let payload = null;
    var token = req.headers["authorization"].split(" ")[1];
    console.log("token", token);
    console.log("==========>");
    //if there is no token
    if (!token) {
      res.send({ token: "" });
    } else {
      payload = jwt.verify(token, "hhh");
      const user = await User.findOne({ where: { email: payload.email } });
      if (!user) {
        res.send({ token: "" });
      } else {
        res.send({ token });
      }
    }
  } catch (err) {
    res.send(err);
  }
});
app.listen(port, () => {
  console.log("listening on port 3001");
});
