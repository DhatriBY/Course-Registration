const express = require("express");
const  studentRoutes = require("./students/routes");
const app = express();
const session_express=require('express-session')
const port = 5000;
const cors = require("cors");
// const bodyParser = require("body-parser");
app.use(cors({ origin: true, credentials: true}));
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(session_express({
    secret:"Idontlikethislabitissoooooolong",
    resave:'true',
    saveUninitialized: true,
  }))


app.use('',studentRoutes);
app.listen(port,() => console.log('app listening on port '+port));