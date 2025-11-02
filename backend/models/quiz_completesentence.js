import mongoose from "mongoose";

const quizCompleteSentenceSchema = new mongoose.Schema({
    quizCode: { type: String, required: true },
    title: { type: String, required: true },
    questions: { type: [String], required: true },
    answers: { type: [String], required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    totalPlays: { type: Number, default: 0 },
    isShared: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },    
  }, {timestamps: true});
  
const quizCompleteSentenceModel = mongoose.models.quiz_complete_sentence || mongoose.model('quiz_complete_sentence', quizCompleteSentenceSchema);

export default quizCompleteSentenceModel