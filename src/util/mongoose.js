module.exports = {
    mutipleMongooseToObjest: function(mongoose) {
        return mongoose.slice(0, 20).map((comment) => comment.toObject());
    },
    MongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject : mongoose;
    },
};