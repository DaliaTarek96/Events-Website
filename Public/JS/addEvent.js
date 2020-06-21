$(function(){
    $(".speaker ,.overlay").css({minHeight:$(window).innerHeight()-50+"px"});
    checkInputs();
    $('select,input[placeholder="Title"]').on("change",function(){
        checkInputs();
    });
});
function checkInputs(){
    title =$("input[placeholder='Title']").val();
    mainSpeaker = $("select[name='mainSpeaker']").val();
    if(title == ""|| mainSpeaker=="Choose Main Speaker"  ){
        $(".Update").css({backgroundColor:'#dc3545', cursor:"text"});
        $(".Update").attr("disabled",true);
    } 
    else{
        $(".Update").css({backgroundColor:'#28a745',cursor:"pointer"});
        $(".Update").attr("disabled",false);
    }
}