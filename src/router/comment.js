const express = require("express");
const router = express.Router();

const commentController = require("../app/controller/comment.controller");

router.post("/:id", commentController.commentByMovie);
router.post("/addComment", commentController.createNewComment);
router.put("/update/:id", commentController.updateOneCommentById);
router.delete("/delete/:id", commentController.deleteOneCommentById);
router.get("/", commentController.commentAll);

module.exports = router;
