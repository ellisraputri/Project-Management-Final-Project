import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  quizId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: "quizType"   
  },
  quizType: { 
    type: String, 
    required: true,
    enum: ["quiz_complete_sentence", "quiz_unjumble", "quiz_fruit_slicing"]  
  },
  username: { type: String, required: true },
  score: { type: Number, required: true },
  timeTaken: { type: Number, default: null },
}, { timestamps: true });

const recordModel = mongoose.models.record || mongoose.model("record", recordSchema);

export default recordModel;
