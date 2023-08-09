const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const app = express();
const port = 8080;
const db = require("./config/db");
const router = require("./router");
const axios = require("axios");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Gửi yêu cầu để lấy thông tin cấu hình TMDb

//connestDB
db.connect();

//HTTP loger
app.use(morgan("combined"));

//Template engire
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
    }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

router(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
