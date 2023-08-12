const siteRouter = require("./site");
const movieRouter = require("./movie");

function router(app) {
    // app.get("/", (req, res) => {
    //     res.render("home");
    // });
    app.use("/movie", movieRouter);
    app.use("/", siteRouter);
}

module.exports = router;