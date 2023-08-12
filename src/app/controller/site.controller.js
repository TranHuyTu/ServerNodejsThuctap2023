const Movies = require("../module/Movie");
const { mutipleMongooseToObjest } = require("../../util/mongoose");

class home {
    Show(req, res, next) {
        res.render("home");
    }
}

module.exports = new home();
