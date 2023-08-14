const User = require("../module/User");

var JWT = require("../../common/_JWT");

class login {
    Login(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const data = req.body;
                await User.find(data).then(async (user) => {
                    const us = {
                        name: user[0].name,
                        password: user[0].password,
                    };
                    const _token = await JWT.make(us);
                    res.send({ token_login: _token });
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
                await User.find(decode.data).then(async (user) => {
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
                const newUser = new User(req.body);
                const savedUser = await newUser.save();
                res.send(savedUser);
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
}

module.exports = new login();
