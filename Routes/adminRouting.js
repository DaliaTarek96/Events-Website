let express = require("express"),
    adminRouting = express.Router();
// check if user admin or not 
adminRouting.use((request,response,next)=>{
    if(request.session.role=="admin")next();
    else response.redirect("/login");
});
adminRouting.get("/profile",(request,response)=>{
    response.render("pageOwner/administrator");
});
module.exports = adminRouting;