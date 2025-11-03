import express from "express";
import { getLeaderboard, saveResult } from "../controller/record.js";

const recordRouter = express.Router();

recordRouter.post("/result", saveResult);
recordRouter.get("/leaderboard", getLeaderboard);

export default recordRouter;
