const Products = require("../module/Product");
const {
    MongooseToObject,
    mutipleMongooseToObjest,
} = require("../../util/mongoose");
const mongoose = require("mongoose");
class Product {
    productAll(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Products.find({})
                    .then((Products) => {
                        Products = mutipleMongooseToObjest(Products);
                        res.send({ Products });
                    })
                    .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    productByUser(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                await Products.find({ user_id: req.params.id })
                    .then((Products) => {
                        Products = mutipleMongooseToObjest(Products);
                        res.status(200).send({ Products });
                    })
                    .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    async createNewProduct(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        try {
            const Product = await Products.create(req.body);
            res.status(200).send(Product);
        } catch (error) {
            res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
        }
    }
    updateOneProductById(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const updatedProduct = await Products.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true },
                );
                res.send(updatedProduct);
            } catch (error) {
                res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
            }
        }

        // Gọi hàm để thực hiện lấy dữ liệu
        fetchData();
    }
    deleteOneProductById(req, res, next) {
        // Lấy dữ liệu từ MongoDB bằng async/await
        async function fetchData() {
            try {
                const result = await Products.deleteOne({
                    _id: mongoose.Types.ObjectId.createFromHexString(
                        req.params.id,
                    ),
                });
                if (result.deletedCount === 1) {
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

module.exports = new Product();
