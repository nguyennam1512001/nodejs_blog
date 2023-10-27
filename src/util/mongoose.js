const { default: mongoose } = require("mongoose")

module.exports = {
    mutipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose => (mongoose ? mongoose.toObject() : null));
    },

    mongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : null; 
    }
}
