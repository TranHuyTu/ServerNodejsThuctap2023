const express = require("express");
const router = express.Router();

const commentController = require("../app/controller/comment.controller");

router.post("/addComment", commentController.createNewComment);
router.get("/", commentController.commentAll);
router.post("/:id", commentController.commentByMovie);

module.exports = router;
