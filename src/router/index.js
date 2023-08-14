const siteRouter = require("./site");
const movieRouter = require("./movie");
const commentRouter = require("./comment");
const loginRouter = require("./login");

function router(app) {
    // app.get("/", (req, res) => {
    //     res.render("home");
    // });
    app.use("/comment", commentRouter);
    app.use("/movie", movieRouter);
    app.use("/login", loginRouter);
    app.use("/", siteRouter);
}

module.exports = router;
