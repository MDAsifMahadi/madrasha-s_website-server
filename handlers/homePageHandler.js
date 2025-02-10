const {Navinfo, HomeCard, SliderUrl, FooterContent} = require('../models/schemaModels');
const cloudinary = require("../utils/cloudinary");
const homePageHandler = {};


// ================== navbar handler ==================
homePageHandler.readNavText = async (req, res) => {
    try {
        const findNavInfo = await Navinfo.find();
        if (findNavInfo.length > 0) {
            res.status(200).json({
                message: "Nav info found",
                navInfo: findNavInfo
            });
        } else {
            res.status(200).json({
                message: "Nav info not found",
                navInfo: null
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        });
    }
}

homePageHandler.writeNavText = async (req, res) => {
    try {
        const {arabic, bangla, english, address} = req.body;
        const findNavInfo = await Navinfo.find();
        if (findNavInfo.length > 0) {
            await Navinfo.updateOne({
                arabic, bangla, english, address
            }); 
            res.status(200).json({
                message: "Nav info updated"
            });
        } else {
            const newNavInfo = new Navinfo({
                arabic, bangla, english, address
            });
            await newNavInfo.save();
            res.status(200).json({
                message: "Nav info saved"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        });
    }
}


// ================== card handler ==================
homePageHandler.createCard = async (req, res) => {
    try {
        const {title, desc} = req.body;
        const newCard = new HomeCard({
            title, desc
        });
        await newCard.save();
        res.status(200).json({
            message: "Card created"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        });
    }
}

homePageHandler.readCard = async (req, res) => {
    try {
        const getCards = await HomeCard.find();
        if (getCards.length > 0) {
            res.status(200).json({
                message: "Cards found",
                cards: getCards
            });
        } else {
            res.status(200).json({
                message: "Cards not found",
                cards: null
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

homePageHandler.deleteCard = async (req, res) => {
    try {
        const getCards = await HomeCard.find({_id: req.params.id});
        if (getCards.length > 0) {
            await HomeCard.deleteOne({_id: req.params.id});
            console.log("Card deleted");
            res.status(200).json({
                message: "Card deleted"
            });
        } else {
            res.status(200).json({
                message: "Card not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

homePageHandler.getSliderUrl = async (req, res) => {
    try {
        const urls = await SliderUrl.find()
        const arrayOfUrl = urls.map(obj =>{
            return obj.url;
        })
        res.status(200).json({urls : arrayOfUrl});

        res.status(200);
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
}

homePageHandler.deleteSliderUrl = async (req, res) => {
    try {
        const currentImgId = req.params.id;
        await cloudinary.uploader.destroy("slider/" + currentImgId);
        await SliderUrl.findOneAndDelete({ url : req.body.url});
        
        res.status(200).json({
            message : "Image deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
}
 // ========= footer ==========
homePageHandler.createFooterContent = async (req, res) => {
    try {
        const content = await FooterContent.find();
        if (content.length > 0) {
            await FooterContent.findOneAndDelete();
        }
        const data = req.body;
        const newFooterContent = new FooterContent(data);
        await newFooterContent.save();
        res.status(200).json({
            message : "Content saved successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
}

homePageHandler.getFooterContent = async (req, res) => {
    try {
        const data = await FooterContent.find();
        res.status(200).json({
            data,
            message : "Content saved successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
}


module.exports = homePageHandler;