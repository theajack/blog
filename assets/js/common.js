var data=[
	{
		name:"article",
		title:"This is a title from data",
		date:"2017-03-03 10:10",
		watch:200,
		comment:200,
		prise:200,
		top:0,
		article:0,
	},{
		name:"article",
		title:"This is a title from data",
		date:"2017-03-02 10:10",
		watch:200,
		comment:200,
		prise:200,
		top:1,
		star:0,
	},{
		name:"article",
		title:"This is a title from data",
		date:"2017-03-01 10:10",
		watch:200,
		comment:200,
		prise:200,
		top:0,
		star:1,
	},{
		name:"article",
		title:"This is a title from data",
		date:"2017-02-28 10:10",
		watch:200,
		comment:200,
		prise:200,
		top:1,
		star:1,
	},{
		name:"article",
		title:"This is a title from data",
		date:"2017-02-27 10:10",
		watch:200,
		comment:200,
		prise:200,
		top:0,
		star:0,
	},{
		name:"article",
		title:"This is a title from data",
		date:"2017-02-26 10:10",
		watch:200,
		comment:200,
		prise:200,
		top:0,
		star:0,
	}
];
function init(){
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
	data.each(function(item){
		bindOneData(item);
	});
	if(J.id("top").child().length>0)
		J.id("top").child(0).addClass("no-border");
	if(data.length>0)
		J.id("list").child(0).addClass("no-border");
}
function bindOneData(item){
	var aitem=J.new("div.a-item[onclick=Jet.jump('"+item.name+".html')]");
		var title=J.new("div.i-title").html(item.title);
		var info=J.new("div.i-info.clearfix");
		info.append([
			geneInfo(item.date,"ii-block","calendar"),
			geneInfo(item.watch,"ii-block","eye-open"),
			geneInfo(item.comment,"ii-block","comment"),
			geneInfo(item.prise,"ii-block","thumbs-up")
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