const path = require("path");
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;

// if (cluster.isMaster) {
//     // Fork workers for each CPU
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on("exit", (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//     });

//     // Lắng nghe tin nhắn từ worker process
//     cluster.on("message", (worker, message) => {
//         console.log(
//             `Master received message from Worker ${worker.id}: ${message}`,
//         );
//     });

//     // Gửi yêu cầu tới worker process
//     Object.values(cluster.workers).forEach((worker) => {
//         worker.send("Please handle this request");
//     });
// } else {
//     // Workers can share any TCP connection
//     // In this case it is an HTTP server
//     app.listen(port, () => {
//         console.log(`App listening on port ${port} worker ${process.pid}`);
//     });
// }

// const util = require("node:util");
// const execFile = util.promisify(require("node:child_process").execFile);
// const ex = require("./example");

// async function getVersion() {
//     const { stdout } = await execFile("node", ex, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Lỗi: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.error(`Lỗi chuẩn: ${stderr}`);
//             return;
//         }
//         const fileContent = stdout;
//         console.log(`Nội dung của file: ${fileContent}`);
//     });
//     console.log(stdout);
// }
// getVersion();

// const {
//     Worker,
//     isMainThread,
//     parentPort,
//     workerData,
// } = require("worker_threads");

// if (isMainThread) {
//     // Chạy trong luồng chính
//     const someData = {
//         /* dữ liệu bạn muốn chia sẻ với worker */
//     };

//     // Tạo một worker mới và truyền dữ liệu vào
//     const worker = new Worker(__filename, {
//         workerData: someData,
//     });

//     // Lắng nghe sự kiện message từ worker
//     worker.on("message", (result) => {
//         console.log("Kết quả từ worker:", result);
//     });

//     // Gửi dữ liệu từ luồng chính đến worker
//     worker.postMessage({
//         /* dữ liệu bạn muốn gửi cho worker */
//     });
// } else {
//     // Chạy trong luồng worker
//     parentPort.on("message", (data) => {
//         // Xử lý tính toán lớn ở đây, sử dụng dữ liệu từ parentPort
//         // const result = performHeavyComputation(data);

//         // Gửi kết quả trở lại luồng chính
//         // parentPort.postMessage(result);

//         setInterval(() => {
//             const result = performHeavyComputation(data);
//             parentPort.postMessage(result);
//         }, 20000);
//     });
// }

// function performHeavyComputation(data) {
//     function fibonacciIterative(n) {
//         if (n <= 1) {
//             return n;
//         } else {
//             let fib = [0, 1];
//             for (let i = 2; i <= n; i++) {
//                 fib[i] = fib[i - 1] + fib[i - 2];
//             }
//             return fib[n];
//         }
//     }

//     const n = parseInt(Math.random() * 1000); // Số Fibonacci bạn muốn tính
//     const result = fibonacciIterative(n);
//     return result;
// }

// const { StaticPool } = require("node-worker-threads-pool");

// const filePath = "./src/worker.js";

// const pool = new StaticPool({
//     size: 4,
//     task: filePath,
//     workerData: "workerData!",
// });

// for (let i = 0; i < 20; i++) {
//     (async() => {
//         const num = 40 + Math.trunc(10 * Math.random());

//         // Khởi chạy một tác vụ bằng cách sử dụng StaticTaskExecutor
//         const taskExecutor = pool.createExecutor();

//         taskExecutor
//             .setTimeout(1000000)
//             .exec(num)
//             .then((result) => {
//                 console.log(`Fibonacci(${num}) result:`, result);
//                 // taskExecutor.destroy(); // Đừng quên phải hủy executor khi đã hoàn thành
//                 // pool.destroy(); // Hủy pool khi bạn không cần nữa
//             })
//             .catch((error) => {
//                 console.error("Lỗi:", error);
//                 taskExecutor.destroy();
//                 pool.destroy();
//             });

//         // This will choose one idle worker in the pool
//         // to execute your heavy task without blocking
//         // the main thread!
//         // const res = await pool.exec(num);

//         // console.log(`Fibonacci(${num}) result:`, res);
//     })();
// }
