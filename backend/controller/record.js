import recordModel from "../models/record.js";

export const saveResult = async(req, res) => {
    try {
        const record = {
            quizId: req.body.quizId,
            quizType: req.body.quizType,
            username: req.body.username,
            score: req.body.score,
            timeTaken: req.body.timeTaken
        }   
        await recordModel.insertOne(record);
        return res.status(200).json({success: true});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export const getLeaderboard = async(req,res) => {
    try {
        const quizId = req.query.quizId;  
        const records = await recordModel.find({quizId: quizId});
        
        return res.status(200).json({success:true, records});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}