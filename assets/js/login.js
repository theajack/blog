//login regist logout
var username="一个小猴子aaaaaa";
var lc_name=["cover-block","input-wrapper"];
var htmlCode='\
    <div class="cover display-none login-cover" onclick="closeLogin(this)">\
      <div class="block cover-block" onclick="stopLoginBubble(event)">\
        <div class="block-title">登录</div>\
        <div class="input-wrapper">\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-user"></span>\
            <input type="text" jet-name="username" jet-valid="notnull" placeholder="用户名"/>\
          </div>\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon glyphicon-lock"></span>\
            <input type="password" jet-name="password" jet-valid="notnull" placeholder="密码"/>\
          </div>\
          <div class="button div-center">确认</div>\
        </div>\
      </div>\
    </div>\
    <div class="cover display-none regist-cover" onclick="closeLogin(this)">\
      <div class="block cover-block" onclick="stopLoginBubble(event)">\
        <div class="block-title">注册</div>\
        <div class="input-wrapper">\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-user"></span>\
            <input type="text" jet-name="username" jet-valid="notnull" placeholder="用户名"/>\
          </div>\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-lock"></span>\
            <input type="password" jet-name="password" jet-valid="notnull" placeholder="密码"/>\
          </div>\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-ok-circle"></span>\
            <input type="password" jet-name="passwordAgain" placeholder="确认密码"/>\
          </div>\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-heart"></span>\
            <select placeholder="性别" jet-name="sex">\
              <option>男</option>\
              <option>女</option>\
            </select>\
          </div>\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-calendar"></span>\
            <input type="date" jet-name="birthday" jet-valid="date" placeholder="生日"/>\
          </div>\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-envelope"></span>\
            <input type="text" jet-name="email" jet-valid="email null" placeholder="邮箱"/>\
          </div>\
          <div class="button div-center">确认</div>\
        </div>\
      </div>\
    </div>\
';
J.ready(function(){
  //if(checkLogin()){
  J.body().append(J.new("div").html(htmlCode).initValid());
  initLoginEvent();
  initLoginClass();
  if(false){
    //J.class("regist").add
    S(".login .text").text(username);
  }else{
    J.class("user-center").css("display","none");
    J.class("logout").css("display","none");
  }  
});
function initLoginEvent(){
  J.class("login").event("onclick",openLogin);
  J.class("regist").event("onclick",openRegist);
}
function initLoginClass(){
  lc_name.each(function(item){
    var obj=J.class(item);
    obj.addClass("mobile");
    if(J.width()<960){
      obj.addClass("change");
    }else{
      obj.removeClass("change");
    }
  });
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
