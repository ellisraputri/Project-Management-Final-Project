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

export const getQuizCompleteSentence = async(req, res) => {
    try {
        const quizCode = req.query.quizCode;  
        const quiz = await quizCompleteSentenceModel.findOne({ 
            quizCode: quizCode, 
            isDeleted: false, 
            isShared: true 
        });
        
        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }
        
        return res.status(200).json({ success: true, quiz });

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

export const getQuizFromId = async(req, res) => {
    try {
        const quizId = req.query.quizId;  
        const quizModels = {
            "fruitninja": quizFruitNinjaModel,
            "unjumble": quizUnjumbleModel,
            "completesentence": quizCompleteSentenceModel
        };

        for (const [type, model] of Object.entries(quizModels)) {
            const quizObj = await model.findOne({ _id: quizId, isDeleted: false });
            if (quizObj) return res.status(200).json({ success: true, quiz: quizObj, quizType: type});
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

export const createNewQuiz = async(req, res) => {
    try{
        const { quizType } = req.query

        if (quizType === "fruitninja"){
            const {userId, title, questionGroup, timeConfig, options, corrects} = req.body;
            const newQuiz = await quizFruitNinjaModel.create({
                "quizCode" : "-",
                "title" : title,
                "questionGroup": questionGroup,
                "timeConfig": timeConfig,
                "options":options,
                "corrects": corrects,
                "creatorId": userId,
                "totalPlays": 0,
                "isShared": false,
                "isDeleted": false
            })
        }
        else if (quizType === 'completesentence'){
            const {userId, title, questions, answers} = req.body;
            const newQuiz = await quizCompleteSentenceModel.create({
                "quizCode" : "-",
                "title" : title,
                "questions": questions,
                "answers": answers,
                "creatorId": userId,
                "totalPlays": 0,
                "isShared": false,
                "isDeleted": false
            })
        }
        else if(quizType === 'unjumble'){
            const {userId, title, jumbledWords, answers} = req.body;
            const newQuiz = await quizUnjumbleModel.create({
                "quizCode" : "-",
                "title" : title,
                "jumbledWords": jumbledWords,
                "answers": answers,
                "creatorId": userId,
                "totalPlays": 0,
                "isShared": false,
                "isDeleted": false
            })
        }
        else{
            return res.status(400).json({success: false, message: "Quiz type not available."})
        }
        return res.status(200).json({success: true});
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({success:false, message: err.message});
    }
}

export const editExistingQuiz = async(req, res) => {
    try{
        const {quizId, quizType} = req.query

        if (quizType === "fruitninja"){
            const {userId, title, questionGroup, timeConfig, options, corrects} = req.body;
            const quizObj = await quizFruitNinjaModel.findById(quizId);

            if (String(quizObj.creatorId) !== userId){
                return res.status(401).json({success: false, message: "Unauthorized edit"})
            }
            
            quizObj.title = title;
            quizObj.questionGroup = questionGroup;
            quizObj.timeConfig = timeConfig;
            quizObj.options = options;
            quizObj.corrects = corrects;
            await quizObj.save();
        }
        else if (quizType === 'completesentence'){
            const {userId, title, questions, answers} = req.body;
            const quizObj = await quizCompleteSentenceModel.findById(quizId);

            if (String(quizObj.creatorId) !== userId){
                return res.status(401).json({success: false, message: "Unauthorized edit"})
            }
            quizObj.title = title;
            quizObj.questions = questions;
            quizObj.answers = answers;
            await quizObj.save();
        }
        else if(quizType === 'unjumble'){
            const {userId, title, jumbledWords, answers} = req.body;
            const quizObj = await quizUnjumbleModel.findById(quizId);

            if (String(quizObj.creatorId) !== userId){
                return res.status(401).json({success: false, message: "Unauthorized edit"})
            }
            quizObj.title = title;
            quizObj.jumbledWords = jumbledWords;
            quizObj.answers = answers;
            await quizObj.save();
        }
        else{
            return res.status(400).json({success: false, message: "Quiz type not available."})
        }
        return res.status(200).json({success:true, message: "Changes applied!"})
    } 
    catch (err){
        console.log(err.message)
        return res.status(500).json({success: false, message: err.message});
    }
}


export const getTeacherQuizzes = async(req, res) => {
    try {
        const teacherId = req.body.userId; 
        
        
        const [fruitNinjaQuizzes, unjumbleQuizzes, completeSentenceQuizzes] = await Promise.all([
            quizFruitNinjaModel.find({ creatorId: teacherId, isDeleted: false }),
            quizUnjumbleModel.find({ creatorId: teacherId, isDeleted: false }),
            quizCompleteSentenceModel.find({ creatorId: teacherId, isDeleted: false })
        ]);

        
        const formattedQuizzes = [
            ...fruitNinjaQuizzes.map(quiz => ({
                _id: quiz._id,
                title: quiz.title,
                type: "Fruit Ninja",
                quizType: "quiz_fruit_ninja",
                date: quiz.createdAt,
                plays: quiz.totalPlays,
                isShared: quiz.isShared,
                quizCode: quiz.quizCode
            })),
            ...unjumbleQuizzes.map(quiz => ({
                _id: quiz._id,
                title: quiz.title,
                type: "Unjumble",
                quizType: "quiz_unjumble",
                date: quiz.createdAt,
                plays: quiz.totalPlays,
                isShared: quiz.isShared,
                quizCode: quiz.quizCode
            })),
            ...completeSentenceQuizzes.map(quiz => ({
                _id: quiz._id,
                title: quiz.title,
                type: "Complete Sentence",
                quizType: "quiz_complete_sentence",
                date: quiz.createdAt,
                plays: quiz.totalPlays,
                isShared: quiz.isShared,
                quizCode: quiz.quizCode
            }))
        ];

        
        formattedQuizzes.sort((a, b) => new Date(b.date) - new Date(a.date));

        return res.status(200).json({ success: true, quizzes: formattedQuizzes });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


export const toggleShareQuiz = async(req, res) => {
    try {
        const { quizId, quizType } = req.body;
        const teacherId = req.body.userId; 

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

        
        const quiz = await model.findOne({ _id: quizId, creatorId: teacherId, isDeleted: false });
        
        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found or unauthorized" });
        }

        
        quiz.isShared = !quiz.isShared;
        await quiz.save();

        return res.status(200).json({ 
            success: true, 
            message: `Quiz ${quiz.isShared ? 'shared' : 'unshared'} successfully`,
            isShared: quiz.isShared 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


export const deleteQuiz = async(req, res) => {
    try {
        const { quizId, quizType } = req.query;
        const teacherId = req.body.userId; 

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

        // Find and soft delete the quiz
        const quiz = await model.findOneAndUpdate(
            { _id: quizId, creatorId: teacherId, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found or unauthorized" });
        }

        return res.status(200).json({ success: true, message: "Quiz deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}