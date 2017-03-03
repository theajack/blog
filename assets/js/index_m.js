
J.ready(function(){
  if(checkWidth()){
    init();
  }
})
function checkWidth(){
  if(J.width()>=1000){
    Jet.jump("index.html");
    return false;
  }
  return true;
}
function setSpin(obj){
  if(obj.data("spin")!=true){
    obj.spin(null,2);
    obj.data("spin",true);
    J.id("menuWrapper").fadeIn(null,"fast");
  }else{
    //obj.stopSpin(); //stopSpin 移动端出问题
    obj.data("spin",false);
    J.id("menuWrapper").fadeOut(null,"fast");
  }
}
window.onresize=checkWidth;