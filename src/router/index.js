const siteRouter = require("./site");
const movieRouter = require("./movie");
const commentRouter = require("./comment");
const loginRouter = require("./login");
const uploadRouter = require("./uploadimage");
const productRouter = require("./product");
const _AuthMiddleware = require("../common/_AuthMiddleWare");

function router(app) {
    // app.get("/", (req, res) => {
    //     res.render("home");
    // });
    app.use("/login", loginRouter);
    app.use("/movie", movieRouter);
    app.use("/comment", commentRouter);
    app.use("/upload", uploadRouter);
    app.use("/product", productRouter);
    app.use("/", siteRouter);
    app.use(_AuthMiddleware.isAuth);
}

module.exports = router;
