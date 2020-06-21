$(function(){
    console.log($(window).innerHeight())
    $(".loginSlider").css({height:$(window).innerHeight()});
});
$('input').on('change',function(){
    name = $("input[placeholder='Name']").val();
    UserName = $("input[placeholder='User Name']").val();
    password = $("input[placeholder='User Password']").val();
    ConfirmPassword = $("input[placeholder='Confirm Password']").val();
    mail = $("input[placeholder='User Email']").val();
    age = $("input[placeholder='User Age']").val();
    if(name==""||UserName==""||password==""||mail==""||age==""){
        $('input[type="submit"]').attr("disabled",true);
    }else{
        $('input[type="submit"]').attr("disabled",false);
    }
});
