"use-strict";

const { MongoosePool, DateMixin } = require("@dpapplications/commons-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Product = new Schema({
        name: { type: String, required: true },
        description: { type: String, required: false },
        creationDate: { type: Date, default: () => DateMixin.newDate(), required: true },
        lastUpdateDate: { type: Date, default: () => DateMixin.newDate(), required: true }
    }
);

module.exports = MongoosePool.db().model('', Product, 'product');