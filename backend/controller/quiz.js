import quizFruitNinjaModel from "../models/quiz_fruitninja.js"

export const getQuizFruitNinja = async(req, res) => {
    try {
        const quizCode = req.query.quizCode;  
        const quiz = await quizFruitNinjaModel.findOne({ quizCode: quizCode, isDeleted: false });
        
        return res.status(200).json({success:true, quiz})

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}