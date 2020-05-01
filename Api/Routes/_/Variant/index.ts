import express from "express";
const router = express.Router();
import Config from "../../../../Config/Config";
const { createConnection } = Config;
import middleware from "../../../Middleware/AuthMiddleware";
import jwtHelper from "../../../Helper/jwt.helper";
const { isAuth, isAuthAsAdmin, isValidId_or_isAdmin } = middleware;
const { verifyToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;

import Join from "./Join/index";

router.use("/", Join);

export default router;