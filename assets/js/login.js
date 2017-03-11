//login regist logout
var lc_name=["cover-block","input-wrapper"];
var d_uid=1;
var d_nickname="游客";
var u_id=d_uid;
var u_nickname=d_nickname;
var u_password;
var u_photo;
var hasShowNoLogin=false;
var htmlCode='\
    <div class="cover display-none login-cover" onclick="closeLogin()">\
      <div class="block cover-block" onclick="stopBubble(event)">\
        <div class="block-title">登录</div>\
        <div class="input-wrapper">\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-user"></span>\
            <input type="text" jet-name="nickname" jet-valid="notnull" placeholder="用户名"/>\
          </div>\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon glyphicon-lock"></span>\
            <input type="password" jet-name="password" jet-valid="notnull" placeholder="密码"/>\
          </div>\
          <jh jet-name="method">login</jh>\
          <div class="button div-center" onclick="login()">确认</div>\
          <span class="go-regist" onclick="goRegist()">前往注册</span>\
        </div>\
      </div>\
    </div>\
    <div class="cover display-none regist-cover" onclick="closeRegist()">\
      <div class="block cover-block" onclick="stopBubble(event)">\
        <div class="block-title">注册</div>\
        <div class="input-wrapper">\
          <div class="input-item clearfix">\
            <span class="glyphicon glyphicon-user"></span>\
            <input type="text" jet-name="nickname" jet-valid="notnull" placeholder="用户名"/>\
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
              <option value="1">男</option>\
              <option value="0">女</option>\
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
          <jh jet-name="method">regist</jh>\
          <div class="button div-center" onclick="regist()">确认</div>\
        </div>\
      </div>\
    </div>\
';
J.ready(function(){
  J.body().append(J.new("div").html(htmlCode).initValid());
  initLoginEvent();
  initLoginClass();
  if(initLogin()){
    S(".login .text").text(u_nickname);
  }else{
    J.class("user-center").hide();
    J.class("logout").hide();
  }
});
function initLoginEvent(){
  J.class("login").event("onclick",openLogin);
  J.class("regist").event("onclick",openRegist);
  J.class("logout").event("onclick",logout);
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
function closeLogin(){
  closeCover(J.class("login-cover").clear());
}
function closeRegist(){
  closeCover(J.class("regist-cover").clear());
}
function openLogin(){
  J.class("login-cover").select("[jet-name=method]").text("login");
  openCover(J.class("login-cover"));
}
function openRegist(){
  J.class("regist-cover").select("[jet-name=method]").text("regist");
  openCover(J.class("regist-cover"));
}
function regist(){
  J.class("regist-cover").validate(function(data){
    if(data.password==data.passwordAgain){
      delete data.passwordAgain;
      jsonp(data,function(res){
        if(res=="true"){
          closeRegist();
          J.class("login-cover").set(data);
          openLogin();
          J.show("注册成功");
        }else if(res=="false"){
          J.show("服务器出错，注册失败。","error");
        }else{
          J.show("该用户名已被注册。","error");
        }
      });
    }else{
      Jet.show("两次密码输入不一致！","error")
    }
  });
}
function login(){
  J.class("login-cover").validate(function(data){
    jsonp(data,function(res){
      if(res){
        closeLogin();
        S(".login .text").text(data.nickname);
        J.class("user-center").show();
        J.class("logout").show();
        initUserInfo(data);
      }
    },"登录");
  });
}
function logout(){
  setUserCookie({});
  S(".login .text").text("登录");
  J.class("user-center").hide();
  J.class("logout").hide();
  setSpin(J.id("set"));
  u_id=d_uid;
  u_nickname=d_nickname;
  J.select("[jet-name=u_id]").text(d_uid);
  J.show("已退出登录");
}
function initUserInfo(data){
  data.method="getUserInfo";
  jsonp(data,function(res){
    setUserCookie(res[0]);
    J.select("[jet-name=u_id]").text(res[0].id);
  },null,false);
}
function setUserCookie(json){
  J.cookie("nickname",json.nickname,10);
  u_nickname=json.nickname;
  J.cookie("id",json.id,10);
  u_id=json.id;
  J.cookie("password",json.password,10);
  u_password=json.password;
  J.cookie("photo",json.photo,10);
  u_photo=json.photo;
}
function initLogin(){
  if(checkCookie()){
    jsonp({
      nickname:J.cookie("nickname"),
      password:J.cookie("password"),
      method:"login"
    },function(res){
      if(res){
        S(".login .text").text(data.nickname);
        J.class("user-center").show();
        J.class("logout").show();
        initUserInfo(res);
      }
    },null,false);
    return true;
  }else{
    return false;
  }
}
function checkCookie(){
  var nickname=J.cookie("nickname");
  var password=J.cookie("password");
  if(nickname==""||password==""){
    return false;
  }else{
    return true;
  }
}
function showNoLogin(){
  if(!hasShowNoLogin){
    J.confirm("您当前是游客身份，是否登录?",function(){
      openLogin();
    });
    hasShowNoLogin=true;
  }
}
function goRegist(){
  closeLogin();
  openRegist();
}
