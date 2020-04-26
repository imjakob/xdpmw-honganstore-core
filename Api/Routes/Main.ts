import express from "express";
import Config from "../../Config/Config";
const router = express.Router();
const { getConnection } = Config;

// Connect to mysql
getConnection();

// Import route
import cloth from "./_/Cloth";

// Config route
router.use("/api/cloth", cloth);

export default router;