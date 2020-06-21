let mongoose = require("mongoose");
let counter = new mongoose.Schema({
    _id:Number,
    count:Number
})
mongoose.model("counter",counter);