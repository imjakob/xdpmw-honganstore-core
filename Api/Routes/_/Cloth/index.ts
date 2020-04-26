import express from "express";
import Config from "../../../../Config/Config";
import e from "express";
const router = express.Router();
const { createConnection } = Config;

router.get("/all", (req, res) => {
  createConnection.query("select * from cloth", (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error while query to database"
      });
    } else {
      res.json({
        status: 200,
        total: result.length,
        result
      });
    }
  });
});

router.get("/single/:id", (req, res) => {
  createConnection.query(`select * from cloth where cloth_id =  ${req.params.id}`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error while query to database"
      });
    } else {
      res.json({
        status: 200,
        result
      });
    }
  });
});



export default router;