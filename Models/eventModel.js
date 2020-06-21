let mongoose = require("mongoose");
let eventSchema = new mongoose.Schema({
    _id:Number,
    title:String,
    mainSpeaker:{type:Number,ref:"speakers"},
    otherSpeakers:[{type:Number,ref:"speakers"}]
});
mongoose.model("event" ,eventSchema);