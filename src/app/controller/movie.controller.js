const Movies = require("../module/Movie");
const { mutipleMongooseToObjest } = require("../../util/mongoose");

class movies {
    listMovie(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Movies.find({})
                    .then((movie) => {
                        movie = mutipleMongooseToObjest(movie);
                        res.send({ movie });
                    })
                    .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    Show(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Movies.find({})
                    .then((comments) => {
                        comments = mutipleMongooseToObjest(comments);
                        comments.map((value) => {
                            value.backdrop_path =
                                "https://image.tmdb.org/t/p/w500" +
                                value.backdrop_path;
                            value.poster_path =
                                "https://image.tmdb.org/t/p/w500" +
                                value.poster_path;
                        });
                        res.render("news", { comments });
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

module.exports = new movies();
