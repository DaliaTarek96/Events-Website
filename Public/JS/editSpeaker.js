$(function(){
    $(".speaker ,.overlay").css({minHeight:$(window).innerHeight()-50+"px"});
    $(".Update").css({backgroundColor:'#dc3545', cursor:"text"});
    $(".Update").attr("disabled",true);
    $('input,select').on("change",function(){
        $(".Update").css({backgroundColor:'#28a745',cursor:"pointer"});
        $(".Update").attr("disabled",false);
    });
});
