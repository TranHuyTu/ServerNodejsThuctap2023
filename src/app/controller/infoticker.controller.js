const InfoTickers = require("../module/InfoTicker");
const {
  MongooseToObject,
  mutipleMongooseToObjest,
} = require("../../util/mongoose");
const mongoose = require("mongoose");

class InfoTicker {
  InfoTickerAll(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        await InfoTickers.find({})
          .then((InfoTickers) => {
            InfoTickers = InfoTickers.map((item) => item.toObject());
            res.send({ InfoTickers });
          })
          .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
      } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
      }
    }

    // Gọi hàm để thực hiện lấy dữ liệu
    fetchData();
  }
  InfoTickerByTicker(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        await InfoTickers.find({ ticker_id: req.params.id })
          .then((InfoTickers) => {
            InfoTickers = InfoTickers.map((item) => item.toObject());
            res.send({ InfoTickers });
          })
          .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
      } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
      }
    }

    // Gọi hàm để thực hiện lấy dữ liệu
    fetchData();
  }

  async createNewInfoTicker(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    try {
      await InfoTickers.find({ title: req.body.title })
        .then(async (InfoTicker) => {
          InfoTicker = mutipleMongooseToObjest(InfoTicker);
          if (InfoTicker.length == 0) {
            const newInfoTicker = new InfoTickers({
              ...req.body,
            });
            const savedInfoTicker = await newInfoTicker.save();
            res.status(200).send(newInfoTicker);
          } else {
            res.status(404).send({ Error: "Create False" });
          }
        })
        .catch(next);
    } catch (error) {
      res.status(500).json({ Error: "Create False" }); // Xử lý lỗi nếu có
    }
  }

  updateOneInfoTickerById(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        const updatedInfoTicker = await InfoTickers.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.send(updatedInfoTicker);
      } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
      }
    }

    // Gọi hàm để thực hiện lấy dữ liệu
    fetchData();
  }
  deleteOneInfoTickerById(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        const result = await InfoTickers.deleteOne({
          _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
        });
        if (result.deletedCount === 1) {
          res.status(200).send({
            result: "Successfully deleted one document.",
          });
        } else {
          res.status(200).send({
            result: "No documents matched the query. Deleted 0 documents.",
          });
        }
      } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
      }
    }

    // Gọi hàm để thực hiện lấy dữ liệu
    fetchData();
  }
}

module.exports = new InfoTicker();
