const { execFile } = require("child_process");
const ex = require("./example");

execFile("node", ex, (error, stdout, stderr) => {
    if (error) {
        console.error(`Lỗi: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Lỗi chuẩn: ${stderr}`);
        return;
    }
    console.log(`Kết quả: ${stdout}`);
});
