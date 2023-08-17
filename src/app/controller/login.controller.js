const User = require("../module/User");
const crypto = require("crypto");
var JWT = require("../../common/_JWT");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

class login {
    Login(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await User.find({
                    email: req.body.email,
                }).then((user) => {
                    bcrypt.compare(
                        req.body.password + user[0].salt,
                        user[0].password,
                        async (err, result) => {
                            if (err) {
                                console.error(
                                    "Error comparing passwords:",
                                    err,
                                );
                                return;
                            }
                            if (result) {
                                var _token = await JWT.make(user[0]);
                                console.log(_token);
                                res.send({ token_login: _token });
                            } else {
                                res.send("Password does not match");
                            }
                        },
                    );
                    // res.send(user);
                });
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    Decoded(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const token = req.headers["authorization"];
                const decode = await JWT.check(token);
                await User.findById(decode.data._id).then(async (user) => {
                    res.send({ user: user });
                });
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    Register(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const salt = crypto.randomBytes(5).toString("hex");

                // Số vòng lặp để tăng độ phức tạp của quá trình hash (càng cao càng tốn thời gian)
                const saltRounds = 10;

                bcrypt.hash(
                    req.body.password + salt,
                    saltRounds,
                    async (err, hash) => {
                        if (err) {
                            console.error("Error hashing password");
                            return;
                        }
                        const newUser = new User({
                            salt: salt,
                            ...req.body,
                            password: hash,
                        });
                        const savedUser = await newUser.save();
                        res.send(newUser);
                    },
                );
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    UpdateUser(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await User.findById(req.params.id).then(async (user) => {
                    // Số vòng lặp để tăng độ phức tạp của quá trình hash (càng cao càng tốn thời gian)
                    const saltRounds = 10;

                    bcrypt.hash(
                        req.body.password + user.salt,
                        saltRounds,
                        async (err, hash) => {
                            if (err) {
                                console.error("Error hashing password");
                                return;
                            }
                            const newUser = new User({
                                _id: mongoose.Types.ObjectId.createFromHexString(
                                    req.params.id,
                                ),
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                                salt: user.salt,
                            });
                            console.log(req.params.id, newUser);

                            const updatedUser = await User.updateOne(
                                {
                                    _id: mongoose.Types.ObjectId.createFromHexString(
                                        req.params.id,
                                    ),
                                },
                                newUser,
                                { new: true },
                            );
                            res.send(updatedUser);
                        },
                    );
                });
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
}

module.exports = new login();
