import quizFruitNinjaModel from "../models/quiz_fruitninja.js"
import quizUnjumbleModel from "../models/quiz_unjumble.js";
import quizCompleteSentenceModel from "../models/quiz_completesentence.js"

export const getQuizFruitNinja = async(req, res) => {
    try {
        const quizCode = req.query.quizCode;  
        const quiz = await quizFruitNinjaModel.findOne({ quizCode: quizCode, isDeleted: false });
        
        return res.status(200).json({success:true, quiz})

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getQuizUnjumble = async(req, res) => {
    try {
        const quizCode = req.query.quizCode;  
        const quiz = await quizUnjumbleModel.findOne({ quizCode: quizCode, isDeleted: false, isShared: true });
        return res.status(200).json({success:true, quiz})

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getQuizTypeFromCode = async(req, res) => {
    try {
        const quizCode = req.query.quizCode;  
        const quizModels = {
            "fruit_ninja": quizFruitNinjaModel,
            "unjumble": quizUnjumbleModel,
            "complete_sentence": quizCompleteSentenceModel
        };

        for (const [type, model] of Object.entries(quizModels)) {
            const quiz = await model.findOne({ quizCode, isDeleted: false });
            if (quiz) return res.status(200).json({ success: true, quizType: type});
        }

        return res.status(404).json({ success: false, message: 'Quiz not found' });
    } 
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}