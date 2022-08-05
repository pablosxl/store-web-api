"use-strict";

const { MongoosePool, DateMixin } = require("@dpapplications/commons-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Category = new Schema({
        name: { type: String, required: true },
        description: { type: String },
        active: { type: Boolean, required: false, default: true },
        creationDate: { type: Date, default: () => DateMixin.newDate(), required: true },
        lastUpdateDate: { type: Date, default: () => DateMixin.newDate(), required: true }
    },
    { collection: 'product' }
);

module.exports = MongoosePool.db().model('', Category, 'category');