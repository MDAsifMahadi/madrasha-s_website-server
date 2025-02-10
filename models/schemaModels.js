const e = require("express");
const mongoose = require("mongoose");

const navinfoSchema = new mongoose.Schema({
   arabic: {   type: String,   required: true },
   bangla: {   type: String,   required: true },
   english: {   type: String,   required: true },
   address : {   type: String,   required: true },
   logo_url : {   type: String, default: "" },
});

const homeCardSchema = new mongoose.Schema({
   title: {   type: String,   required: true },
   desc: {   type: String,   required: true },
});

const footerContent = new mongoose.Schema({
   aboutMadrasha: {   type: String,   required: true },
   address: {   type: String,   required: true },
   number: {   type: String,   required: true },
   email: {   type: String,   required: true },
   website: {   type: String,   required: true },
});

const sliderImgs = new mongoose.Schema({
   url : { type: String, required : true }
})

const phoneNum = new mongoose.Schema({
   phoneNum : { type: String, required : true }
});

const addClass = new mongoose.Schema({
   class : { type: String, required : true }
})

const result = new mongoose.Schema({
   classId : { type: String, required : true },
   date : { type: String, required : true },
   fast : { type: String},
   second : { type: String},
   third : { type: String},
   other : { type: String},
});

const admin = new mongoose.Schema({
   email : { type: String, required : true },
   password : { type: String, required : true },
})


const Navinfo = mongoose.model("headerinfo", navinfoSchema);
const HomeCard = mongoose.model("homecard", homeCardSchema);
const FooterContent = mongoose.model("footerContent", footerContent);
const SliderUrl = mongoose.model("slider", sliderImgs);
const PhoneNum = mongoose.model("phoneNum", phoneNum);
const AddClass = mongoose.model("class", addClass);
const Result = mongoose.model("result", result);
const Admin = mongoose.model("admin", admin);
module.exports = {Navinfo, HomeCard, SliderUrl, PhoneNum, AddClass, Result, Admin, FooterContent};