const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb://atlas-sql-648be748d266c56101ec7f80-wmuk2.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin",
            { useNewUrlParser: true, useUnifiedTopology: true },
        );
        console.log("connest successfully !!!!!");
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connect };
