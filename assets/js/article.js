
var a_id;
var c_name=["d-show","d-hide","section","code","wechat-img","part","head-right"
  ,"comment","face-box","face-item","normal-text","c-user","c-content","c-user-photo"
  ,"small-text","c-content","block"];
var i_name=["footer","footerLink","title"];

J.ready(function(){
  init();
})
function init(){
  a_id=J.getUrlPara()
  Jet.lang("chinese");
  Jet.setNoteStyle("gray");
  bindComment();
  bindArticle();
  initFaceBox();
  J.class("wechat-public").event({
    "onmouseover":"J.class('wechat-img').fadeIn()",
    "onmouseleave":"J.class('wechat-img').fadeOut()"
  });
  J.id("set").event("onclick",function(){
    setSpin(this);
  })
  J.jetName("a_id").text(a_id);
  J.jetName("u_id").text(u_id);
  addWatch();
}
function addWatch(){
  jsonp({
    method:"addWatch",
    id:a_id
  },function(data){
    if(data){
      J.class("watch-num").text(parseInt(J.class("watch-num").text())+1);
    }
  },null,false);
}
function bindArticle(){
  jsonp({
    method:"getArticle",
    id:a_id
  },function(data){
    data[0].date=toDate(data[0].date);
    J.set("title",data[0]);
    if(data[0].top==1){
      J.id("articleTop").removeClass("display-none");
    }
    if(data[0].star==1){
      J.id("articleStar").removeClass("display-none");
    }
    J.class("prise-num").text(data[0].prise_num);
  },null,false);
}
function initFaceBox(){
  J.class("face-box").each(function(box){
    box.prev().event("onclick",function(){
      if(this.attr("data-show")=="true"){
        this.attr("data-show","false");
        this.next().fadeOut(null,'fast');
      }else{
        this.attr("data-show","true");
        this.next().fadeIn(null,'fast');
      }
    });
    for(var i=1;i<=40;i++){
      box.append(J.new("img.face-item[src=assets/images/rabbit/rabbit ("+i+").gif][rt="+i+"][onclick=addFace(this)]"));
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
      var area=obj.parent().next();
      area.append(J.new("span.span-link[contenteditable=false][onclick=Jet.jump('"+data[0]+"')]").text(data[1])).html(area.html()+"&nbsp;");
    });
  });
  J.class("c-image").event("onclick",develop);
}
function addFace(obj){
  obj.parent(2).next().append(J.new("img.rabbit[src="+obj.attr("src")+"][rt="+obj.attr("rt")+"]"));
  obj.parent().fadeOut(null,'fast').prev().attr("data-show","false");
}

