const router = require("express").Router();

const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const rateRoutes = require("./rateRoutes");

//create api CRUD routes for all models 
router.use("/post", postRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/rate", rateRoutes);


module.exports = router;