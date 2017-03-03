
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
window.onresize=checkWidth;