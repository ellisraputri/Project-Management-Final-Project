import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "quiz", required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    score: { type: Number, required: true },
    timeTaken: { type: Number, default: null },
  }, {timestamps: true});
  
const recordModel = mongoose.models.record || mongoose.model('record', recordSchema);

export default recordModel