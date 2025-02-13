const express = require("express");
const router = express.Router();
const homePageHandler = require("./handlers/homePageHandler");
const imageUploadHandler = require("./handlers/imageUploadHandler");
const upload = require("./middlewares/uploader");
const resultPage = require("./handlers/resultPage");
const adminHandler = require("./handlers/adminHandler");
// ======== text handler =========

// ==== header text  ====
router.get("/nav",homePageHandler.readNavText);
router.post("/nav",homePageHandler.writeNavText);

// ==== card handler ====
router.get("/createcard",homePageHandler.readCard);
router.post("/createcard",homePageHandler.createCard);
router.delete("/deletecard/:id",homePageHandler.deleteCard);

// ====== images uploader ========
router.post("/upload",upload.single("logo"), imageUploadHandler.uploadLogo);
router.post("/uploadslider", upload.single("slider"), imageUploadHandler.uploadSlider);

// ======= get slider url =========
router.get("/getsliderurl", homePageHandler.getSliderUrl);


// ======= delete slider images ======
router.put("/deletesliderurl/:id", homePageHandler.deleteSliderUrl);

// ======== phone number ==========
router.get("/getphone", resultPage.getPhoneNum);
router.put("/createorupdatephone", resultPage.createAndUpdatePhoneNum);

// ===== add class =========
router.post("/addclass", resultPage.addClass);
router.get("/getclass", resultPage.getClass);
router.delete("/deleteclass/:id", resultPage.deleteClass);

//============= result ============
router.post("/createresult", resultPage.createResult);
router.put("/updateresult", resultPage.updateResult);
// this id not the result card id but class's id
router.get("/getresult/:id", resultPage.getResult);
// but this id is the result card's id.
router.delete("/deleteresult/:id", resultPage.deleteResult);


router.post("/signup", adminHandler.signup);
router.post("/login", adminHandler.login);
router.put("/update", adminHandler.update);

// ======== footer =========

router.post("/footer", homePageHandler.createFooterContent);
router.get("/footer", homePageHandler.getFooterContent);



module.exports = router;