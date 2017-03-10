
var url="http://localhost:50866/theajack/default.aspx";
function jsonp(json,callback){
  if(json.constructor==String){
    json={method:json};
  }
  J.jsonp({
    url:url,
    data:json,
    dataType:"json",
    success:function(data){
      callback(data.value)
    },
    time:10000,
    timeout:function(err){
      Jet.show(err.message,"error");
    },
    message:"«Î«Û≥¨ ±"
  });
}