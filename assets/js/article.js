var isMobile;
var c_name=["d-show","d-hide","section","code","wechat-img","part","head-right","comment","face-box","face-item"];
var i_name=["footer","footerLink","title"];
var c_data=[
  {
    "name":"theajack",
    "photo":"assets/images/bikeshare.png",
    "date":"2017-09-09",
    "content":"大撒反对仿盛大首发式大苏打撒",
  },{
    "name":"theajack",
    "photo":"assets/images/bikeshare.png",
    "time":"2017-09-09",
    "content":"大撒反对仿盛大首发式大苏打撒",
  },{
    "name":"theajack",
    "photo":"assets/images/bikeshare.png",
    "time":"2017-09-09",
    "content":"大撒反对仿盛大首发式大苏打撒",
  },{
    "name":"theajack",
    "photo":"assets/images/bikeshare.png",
    "time":"2017-09-09",
    "content":"大撒反对仿盛大首发式大苏打撒aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },{
    "name":"theajack",
    "photo":"assets/images/bikeshare.png",
    "time":"2017-09-09",
    "content":"大撒反对仿盛大首发式大苏打撒aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  }
];
J.ready(function(){
  init();
  initClass();
  setStyle();
  bindComment();
})
function bindComment(){
  
}
function init(){
  Jet.lang("chinese");
  initFaceBox();
  J.class("wechat-public").event({
    "onmouseover":"J.class('wechat-img').fadeIn()",
    "onmouseleave":"J.class('wechat-img').fadeOut()"
  });
  J.id("set").event("onclick",function(){
    setSpin(this);
  })
}
function initFaceBox(){
  var box=J.class("face-box");
  box.prev().event("onclick",function(){
    if(this.attr("data-show")=="true"){
      this.attr("data-show","false");
      this.next().fadeOut(null,'fast');
    }else{
      this.attr("data-show","true");
      this.next().fadeIn(null,'fast');
    }
  });
  J.class("c-link").event("onclick",function(){
    var obj=this;
    Jet.input({
      title:"添加链接",
      text:["链接地址","链接文字"],
      default:["http://",null],
      valid:["url",null],
      placeholder:["请填写正确的url地址","默认值为链接地址"],
  　},function(data){
      if(data[1]==""){
        data[1]=data[0];
      }
      J.id(obj.attr("data-aim")).append(J.new("span.span-link[contenteditable=false][onclick=Jet.jump('"+data[0]+"')]").text(data[1]));
    });
  });
  for(var i=1;i<=40;i++){
    box.append(J.new("img.face-item[src=assets/images/rabbit/rabbit ("+i+").gif][onclick=addFace(this)]"));
  }
}
function addFace(obj){
  var src=obj.attr("src");
  J.id(obj.parent().attr("data-aim")).append(J.new("img.rabbit[src="+src+"]"));
  obj.parent().fadeOut(null,'fast').prev().attr("data-show","false");
}
function setSpin(obj){
  if(obj.data("spin")!=true){
    if(!isMobile){
      obj.spin();
    }
    obj.data("spin",true);
    J.id("menuWrapper").fadeIn(null,"fast");
  }else{
    if(!isMobile){
      obj.stopSpin();
    }
    obj.data("spin",false);
    J.id("menuWrapper").fadeOut(null,"fast");
  }
}
function setStyle(){
  if(J.width()<960){
    if(!isMobile||isMobile==null){
      isMobile=true;
      J.class("mobile").addClass("change");
    }
  }else{
    if(isMobile||isMobile==null){
      isMobile=false;
      J.class("mobile").removeClass("change");
    }
  }
}
function initClass(){
  c_name.each(function(item){
    J.class(item).addClass("mobile");
  });
  i_name.each(function(item){
    J.id(item).addClass("mobile");
  });
}
window.onresize=setStyle;