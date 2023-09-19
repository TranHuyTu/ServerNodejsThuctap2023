const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");
const router = require("./router");

// Cài đặt các tùy chọn SSL
// const options = {
//     key: fs.readFileSync("path/to/private-key.pem"), // Path to private key file
//     cert: fs.readFileSync("path/to/certificate.pem"), // Path to certificate file
//     passphrase: "your-passphrase", // Passphrase for the private key (if applicable)
//     ca: [fs.readFileSync("path/to/ca-cert.pem")], // An array of certificate authority certificates
//     requestCert: true, // Request client certificates
//     rejectUnauthorized: true, // Reject connections if client's certificate is invalid
// };

require("dotenv").config();
var bodyParser = require("body-parser");
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

// Sử dụng express-rate-limit middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Thời gian cửa sổ (15 phút)
    max: 150, // Số yêu cầu tối đa trong mỗi cửa sổ
});

app.use(limiter);

// Sử dụng compression middleware
app.use(compression());

// Sử dụng express-session middleware
app.use(
    session({
        secret: "your-secret-key", // Khóa bí mật để ký phiên
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
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            defaultSrc: ["'self'", "localhost:8080"],
            imgSrc: ["'self'", "image.tmdb.org", "th.bing.com"],
            scriptSrc: ["'self'", "cdn.jsdelivr.net", "code.jquery.com"],
            // Các hạn chế khác ở đây
        },
    }),
);

router(app);

// Tạo máy chủ HTTPS
// const server = https.createServer(options, app);

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// });

// const cluster = require("node:cluster");
// const http = require("node:http");
// const numCPUs = require("node:os").availableParallelism();

// if (cluster.isPrimary) {
//     // console.log(`Primary ${process.pid} is running`);

//     // // Fork workers.
//     // for (let i = 0; i < numCPUs; i++) {
//     //     cluster.fork();
//     // }

//     // // Lắng nghe sự kiện fork
//     // cluster.on("fork", (worker) => {
//     //     console.log(`Worker ${worker.process.pid} đã được tạo.`);
//     // });

//     // cluster.on("online", (worker) => {
//     //     console.log(`Worker ${worker.process.pid} đã online.`);
//     // });

//     // cluster.on("exit", (worker, code, signal) => {
//     //     console.log(`worker ${worker.process.pid} died`);
//     // });

//     // ...

//     const worker = cluster.fork();

//     // Gửi dữ liệu tới worker process
//     worker.send({ message: "Hello from master!" });

//     // Lắng nghe dữ liệu từ worker process
//     worker.on("message", (msg) => {
//         console.log(`Master đã nhận được thông điệp từ worker: ${msg.message}`);
//     });
// } else {
//     process.on("message", (msg) => {
//         console.log(`Worker đã nhận được thông điệp từ master: ${msg.message}`);
//         // Phản hồi với thông điệp
//         process.send({ message: "Hello from worker!" });
//     });

//     console.log(`Worker ${process.pid} started`);
// }

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    // Fork workers for each CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

    // Lắng nghe tin nhắn từ worker process
    cluster.on("message", (worker, message) => {
        console.log(
            `Master received message from Worker ${worker.id}: ${message}`,
        );
    });

    // Gửi yêu cầu tới worker process
    Object.values(cluster.workers).forEach((worker) => {
        worker.send("Please handle this request");
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.listen(port, () => {
        console.log(`App listening on port ${port} worker ${process.pid}`);
    });
}
