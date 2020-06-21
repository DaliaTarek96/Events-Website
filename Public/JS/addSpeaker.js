$(function(){
    $(".speaker ,.overlay").css({minHeight:$(window).innerHeight()-50+"px"});
    checkInputs();
    $('input').on("change",function(){
        checkInputs();
    });
});
function checkInputs(){
    name =$("input[placeholder='Full Name']").val();
    userName = $("input[placeholder='User Name']").val();
    password =$("input[placeholder='User Password']").val();
    age = $("input[placeholder='User Age']").val();
    if(name == ""|| userName==""  || password=="" || age==""){
        $(".Update").css({backgroundColor:'#dc3545', cursor:"text"});
        $(".Update").attr("disabled",true);
    } 
    else{
        $(".Update").css({backgroundColor:'#28a745',cursor:"pointer"});
        $(".Update").attr("disabled",false);
    }
}