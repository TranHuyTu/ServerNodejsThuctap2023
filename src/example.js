// example.js

const fs = require("fs");

// Đọc nội dung của một tệp và in ra màn hình
fs.readFile(`${__dirname}\\example.txt`, "utf8", (err, data) => {
    if (err) {
        console.error(`Lỗi: ${err.message}`);
        return;
    }
    setTimeout(() => {
        console.log(`Nội dung của tệp: ${data}`);
    }, 5000);
});

console.log("Đã bắt đầu đọc tệp...");
