const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");
const router = require("./router");
const axios = require("axios");

require("dotenv").config();
var bodyParser = require("body-parser");
const _AuthMiddleware = require("./common/_AuthMiddleWare");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8090;

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type",
    );
    next();
});

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
