// requires
let express = require("express"),
    authRouting = require("./Routes/authRouting"),
    path = require("path"),
    body_pareser=require("body-parser"),
    speakerRouting = require("./Routes/speakerRouting"),
    mongoose = require("mongoose"),
    eventRouting = require("./Routes/eventRouting"),
    adminRouting = require("./Routes/adminRouting"),
    express_session = require("express-session"),
    connect_flash =  require("connect-flash") ;
    
//open
let server = express();
mongoose.connect("mongodb://localhost:27017/itieventsDB",{ useNewUrlParser: true, useUnifiedTopology: true });
//middle ware
/*************First MW *********** */
server.use((request,response,next)=>{
    console.log(request.url+" "+request.method);
    next();
});
/*************Check For Maintance MW *********** */
server.use((request,response,next)=>{
    let minDate = (new Date()).getMinutes();
    if(false){//minDate <40){
        next(new Error("Sorry, Page now in maintance......."))
    }else{
        next();
    }
});
// setting
server.use(express.static(path.join(__dirname,"node_modules","bootstrap","dist")));
server.use(express.static(path.join(__dirname,"Public")));
server.use(express.static(path.join(__dirname,"node_modules","jquery","dist")));
server.use(body_pareser.urlencoded({extended:false}));
server.use(body_pareser.json());
server.set("view engine","ejs");
server.set("views",path.join(__dirname,"Views"));
server.use(express_session({secret:"dalia",resave:false,saveUninitialized:false}));
server.use(connect_flash());
/*************Route MW *********** */
server.use("/home",(request,response)=>{
    response.render("home");
});
server.use(authRouting);
// check session
server.use((request,response,next)=>{
    if(request.session.role){
        response.locals.UserName = request.session.UserName;
        if(request.session.role=="admin")response.locals.state="admin";
        else response.locals.state="speaker"
        next();
     }else{
        request.flash("msg","Session Ended ...");
        response.redirect("/login");
    }
    
})
server.use("/admin",adminRouting);
server.use("/speaker",speakerRouting);
server.use("/event",eventRouting);
/*************Last MW *********** */
server.use((request,response,next)=>{
    response.send("Welcome to our page");
    next();
});
/*************Error MW *********** */
server.use((error,request,response,next)=>{
    response.send(error+"");
});
//listen
let port = process.env.port || 8089;
server.listen(port , ()=>{
    console.log("I am listening now .......")
});