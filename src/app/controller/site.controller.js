class site {
    index(req, res) {
        res.render("home");
    }
}

module.exports = new site();
