let mongoose = require("mongoose");
let speakerSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    age:Number,
    userName :String,
    password :String
});

mongoose.model("speakers",speakerSchema);