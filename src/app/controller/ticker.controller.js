const Tickers = require("../module/Ticker");
const {
  MongooseToObject,
  mutipleMongooseToObjest,
} = require("../../util/mongoose");
const mongoose = require("mongoose");
class Ticker {
  TickerAll(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        await Tickers.find({})
          .then((Tickers) => {
            Tickers = Tickers.map((item) => item.toObject());
            res.send({ Tickers });
          })
          .catch(next); // Sử dụng phương thức find() để lấy tất cả tài liệu từ collection Users
      } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
      }
    }

    // Gọi hàm để thực hiện lấy dữ liệu
    fetchData();
  }
  TickerDetail(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        await Tickers.find({
          $or: [
            { symbol: req.params.id },
            { companyName: { $regex: req.params.id, $options: "i" } },
          ],
        })
          .then((Tickers) => {
            Tickers = mutipleMongooseToObjest(Tickers);
            if (Tickers.length != 0) {
              res.status(200).send({ Tickers });
            } else {
              res.status(404).send({ Error: "No information found" });
            }
          })
          .catch(next);
      } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
      }
    }

    // Gọi hàm để thực hiện lấy dữ liệu
    fetchData();
  }
  async createNewTicker(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    try {
      await Tickers.find({
        $or: [{ symbol: req.params.id }, { companyName: req.params.id }],
      })
        .then(async (Ticker) => {
          Ticker = mutipleMongooseToObjest(Ticker);
          if (Ticker.length == 0) {
            const newTicker = new Tickers({
              ...req.body,
            });
            const savedTicker = await newTicker.save();
            res.status(200).send(newTicker);

            // const Ticker = await Tickers.create(req.body);
            // res.status(200).send(Ticker);
          } else {
            res.status(404).send({ Error: "Create False" });
          }
        })
        .catch(next);
    } catch (error) {
      res.status(500).json({ Error: "Create False" }); // Xử lý lỗi nếu có
    }
  }
  updateOneTickerById(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        const updatedTicker = await Tickers.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.send(updatedTicker);
      } catch (error) {
        res.status(500).json({ error: error.message }); // Xử lý lỗi nếu có
      }
    }

    // Gọi hàm để thực hiện lấy dữ liệu
    fetchData();
  }
  deleteOneTickerById(req, res, next) {
    // Lấy dữ liệu từ MongoDB bằng async/await
    async function fetchData() {
      try {
        const result = await Tickers.deleteOne({
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

module.exports = new Ticker();
