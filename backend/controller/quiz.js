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
            "fruitninja": quizFruitNinjaModel,
            "unjumble": quizUnjumbleModel,
            "completesentence": quizCompleteSentenceModel
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

export const updateQuizTotalPlays = async(req, res) => {
    try{
        const { quizId, quizType } = req.query;
        let model;

        switch (quizType) {
        case "quiz_fruit_ninja":
            model = quizFruitNinjaModel;
            break;
        case "quiz_unjumble":
            model = quizUnjumbleModel;
            break;
        case "quiz_complete_sentence":
            model = quizCompleteSentenceModel;
            break;
        default:
            return res.status(400).json({ success: false, message: "Invalid quiz type" });
        }

        const updatedQuiz = await model.findOneAndUpdate(
            { _id: quizId, isDeleted: false },
            { $inc: { totalPlays: 1 } },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }

        return res.status(200).json({ success: true, message: "Quiz play count updated", quiz: updatedQuiz });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}