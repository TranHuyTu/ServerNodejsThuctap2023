const Movies = require("../module/Movie");
const axios = require("axios");
const {
    MongooseToObject,
    mutipleMongooseToObjest,
} = require("../../util/mongoose");

class movies {
    movieDetail(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Movies.findById({ _id: req.params.id })
                    .then(async (detail) => {
                        const response = await axios.post(
                            "https://serverltmnc.onrender.com/comment/" +
                                req.params.id,
                        );
                        const comments = response.data.comments;
                        detail.backdrop_path =
                            "https://image.tmdb.org/t/p/w500" +
                            detail.backdrop_path;
                        detail.poster_path =
                            "https://image.tmdb.org/t/p/w500" +
                            detail.poster_path;
                        res.render("detail", { detail, comments });
                        // res.send({ detail });
                    })
                    .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }

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
                    .then((movie) => {
                        movie = mutipleMongooseToObjest(movie);
                        movie.map((value) => {
                            value.backdrop_path =
                                "https://image.tmdb.org/t/p/w500" +
                                value.backdrop_path;
                            value.poster_path =
                                "https://image.tmdb.org/t/p/w500" +
                                value.poster_path;
                        });
                        res.render("news", { movie });
                    })
                    .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    Search(req, res, next) {
        const contentSearch = req.params.content;
        const regexPattern = new RegExp(contentSearch, "i");
        if (regexPattern) {
            // Lấy dữ liệu từ MongoDB bằng async/await
            async function fetchData() {
                try {
                    await Movies.find({
                        title: { $regex: regexPattern },
                    })
                        .then((movie) => {
                            movie = mutipleMongooseToObjest(movie);
                            movie.map((value) => {
                                value.backdrop_path =
                                    "https://image.tmdb.org/t/p/w500" +
                                    value.backdrop_path;
                                value.poster_path =
                                    "https://image.tmdb.org/t/p/w500" +
                                    value.poster_path;
                            });
                            res.render("news", { movie });
                        })
                        .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users;
                } catch (error) {
                    res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
                }
            }

            // Gọi hàm để thực hiện lấy dữ liệu
            fetchData();
        }
    }
    async createNewMovie(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        try {
            await Movies.find({ title: req.body.title })
                .then(async (detail) => {
                    var movie = mutipleMongooseToObjest(detail);
                    if (movie[0]) {
                        res.status(500).json({ error: "Add false" });
                    } else if (
                        req.body.backdrop_path &&
                        req.body.genre_ids &&
                        req.body.original_title &&
                        req.body.poster_path &&
                        req.body.overview &&
                        req.body.title
                    ) {
                        const Movie = await Movies.create(req.body);
                        res.status(200).send({ movie: Movie });
                    } else {
                        res.status(500).json({ error: "Error value input" });
                    }
                })
                .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
        } catch (error) {
            res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
        }
    }
    updateOneMovieById(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const updatedMovie = await Movies.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true },
                );
                res.status(200).send({ movie: updatedMovie });
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    deleteOneMovieById(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const result = await Movies.findByIdAndDelete(req.params.id);
                if (result) {
                    res.status(200).send({
                        result: "Successfully deleted one document.",
                    });
                } else {
                    res.status(200).send({
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

module.exports = new movies();
