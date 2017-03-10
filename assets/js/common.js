
var url="http://localhost:50866/theajack/default.aspx";
function jsonp(json,callback,text,needShow){
  if(needShow!=false)
    J.show("正在请求...","info");
  if(json.constructor==String){
    json={method:json};
  }
  J.jsonp({
    url:url,
    data:json,
    dataType:"json",
    success:function(data){
      if(callback!=undefined){
        switch(data.value){
          case "true":
            if(callback.constructor==Function){
              callback(true);
              if(text!=undefined){
                Jet.show(text+"成功！")
              }
            }else{
              Jet.show(callback+"成功！")
            };break;
          case "false":
            if(callback.constructor==Function){
              callback(false);
              if(text!=undefined){
                Jet.show(text+"失败！","error")
              }
            }else{
              Jet.show(callback+"失败！","error")
            };break;
          case "error":J.show("服务器运行异常","error");break;
          default:callback(data.value);break;
        }
      }
    },
    time:20000,
    timeout:function(err){
      Jet.show(err.message,"error");
    },
    message:"请求超时"
  });
}
function lockScroll(){
  J.body().event({
    'ontouchmove':function (event) {
      event.preventDefault();
    },
    'onmousewheel':function (event) {
      event.preventDefault();
    }
  })
}
function unlockScroll(){
  J.body().event({
    'ontouchmove':function(){},
    'onmousewheel':function(){}
  })
}