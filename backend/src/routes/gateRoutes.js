import express from "express";

const router = express.Router();

// protect all routes
router.use(protect);
