const Comments = require("../module/Comments");
const { mutipleMongooseToObjest } = require("../../util/mongoose");

class news {
    index(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Comments.find({})
                    .then((comments) => {
                        comments = mutipleMongooseToObjest(comments);
                        res.render("news", { comments });
                    })
                    .catch(next);
                res.json(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
}

module.exports = new news();
