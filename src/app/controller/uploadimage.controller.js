const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
var crypto = require("crypto");
require("dotenv").config();

exports.uploadImg = function(req, res) {
    try {
        const fileData = req.file;
        return res.status(200).json({ url: fileData.path });
    } catch (error) {
        return interalServerError(error);
    }
};
exports.deleteImg = function(req, res) {
    var data = req.body;
    // console.log(cloudinary.url(data.url));
    // Xoa 1 file
    // cloudinary.uploader.destroy(imageUrl);
    // Xoa nhieu file
    cloudinary.api.delete_resources_by_prefix(
        data.imageUrl,
        function(error, result) {
            if (error) {
                console.error(error);
            } else {
                console.log(result);
                return res.status(200).json("OK");
            }
        },
    );
};
exports.UploadVideoControllers = async function uploadVideo(req, res) {
    // const file = req.file.originalname;
    // const file = req.body.url_file;
    // if (!file) {
    //     res.status(400).json({ error: "Không có tệp tin nào được tải lên." });
    // } else {
    //     console.log(file);
    // }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });

    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        const file = files.file[0].filepath; // Lấy đối tượng file từ form
        console.log(file);

        const upload_preset = "ske802vb"; // Thay bằng upload preset của bạn
        const options = {
            folder: "Image", // Thay đổi đường dẫn nếu cần
            resource_type: "auto",
        };
        cloudinary.uploader
            .unsigned_upload(file, upload_preset, options)
            .then((result) => {
                console.log(result);
                // Xử lý kết quả tải lên tại đây
                res.json({
                    url: result.secure_url,
                    message: "succes",
                });
            })
            .catch((error) => {
                console.error(error);
                // Xử lý lỗi tải lên tại đây
            });
    });

    // // const allowedFormats = ["jpg", "jpeg", "png", "gif"];
    // const upload_preset = "ske802vb"; // Thay bằng upload preset của bạn
    // const options = {
    //     folder: "Image", // Thay đổi đường dẫn nếu cần
    //     resource_type: "auto",
    // };
    // cloudinary.uploader
    //     .unsigned_upload(file, upload_preset, options)
    //     .then((result) => {
    //         console.log(result);
    //         // Xử lý kết quả tải lên tại đây
    //         res.json({
    //             url: result.secure_url,
    //             message: "succes",
    //         });
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         // Xử lý lỗi tải lên tại đây
    //     });

    // await cloudinary.uploader.upload(
    //     file,
    //     {
    //         resource_type: "video",
    //         chunk_size: "100mb",
    //         public_id: `video/${random}`,
    //     },
    //     function (error, result) {
    //         if (error) {
    //             res.json({
    //                 error: error,
    //             });
    //         } else {
    //             res.json({
    //                 public_id: result.public_id,
    //                 url: result.url,
    //                 message: "succes",
    //             });
    //         }
    //     },
    // );
};