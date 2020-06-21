let express = require("express"),
    path = require("path"),
    authRouting = express.Router(),
    mongoose = require("mongoose"),
    Cryptr = require("cryptr"),
    cryptr = new Cryptr("myTotalySecretKey");
// get speaker schema
require(path.join(__dirname,"..","Models","speakerModel"));   
let speakerSchema = mongoose.model("speakers"); 
//login get
authRouting.get("/login",(request,response)=>{
    response.render("login/login",{errormessage:request.flash("msg")});
});//end

//login post
authRouting.post("/login",(request,response)=>{
    let name = request.body.UserName ,
        password = request.body.UserPassword;
    if(request.body.UserName =="dalia" && request.body.UserPassword=="123"){
        request.session.role = "admin";
        request.session.UserName =  request.body.UserName;
        response.redirect("/admin/profile");
    }
    else{
        speakerSchema.find({}).then((data)=>{
            let speaker = 0;// check if speaker or not
            if(!(data.length==0)){
                for(n in data){
                if (data[n].userName==name&& cryptr.decrypt(data[n].password)==password){
                    request.session.role = "speaker";
                    request.session.UserName =  data[n].userName;
                    speaker ++;
                    response.redirect("/speaker/profile");
                }
                }
                 if(speaker==0){
                    request.flash("msg","Sorry, Password or User Name incorret ...");
                    response.redirect("/login");
                }
            }else{
                    request.flash("msg","Sorry, Password or User Name incorret ...");
                    response.redirect("/login");
            }  
          }).catch((error)=>{
            console.log(error);
            response.send("Sorry, page in maintanance...");  
            });
    }
});//end

//register get
authRouting.get("/register",(request,response)=>{
    response.render("register/register",{errormessage:request.flash("registerMsg")});
});//end

//register post
authRouting.post("/register",(request,response)=>{
    if(request.body.UserPassword == request.body.ConfirmPassword){
        response.send("Sorry , this service is not available now ,page in maintanance ...");
    }else{
        request.flash("registerMsg","Password & Confirm Password not matched ...");
        response.redirect("/register");
    }
});//end  

//logout get
authRouting.get("/logout",(request,response)=>{
    response.redirect("/login")
});//end
module.exports=authRouting;