/*var c_data=[
  {
    "name":"theajack",
    "photo":"assets/images/bikeshare.png",
    "time":"2017-09-09 11:11:11",
    "content":"大撒反对仿盛大首发式大苏打撒",
    "reply_num":100,
    "prise_num":100,
    "reply":[{
        "name":"theajack",
        "photo":"assets/images/bikeshare.png",
        "time":"2017-09-09 11:11:11",
        "content":"大撒反对仿盛大首发式大苏打撒"
      },{
        "name":"theajack",
        "photo":"assets/images/bikeshare.png",
        "time":"2017-09-09 11:11:11",
        "content":"大撒反对仿盛大首发式大苏打撒"
      },{
        "name":"theajack",
        "photo":"assets/images/bikeshare.png",
        "time":"2017-09-09 11:11:11",
        "content":"大撒反对仿盛大首发式大苏打撒"
      }
    ]
  }
];*/
var c_data;
function bindComment(isFresh){
  jsonp({
    method:"getAllComment",
    a_id:a_id
  },function(data){
    c_data=data;
    var list=J.id("commentList");
    if(data.length==0){
      list.append(noContent.clone());
    }else{
      data.each(function(item,i){
        if(i<5){
          list.append(bindOneComment(item,i));
        }
      });
      if(data.length>5){
        list.append(J.new("div.link.text-center").html("查看更多评论&gt;"));
      }
      if(isFresh){
        list.css("height","auto")
      }
    }
    refreshObjAdaptive(list);
  },null,false);
}
function bindOneComment(data,index){
  var defaultPhoto="assets/images/defaultPhoto.png";
  var c_item=J.new("div.comment-item.clearfix");
  if(index==0){c_item.addClass("no-border");}
    var c_user=J.new("div.c-user");
      var c_photo=J.new("img.c-user-photo[src="+J.checkArg(data.photo,defaultPhoto)+"]");
      var c_name=J.new("div.c-user-name.small-text").text(data.nickname);
    c_user.append([c_photo,c_name]);
    var c_content=J.new("div.c-content");
      var c_info=J.new("div.c-content-info.small-text").text(J.checkArg(toDatetime(data.time),"没有日期"));
      var c_text=J.new("div.c-content-text.normal-text").html(decodeContent(data.content));
      
      var c_cp=J.new("div.clearfix");
        var c_cp_comment=J.new("div.ii-block[onclick=priseComment(this)]");
          var c_cp_cicon=J.new("span.glyphicon.glyphicon-thumbs-up");
          var c_cp_cnum=J.new("span").text(data.prise_num);
        c_cp_comment.append([c_cp_cicon,c_cp_cnum]);
        var c_cp_prise=J.new("div.ii-block[onclick=openReply(this)][bc_id="+data.id+"]");
          var c_cp_picon=J.new("span.glyphicon.glyphicon-comment");
          var c_cp_pnum=J.new("span").text(data.reply_num);
        c_cp_prise.append([c_cp_picon,c_cp_pnum]);
      c_cp.append([c_cp_comment,c_cp_prise]);
      
    c_content.append([c_info,c_text,c_cp]);
    if(data.reply!=undefined&&data.reply.length>0){
      var c_reply=J.new("div.c-reply");
        var c_rb_title=J.new("div.block-title").text("回复列表");
          var c_rb_switch=J.new("span.reply-switch").text("收起").event("onclick","switchReply(this)");
        c_rb_title.append(c_rb_switch);
      c_reply.append(c_rb_title);
        var c_rb_itemwrapper=J.new("div");
      data.reply.each(function(item,i){
        if(i<5){
          var c_r_item=J.new("div.c-reply-item");
          if(i==0){c_r_item.addClass("no-border");}
            var c_r_title=J.new("div.c-r-title");
              var c_r_photo=J.new("img.c-r-photo[src="+J.checkArg(item.photo,defaultPhoto)+"]");
              var c_r_name=J.new("span.c-r-name.small-text").text(item.nickname);
              var c_r_time=J.new("span.c-r-name.small-text").text(toDatetime(item.time));
            c_r_title.append([c_r_photo,c_r_name,c_r_time]);
            var c_r_content=J.new("div.c-r-content.small-text").html(decodeContent(item.content));
          c_r_item.append([c_r_title,c_r_content]);
          c_rb_itemwrapper.append(c_r_item);
        }
      });
      if(data.reply.length>5)
        c_rb_itemwrapper.append(J.new("div.link.text-center").html("查看更多回复&gt;"));
      if(data.reply.length>0)
        c_reply.append(c_rb_itemwrapper);
    c_content.append(c_reply);
    }
  c_item.append([c_user,c_content]);
  return c_item;
}
function comment(){//评论文章
  var data=J.id("comment").get();
  if(!data.content){
    J.show("评论不可为空","warn");
  }else{
    data.content=codeContent(data.content);
    jsonp(data,function(res){
      if(res){
        J.class("comment-num").text(parseInt(J.class("comment-num").text())+1);
        J.id("comment").select("[jet-name=content]").empty();
        refreshComment();
      }
    },"评论");
  }
}
function refreshComment(){
  var list=J.id("commentList");
  list.css("height",list.hei()+"px").empty().html("<div class='block-title'>评论列表</div>");
  bindComment(true);
}
//jsonp 传数据是标签会出错 还有就是尽量缩短传输内容
function codeContent(content){
  var comment=J.new("div").html(content);
  if(comment.child().length>0){
    comment.child().each(function(item){
      if(item.hasClass("rabbit")){
        item.removeAttr("src").removeAttr("class");
      }else if(item.hasClass("span-link")){
        item.removeAttr("contenteditable").removeAttr("class");;
      }
    });
    return comment.html().replaceAll("<","##").replaceAll("'","%%");
  }else{
    return content;
  }
}
function decodeContent(content){
  content=content.replaceAll("##","<").replaceAll("%%","'");;
  var con=J.new("div").html(content);
  if(con.child().length>0){
    con.child().each(function(item){
      if(item.hasAttr("rt")){
        item.addClass("rabbit").attr("src","assets/images/rabbit/rabbit ("+item.attr("rt")+").gif");
      }else if(item.hasAttr("onclick")){
        item.addClass("span-link");
      }
    })
    return con.html();
  }else{
    return content;
  }
}
function prise(){//点赞文章
  jsonp({
    method:"prise",
    a_id:a_id,
    u_id:2
  },function(data){
    if(data){
      J.class("prise-num").text(parseInt(J.class("prise-num").text())+1);
    }
  },"点赞文章");
}
function openReply(obj){
  var list=J.id("floatComment");
  openCover(list);
  list.select("[jet-name=bc_id]").text(obj.attr("bc_id"));
  list.findClass("reply-nickname").text(obj.parent(2).prev().child(1).text());
}
function reply(){//评论回复
  var data=J.id("floatComment").get();
  if(!data.content){
    J.show("评论不可为空","warn");
  }else{
    data.content=codeContent(data.content);
    jsonp(data,function(res){
      if(res){
        closeCover(J.id("floatComment"));
        J.id("floatComment").select("[jet-name=content]").empty();
        refreshComment();
      }
    },"回复");
  }
}
function priseComment(obj){//点赞回复
  jsonp({
    method:"priseComment",
    bc_id:obj.next().attr("bc_id"),
    u_id:u_id
  },function(data){
    if(data){
      obj.child(1).text(parseInt(obj.child(1).text())+1);
    }
  },"点赞评论");
}
function switchReply(obj){
  obj.text((obj.text()=="收起")?"展开":"收起");
  obj.parent().next().slideToggle();
}
window.onresize=function(){setStyle()};