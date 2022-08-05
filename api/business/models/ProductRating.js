"use-strict";

const { MongoosePool, DateMixin } = require("@dpapplications/commons-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProductRating = new Schema({
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true, index: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
        value: {},
        creationDate: {}
    }
);

module.exports = MongoosePool.db().model('', ProductRating, 'product_rating');