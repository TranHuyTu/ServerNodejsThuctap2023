const path = require("path");
const express = require("express");
const session = require("express-session");
const Redis = require("ioredis");
const handlebars = require("express-handlebars");
const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");
const router = require("./router");
const fileUpload = require("express-fileupload");

require("dotenv").config();

var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// app.use(fileUpload({ useTempFiles: true }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const port = process.env.PORT || 8090;

const cors = require("cors");
app.use(cors());

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

// Sử dụng express-rate-limit middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Thời gian cửa sổ (15 phút)
    max: 1500, // Số yêu cầu tối đa trong mỗi cửa sổ
});

app.use(limiter);

// Sử dụng compression middleware
app.use(compression());

// Sử dụng express-session middleware
app.use(
    session({
        secret: "TTD", // Khóa bí mật để ký phiên
        resave: false, // Không lưu lại phiên mỗi lần yêu cầu
        saveUninitialized: true, // Lưu phiên chưa được khởi tạo
    }),
);

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

// Sử dụng helmet.contentSecurityPolicy() middleware
// app.use(helmet());

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             defaultSrc: ["'self'", "localhost:8080"],
//             imgSrc: ["'self'", "image.tmdb.org", "th.bing.com"],
//             scriptSrc: ["'self'", "cdn.jsdelivr.net", "code.jquery.com"],
//             // Các hạn chế khác ở đây
//         },
//     }),
// );

router(app);

const redis = new Redis({
    port: 6379, // Cổng mặc định của Redis
    host: "localhost", // Địa chỉ máy chủ Redis
});

// Sử dụng Redis làm lưu trữ session
app.use(
    session({
        store: new (require("connect-redis")(session))({ client: redis }),
        secret: "Ramos04", // Thay thế bằng khóa bí mật của bạn
        resave: false,
        saveUninitialized: true,
    }),
);

// Các tùy chọn khác và định nghĩa các tuyến đường của ứng dụng
// ...

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
