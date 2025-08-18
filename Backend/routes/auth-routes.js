const express = require("express");
const { register, login } = require("../controllers/auth-controller");
// const validateRegister = require("../middleware/validateRegister");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
module.exports = router;
