import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizCode: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ["unjumble", "fruit-ninja", "complete-sentence"] },
    questions: { type: [String], required: true },
    answers: { type: [String], required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    totalPlays: { type: Number, default: 0 },
    isShared: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },    
  }, {timestamps: true});
  
const quizModel = mongoose.models.quiz || mongoose.model('quiz', quizSchema);

export default quizModel