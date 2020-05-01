import express from "express";
const router = express.Router();
import Config from "../../../../../Config/Config";
const { createConnection } = Config;
import middleware from "../../../../Middleware/AuthMiddleware";
const { isAuth, isAuthAsAdmin, isValidId_or_isAdmin } = middleware;
const { ACCESS_TOKEN_SECRET } = process.env;

import full from  "./cloth-size-color-status-cate";

router.use("/join/full", full);

export default router;