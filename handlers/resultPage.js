const { PhoneNum, AddClass, Result} = require("../models/schemaModels");

const resultPage = {};

resultPage.getPhoneNum = async (req, res) => {
    try {
        const phoneNum = await PhoneNum.find();
        if (phoneNum.length > 0) {
            res.status(200).json({phoneNum});
            return;
        }
        res.status(404).json({
            message : "Phone number is not found!"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

resultPage.createAndUpdatePhoneNum = async (req, res) => {
    const {phoneNum} = req.body
    try {
        const oldNum = await PhoneNum.find()
       if (oldNum.length > 0) {
            await PhoneNum.findOneAndUpdate(oldNum._id, {phoneNum});
            res.status(200).json({
                message : "Phone number is updated",
            })
            return;
        }
        const newNum = new PhoneNum({phoneNum});
        await newNum.save();
        res.status(200).json({
            message : "Phone number is saved!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

resultPage.addClass = async (req, res) => {
    try {
        const {newClassName} = req.body;
        const newClass = await AddClass({class :newClassName});
        await newClass.save()
        res.status(200).json({
            message : "New class is added!"
        })
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

resultPage.getClass = async (req, res) => {
    try {
        const allClass = await AddClass.find();
        if (allClass.length > 0){
            res.status(200).json({
                data : allClass,
            });
            return;
        }
        res.status(404).json({
            data : allClass,
            message : "No class found"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

resultPage.deleteClass = async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteClass = await AddClass.find({_id : id});
        if (deleteClass.length > 0){
            await AddClass.findByIdAndDelete({_id : id});
            return;
        }
        res.status(404).json({
            message : "No class found"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

// =========== result handlers ============
resultPage.createResult = async (req, res) => {
    
    try {
        const data= await req.body;
        if (data.classId.length > 0 && data.date.length > 0) {
            const newResult = new Result(data)
            await newResult.save();
            res.status(200).json({
                message : "New result added"
            });
            return;
        }
        
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

resultPage.getResult = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const results = await Result.find({classId : id});
            res.status(200).json({
                results,
                message : "New result added"
            });
            return;
        }
        
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};

resultPage.deleteResult = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Result.findOne({_id : id});
        if (result) {
            await Result.findOneAndDelete({_id : id});
            res.status(200).json({
                message : "Result deleted!"
            });
            return;
        }
        res.status(404).json({
            message : "Not found!"
        });
        
    } catch (error) {
        res.status(500).json({
            error: "There was an error in the server"
        })
    }
};
module.exports = resultPage;