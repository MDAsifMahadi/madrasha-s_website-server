// ========== external modules ===========
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
require("dotenv").config()

const app =  express();

// ========= DB connection ===========
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DB connected successful !"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(express.static("public"));

app.use(router)

// ======== error handler =========
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(404).send({
        message : "there was an error"
    })
})

app.listen(process.env.PORT, ()=> {
    console.log(`server is runing ar http://localhost:${process.env.PORT}`);
});