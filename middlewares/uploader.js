const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        cb(null, `${Date.now()}.${ext}`);
    },
});
const upload = multer({ storage });

module.exports = upload;