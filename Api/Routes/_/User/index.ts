import express from "express";
const router = express.Router();
import Config from "../../../../Config/Config";
const { createConnection } = Config;
import middleware from "../../../Middleware/AuthMiddleware";
import jwtHelper from "../../../Helper/jwt.helper";
const { isAuth, isAuthAsAdmin, isValidId_or_isAdmin } = middleware;
const { verifyToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;

// Get all user
// example: localhost:5000/api/user/all
router.get("/all", isAuthAsAdmin, (req, res) => {
  createConnection.query("select * from user", (err, result, field) => {
    if ( err ) {
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      res.json({
        status: 200,
        result
      });
    }
  });
});

// Get single user by id
// example: localhost:5000/api/user/single/1
router.get("/single/:id", isAuthAsAdmin, (req, res) => {
  createConnection.query(`select * from user where user_id = '${req.params.id}'`, (err, result, field) => {
    if ( err ) {
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      if ( result.length > 0 )
        res.json({
          status: 200,
          result
        });
      else
        res.json({
          status: 404,
          message: "Cannot find user"
        });
    }
  });
});

// Get info single user by token provided in header
// example: localhost:5000/api/user/info
router.get("/info", isAuth, async (req, res) => {
  let result = await verifyToken(req.header("authorization"), ACCESS_TOKEN_SECRET);
  if ( result )
    res.json({
      status: 200,
      result: result["data"]
    });
  else
    res.json({
      status: 401,
      message: "Unauthorized"
    });
});

export default router;