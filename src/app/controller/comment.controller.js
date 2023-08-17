const Comments = require("../module/Comment");
const {
    MongooseToObject,
    mutipleMongooseToObjest,
} = require("../../util/mongoose");
const mongoose = require("mongoose");
class comment {
    commentAll(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Comments.find({})
                    .then((comments) => {
                        comments = mutipleMongooseToObjest(comments);
                        res.send({ comments });
                    })
                    .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    commentByMovie(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Comments.find({ movie_id: req.params.id })
                    .then((comments) => {
                        comments = mutipleMongooseToObjest(comments);
                        res.send({ comments });
                    })
                    .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    createNewComment(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const newComment = new Comments({
                    name: req.body.name,
                    email: req.body.email,
                    movie_id: mongoose.Types.ObjectId.createFromHexString(
                        req.body.movie_id,
                    ),
                    text: req.body.text,
                    date: req.body.date,
                });
                const saveComment = newComment.save();
                res.send(saveComment);
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    updateOneCommentById(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const newComment = {
                    name: req.body.name,
                    email: req.body.email,
                    movie_id: mongoose.Types.ObjectId.createFromHexString(
                        req.body.movie_id,
                    ),
                    text: req.body.text,
                    date: req.body.date,
                };
                const updatedComment = await Comments.updateOne(
                    {
                        _id: mongoose.Types.ObjectId.createFromHexString(
                            req.params.id,
                        ),
                    },
                    newComment,
                    { new: true },
                );
                res.send(updatedComment);
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    deleteOneCommentById(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const result = await Comments.deleteOne({
                    _id: mongoose.Types.ObjectId.createFromHexString(
                        req.params.id,
                    ),
                });
                if (result.deletedCount === 1) {
                    res.send({ result: "Successfully deleted one document." });
                } else {
                    res.send({
                        result: "No documents matched the query. Deleted 0 documents.",
                    });
                }
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
}

module.exports = new comment();
