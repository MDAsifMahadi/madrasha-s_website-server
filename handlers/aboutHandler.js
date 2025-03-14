const {About} = require("../models/schemaModels");
const aboutHandler = {};

aboutHandler.create = async (req, res) => {
    try {
        const data = req.body;
        const info = await About.find({classId : data.classId});

        if (info.length > 0) {
            await About.findByIdAndUpdate(info[0]._id, data);
            res.status(200).json({
                message : "Content saved successfully"
            });
            return;
        }

        const newAbout = new About(data);
        await newAbout.save();

        res.status(200).json({
            message : "Content saved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        });
    }
};

aboutHandler.getInfo = async (req, res) => {
    try {
        const {id} = req.params;
        const info = await About.find({classId : id});
        
        res.status(200).json({
            info
        })
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        });
    }
}

module.exports = aboutHandler;