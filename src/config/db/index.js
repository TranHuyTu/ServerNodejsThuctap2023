const mongoose = require("mongoose");

const Url =
    // "mongodb://atlas-sql-648e46501618841dbd5e8bc4-fhcgy.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin";
    "mongodb+srv://tranhuytu37:r8e9UQDNDHjTQEQ0@clusternodejs.jqoqqp9.mongodb.net/sample_mflix";
async function connect() {
    try {
        await mongoose.connect(Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connest successfully !!!!!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };