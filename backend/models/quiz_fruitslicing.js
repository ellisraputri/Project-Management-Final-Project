import mongoose from "mongoose";

const quizFruitSlicingSchema = new mongoose.Schema({
    quizCode: { type: String, required: true },
    title: { type: String, required: true },
    questionGroup: { type: String, required: true },
    timeConfig: { type: Number, required: true},
    options: { type: [String], required: true },
    corrects: { type: [String], required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    totalPlays: { type: Number, default: 0 },
    isShared: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },    
  }, {timestamps: true});
  
const quizFruitSlicingModel = mongoose.models.quiz_fruit_slicing || mongoose.model('quiz_fruit_slicing', quizFruitSlicingSchema);

export default quizFruitSlicingModel