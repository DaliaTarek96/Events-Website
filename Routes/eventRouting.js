let express=require("express"),
    eventRouting = express.Router(),
    mongoose = require("mongoose");
// check if user admin or not 
eventRouting.use((request,response,next)=>{
    if(request.session.role=="admin")next();
    else response.redirect("/login");
});
//event schema
require("./../Models/eventModel");
let  eventSchema= mongoose.model("event");
//speaker schema
require("./../Models/speakerModel");
let speakerSchema = mongoose.model("speakers");
//Event counter schema
require ("../Models/counterModel");
let EventCounter =mongoose.model("counter");
// list get
eventRouting.get("/list",(request,response)=>{
    eventSchema.find({}).populate({path:"mainSpeaker otherSpeakers"})
    .then((data=>{
        response.render("Events/events" ,{events:data});
    })).catch((error)=>{
        console.log(error);
        response.send("Sorry, page in maintanance..."); 
        });
});//end
// add get
eventRouting.get("/add",(request,response)=>{
    speakerSchema.find({}).then((data)=>{
        console.log(data)
        response.render("Events/addEvents",{speakers:data});
    }).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance..."); });
    
});//end
// add post
eventRouting.post("/add",(request,response)=>{
    EventCounter.findOne({_id:2}).then((counter)=>{
        let eventObject = new eventSchema({
            _id:counter.count,
            title:request.body.title,
            mainSpeaker:request.body.mainSpeaker,
            otherSpeakers:request.body.otherSpeakers
        });
        eventObject.save().then((data)=>{
            EventCounter.updateOne({_id:2},{$set:{count:counter.count+1}}).then((data)=>{}).catch((error)=>{response.send(error)});
            response.redirect("/event/list");
           }).catch((error)=>{console.log(error)
            response.send("Sorry, page in maintanance..."); });
    }).catch((error)=>{
        console.log(error)
        response.send("Sorry, page in maintanance..."); });
    
});//end
// edit get
eventRouting.get("/edit/:id",(request,response)=>{
    eventSchema.findOne({_id:request.params.id}).populate({path:"mainSpeaker otherSpeakers"})
    .then((data)=>{
        speakerSchema.find({}).then((dataSpeaker)=>{
            response.render("events/editevents",{events:data ,speakers:dataSpeaker});
        }).catch((error)=>{console.log(error)
            response.send("Sorry, page in maintanance...");});
    }).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance...");});
});//end
// edit post
eventRouting.post("/edit/:id",(request,response)=>{
    eventSchema.updateOne({_id:request.params.id},{
        $set:{
            title:request.body.title,
            mainSpeaker:request.body.mainSpeaker,
            otherSpeakers:request.body.otherSpeakers
        }
    }).then((data)=>{
        response.redirect("/event/list");
       }).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance...");});
});//end
// delete post
eventRouting.post("/delete",(request,response)=>{
    eventSchema.deleteOne({_id:request.body.id}).then((data)=>{
        response.send("success");
       }).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance...");});
});//end

module.exports=eventRouting;