J.ready(function(){
    init();
    initFooterPos();
})
function initFooterPos(){
  if(J.width()<1000){
    Jet.jump("index_m.html");
  }else{
    if(J.height()-J.id("header").hei()-J.id("footer").hei()>J.id("content").hei()){
      J.id("footer").addClass("bottom");
    }else{
      J.id("footer").removeClass("bottom");
    }
  }
}
function setSpin(obj){
  if(obj.data("spin")!=true){
    obj.spin();
    obj.data("spin",true);
    J.id("menuWrapper").fadeIn(null,"fast");
  }else{
    obj.stopSpin();
    obj.data("spin",false);
    J.id("menuWrapper").fadeOut(null,"fast");
  }
}
window.onresize=initFooterPos;