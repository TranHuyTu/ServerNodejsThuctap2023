module.exports = {
    mutipleMongooseToObjest: function(mongoose) {
        return mongoose.slice(0, 12).map((comment) => comment.toObject());
    },
    MongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject : mongoose;
    },
};