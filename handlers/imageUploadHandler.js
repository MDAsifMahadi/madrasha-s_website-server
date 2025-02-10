const cloudinary = require("../utils/cloudinary");
const { Navinfo, SliderUrl } = require("../models/schemaModels");
const e = require("express");


const imageUploadHandler = {};

imageUploadHandler.uploadLogo = async (req, res) => {
    try {
        const navInfo = await Navinfo.find();
        if (navInfo.length > 0) {
            const url = navInfo[0].logo_url.split("/");
            const public_id = url[url.length - 1].split(".")[0];

            await cloudinary.uploader.destroy("madrasha/" + public_id);
            const result = await cloudinary.uploader.upload(req.file.path,
                {
                    folder : "madrasha"
                }
            );
            const {secure_url} = result;
            await Navinfo.updateOne({
                logo_url: secure_url
            })
            res.status(200).json({
                message: "Image uploaded successfully",
            })
        } else {
            res.status(404).json({
                message: "Nav info not found",
            })
        }

    } catch (error) {
        res.status(500).json({
        message: "Internal server error",
        });
    }
}

imageUploadHandler.uploadSlider = async (req, res) => {
    try {
       const result = await cloudinary.uploader.upload(req.file.path,
            {
                folder : "slider"
            }
        );
        const {secure_url} = result
        const newSliderUrl = new SliderUrl({url : secure_url});
        await newSliderUrl.save();
        res.status(200).json({
            message: "Slider image uploaded successfully",
        })

    } catch (error) {
        res.status(500).json({
        message: "Internal server error",
        });
    }
}

module.exports = imageUploadHandler;
