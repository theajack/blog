



var c_name=["d-show","d-hide","head-left","head-right",
  "block","wechat-img","search-input","part","i-title"];
var i_name=["logo","menuWrapper","setWrapper","main",
  "footer","footerLink"];
J.ready(function(){
  init();
  initClass();
})
function init(){
  resizeCall(setFooterPos);
  J.lang("chinese");
  J.setNoteStyle("gray");
  bindData();
  J.class("wechat-public").event({
    "onmouseover":"J.class('wechat-img').fadeIn()",
    "onmouseleave":"J.class('wechat-img').fadeOut()"
  });
  J.id("set").event("onclick",function(){
    setSpin(this);
  })
}
function bindData(){
  jsonp("getAllArticle",function(data){
    data.each(function(item){
      bindOneData(item);
    });
    if(J.id("top").child().length>1){
      J.id("top").child(1).addClass("no-border");
    }else{
      J.id("top").append(noContent.clone());
    }
    if(data.length>0){
      J.id("list").child(1).addClass("no-border");}
    else{
      J.id("list").append(noContent.clone());
    }
    refreshObjAdaptive(J.id("list"));
  },null,false);
	
}
function bindOneData(item){
	var aitem=J.new("div.a-item");
		var title=J.new("div.i-title[onclick=J.jump('article.html?id="+item.id+"')]").html(item.title);
		var info=J.new("div.i-info.clearfix");
		info.append([
			geneInfo(toDate(item.date),"ii-block","calendar"),
			geneInfo(item.author,"ii-block","user").addClass("d-hide mobile"),
			geneInfo(item.watch_num,"ii-block","eye-open"),
			geneInfo(item.comment_num,"ii-block","comment"),
			geneInfo(item.prise_num,"ii-block","thumbs-up")
		]);
		if(item.top==1){info.append(geneInfo("置顶","ii-block darker","eject"))};
		if(item.star==1){info.append(geneInfo("加精","ii-block darker","star"))};
	aitem.append([title,info]);
	if(item.top==1||item.star==1){
		J.id("top").append(aitem.clone());
	}
  J.id("list").append(aitem);
}
function geneInfo(content,classname,icon){
	var info=J.new("div."+classname);
		var icon=J.new("span.glyphicon.glyphicon-"+icon);
		var text=J.new("span").text(content);
	info.append([icon,text]);
	return info;
}
function setFooterPos(){
  if(J.height()-J.id("header").hei()-J.id("footer").hei()>J.id("content").hei()){
    J.id("footer").addClass("bottom");
  }else{
    J.id("footer").removeClass("bottom");
  }
}