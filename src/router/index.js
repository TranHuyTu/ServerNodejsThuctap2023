const newsRouter = require("./news");
const siteRouter = require("./site");

function router(app) {
    app.get("/", (req, res) => {
        res.render("home");
    });
    app.use("/new", newsRouter);
    app.use("/", siteRouter);
}

module.exports = router;
