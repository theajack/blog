//login regist logout
var username="一个小猴子aaaaaa";
var c_name=["cover-block","input-wrapper"];
J.ready(function(){
  //if(checkLogin()){
  initEvent();
  if(false){
    //J.class("regist").add
    S(".login .text").text(username);
  }else{
    J.class("user-center").css("display","none");
    J.class("logout").css("display","none");
  }  
});
function initEvent(){
  J.class("login").event("onclick",openLogin);
  J.class("regist").event("onclick",openRegist);
}
function checkLogin(){
  username=J.cookie("username");
  if(username==""||username==undefined){
    return false;
  }else{
    /*与后端确认*/
    return true;
  }
}
function openLogin(){
 J.class("login-cover").fadeIn();
}
function openRegist(){
 J.class("regist-cover").fadeIn();
}
function closeLogin(obj){
  obj.fadeOut();
}
function stopLoginBubble(e){
  if(e&&e.stopPropagation){
    e.stopPropagation();
  }else{
    window.event.cancelBubble=true;
  }
}
function regist(){
  J.class("regist-cover").validate(function(data){
    var postData=J.class("regist-cover").get();
    alert(JSON.stringify(data));
    if(postData.password==postData.passwordAgain){
      delete postData.passwordAgain;
      
    }else{
      Jet.show("两次密码输入不一致！","error")
    }
  });
}
function login(){
  J.class("login-cover").validate(function(){
    var postData=J.class("login-cover").get();
    
  });
}
