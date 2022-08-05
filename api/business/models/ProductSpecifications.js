"use-strict";

const { MongoosePool, DateMixin } = require("@dpapplications/commons-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProductSpecifications = new Schema({
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true, index: true },
        color: { type: String, required: true, index: true },
        size: { type: String, required: true, index: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true, index: true },
        imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'image.files', required: false },
        active: { type: Boolean, required: false, default: true },
        creationDate: { type: Date, default: () => DateMixin.newDate(), required: true },
        lastUpdateDate: { type: Date, default: () => DateMixin.newDate(), required: true }
    }
);

module.exports = MongoosePool.db().model('', ProductSpecifications, 'product_specifications');