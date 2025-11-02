import mongoose from "mongoose";

const quizUnjumbleSchema = new mongoose.Schema({
    quizCode: { type: String, required: true },
    title: { type: String, required: true },
    jumbledWords: { type: [[String]], required: true },
    answers: { type: [String], required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    totalPlays: { type: Number, default: 0 },
    isShared: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },    
  }, {timestamps: true});
  
const quizUnjumbleModel = mongoose.models.quiz_unjumble || mongoose.model('quiz_unjumble', quizUnjumbleSchema);

export default quizUnjumbleModel