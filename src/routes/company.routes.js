const express = require("express");
const authMiddleware = require ("../middleware/auth.middleware");
const {createCompany,} = require("../controllers/company.controller");

const router =express.Router();

router.post("/",authMiddleware , createCompany);

module.exports = router;