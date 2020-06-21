let express = require("express"),
    // bcrypt = require("bcrypt"),
    speakerRouting =express.Router(),
    mongoose = require("mongoose"),
    Cryptr = require("cryptr"),
    cryptr = new Cryptr("myTotalySecretKey");

// speaker schema 
require ("../Models/speakerModel");
let speakerSchema =mongoose.model("speakers");
//speaker counter schema
require ("../Models/counterModel");
let speakerCounter =mongoose.model("counter");

// event schema 
require ("../Models/eventModel");
let eventSchema =mongoose.model("event");
//speaker profile 
speakerRouting.get("/profile",(request,response)=>{
    eventSchema.find({}).populate({path:"mainSpeaker otherSpeakers"}).then((data)=>{
        response.render("speakerinfo/speakerProfile",{events:data});
    }).catch((error)=>{console.log(error);
        response.send("Sorry, page in maintanance...");});
});
// check if speaker admin or not 
speakerRouting.use((request,reponse,next)=>{
    if (request.session.role=="admin")next();
    else reponse.redirect("/login");  
});
// list get
speakerRouting.get("/list",(request,response)=>{
    speakerSchema.find({}).then((data=>{
       response.render("Speakerinfo/speakers",{speakers:data ,name:"dalia"});
    })).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance...");});
});//end
// add get
speakerRouting.get("/add",(request,response)=>{
    response.render("Speakerinfo/addSpeaker",{errorMessage:request.flash("adminMsg")});
});//end
// add post
speakerRouting.post("/add",(request,response)=>{
    //encrypt password
    // bcrypt.genSalt(10,function(error,salt){// =>  to generat algorithem to encryption
    //     bcrypt.hash(request.body.Password,salt).then((hash)=>{ // => send data we want to encrypt & encryption key
    //         // add new speaker
     let  encryptPassword = cryptr.encrypt(request.body.Password); // to encrypt password
            speakerCounter.findOne({_id:1}).then((counter)=>{
                let speakerObject = new speakerSchema({
                    _id:counter.count,
                    name:request.body.name,
                    age:request.body.age,
                    userName :request.body.username,
                    password :encryptPassword
                });
                // check if user name the same of admin or not 
                if(!(request.body.username=="dalia")){
                    speakerObject.save().then((data)=>{
                        speakerCounter.updateOne({_id:1},{$set:{count:counter.count+1}}).then((data)=>{}).catch((error)=>{response.send(error)});
                        response.redirect("/speaker/list");
                    }).catch((error)=>{console.log(error)
                        response.send("Sorry, page in maintanance...");});
                }else{
                    request.flash("adminMsg","Sorry, This user name for admin ...");
                    response.redirect("/speaker/add");
                }
                
            }).catch((error)=>{console.log(error)
                response.send("Sorry, page in maintanance...");});
    //     }).catch((error)=>{console.log(error)});
    // });
  
});//end
// edit get
speakerRouting.get("/edit/:id",(request,response)=>{  
    speakerSchema.findOne({_id:request.params.id}).then((data)=>{
        //decrypt password 
        response.locals.password = cryptr.decrypt(data.password)
        response.render("Speakerinfo/editSpeakers",{speakers:data });
    }).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance...");});
});//end
// edit post
speakerRouting.post("/edit/:id",(request,response)=>{
    // to encrypt password
    let encryptPassword = cryptr.encrypt(request.body.Password);
    speakerSchema.updateOne({_id:request.params.id},{
        $set:{
            name:request.body.name,
            age:request.body.age,
            userName :request.body.username,
            password :encryptPassword
        }
    }).then((data)=>{
        response.redirect("/speaker/list");
       }).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance...");});
});//end
//delete get replace by ajax
speakerRouting.post("/delete",(request,response)=>{
    speakerSchema.deleteOne({_id:request.body.id}).then((data)=>{
        response.send("success");
       }).catch((error)=>{console.log(error)
        response.send("Sorry, page in maintanance...");});
});//end


module.exports = speakerRouting;