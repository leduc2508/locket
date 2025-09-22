const express = require("express");
const { checkUser, createUser, login } = require("../controllers/userController");


const router = express.Router();

// route User
router.post("/checkUser", checkUser);
router.post("/createUser", createUser);
router.post("/login",login);

module.exports = router;
