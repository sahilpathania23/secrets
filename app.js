//jshint esversion:6
require("dotenv").config();

const express =require ("express");
const ejs=require("ejs");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption");


const app =express();


app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema=new mongoose.Schema({
  email:String,
  password:String
});
const secret="thisisourlittlesecret";

userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedfield:["password"]});

const User=new mongoose.model("User",userSchema);


app.get("/",function(req,res){
  res.render("home");
});
app.get("/login",function(req,res){
  res.render("login");
});
app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const newuser=new User({
    email:req.body.username,
    password:req.body.password
  });
  newuser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets");
    }
  });


})

app.listen(3000,function(){
  console.log("server is litening on port 3000");
});
