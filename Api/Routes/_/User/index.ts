import express from "express";
const router = express.Router();
import Config from "../../../../Config/Config";
const { createConnection } = Config;
import middleware from "../../../Middleware/AuthMiddleware";
import jwtHelper from "../../../Helper/jwt.helper";
import e from "express";
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
router.get("/single/:id", isAuth, isValidId_or_isAdmin, (req, res) => {
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

// Create user 
// example: localhost:5000/api/user/add
router.post("/add", isAuthAsAdmin, (req, res) => {
  const user = {...req.body, role: req.body.role ? 0 : 1};
  createConnection.query(`select * from user where email = '${user.email}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Invalid field, cannot create user"
      });
    } else {
      if ( result.length === 0 ) {
        createConnection.query("insert into user set ?", user, (err, result, field) => {
          if ( err ) {
            console.log(err);
            res.json({
              status: 404,
              message: "Invalid field, cannot create user"
            });
          } else {
            res.json({
              status: 200,
              message: "Create user success"
            });
          }
        });
      } else {
        res.json({
          status: 400,
          message: "Already have that email"
        });
      }
    }
  });
});

router.put("/update/:id", isAuth, isValidId_or_isAdmin, (req, res) => {
  let user = {},
      bodyObjects = Object.entries(req.body);

  bodyObjects.map( item => {
    user[item[0]] = item[1];
  });
  createConnection.query(`update user set ? where user_id = ${req.params.id}`, user, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Invalid Fields"
      });
    } else {
      res.json({
        status: 200,
        message: "Update user success"
      });
    }
  });
});

router.put("/update-password/:id", isAuth, isValidId_or_isAdmin, (req, res) => {
  const { password } = req.body;
  if ( password ) {
    createConnection.query(`update user set ? where user_id = ${req.params.id}`, {password}, (err, result, field) => {
      if ( err ) {
        res.json({
          status: 404,
          message: "Invalid fields"
        });
      } else {
        res.json({
          status: 200,
          message: "Update password success"
        });
      }
    });
  } else {
    res.json({
      status: 404,
      message: "Invalid fields"
    });
  }
});

router.delete("/delete/:id", isAuthAsAdmin, (req, res) => {
  createConnection.query(`delete from user where user_id = ${req.params.id}`, (err, result, field) => {
    if ( err ) {
      res.json({
        status: 404,
        message: "Cant delete user"
      });
    } else {
      if ( result.affectedRows > 0 ) {
        res.json({
          status: 200,
          result
        });
      } else {
        res.json({
          status: 404,
          message: "Cant find user"
        });
      }
    }
  });
});

export default router;