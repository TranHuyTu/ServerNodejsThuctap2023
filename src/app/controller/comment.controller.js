const Comments = require("../module/Comment");
const {
    MongooseToObject,
    mutipleMongooseToObjest,
} = require("../../util/mongoose");

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
}

module.exports = new comment();
