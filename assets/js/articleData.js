/*
<jh>description</jh>
<jh>keywords</jh>
<div class="section">
由于同源策略，一般来说位于a.com的网页无法与不是a.com的服务器沟通，如果有这样的需求，就必须实现跨域，jsnop就是跨域数据访问的方式之一。
</div>
<div class="section">
jsnop是一种依靠开发人员的聪明才智创造出的一种非官方跨域数据交互协议，网上关于jsnop原理与优缺点的博客很多很多，我也就不再一一赘述，其实记住两点就好：
</div>
<div class="section"><span class="stress-bold">1.它是利用script标签实现跨域；</span></div>
<div class="section"><span class="stress-bold">2.它只支持get请求。</span></div>

<div class="section">
我有跨域这个需求是在写github pages的时候，想在上面访问自己搭建的服务器上的数据，ajax在这个时候就无能为力了，于是本人学习了一下jsonp，并把它封装到本人自娱自乐的<span class="link" onclick="J.open('http://www.theajack.site/jetterjs/')">jetter.js</span>类库中，该博客地址的数据访问用的就是这种技术。
</div>
<div class="section">
废话说的有点多了，接下来本人不才，尝试把我学习jsonp的过程一步一步还原一下。
</div>
<div class="title1">1.模拟跨域</div>
<div class="section">服务器端我使用的ASP.net,我用的是visual studio 2010(java也是同理，本人没有实践)，客户端就随便新建一个html文件就可以啦。以下是代码和图示：</div>
<div class="title2">1.服务器搭建</div>
<div class="image"><img src="assets/images/jsonp/1.png"/></div>
<div class="tip">1.打开visual studio，依次点击文件>新建>网站</div>
<div class="image"><img src="assets/images/jsonp/2.png"/></div>
<div class="tip">2.选择ASP.NET空网站，点击确定</div>
<div class="image"><img src="assets/images/jsonp/3.png"/></div>
<div class="tip">3.右击生成的网站，点击添加新项</div>
<div class="image"><img src="assets/images/jsonp/4.png"/></div>
<div class="tip">4.选择JScript文件，点击添加</div>
<div class="image"><img src="assets/images/jsonp/5.png"/></div>
<div class="tip">5.打开JScript.js文件，写入如下代码，保存</div>
<div class="code">
  <pre>
var user = {
    nickname="theajack",
    password="123456"
}
  </pre>
</div>
<div class="section">都做好保存之后，按F5启动网站，启动完成之后就不用管了，弹出来的页面也不要关闭。现在就相当于有一个localhost的服务器上面有一个user的数据，不过暂时先储存在js文件里，这么做是为了更深刻理解利用js跨域。接下来模拟另一台服务器的客户端。</div>
<div class="title2">2.新建客户端</div>
<div class="section">客户端极其简单，就是一个html文件：</div>
<div class="image"><img src="assets/images/jsonp/6.png"/></div>
<div class="tip">1.右击桌面，新建文本文档</div>
<div class="image"><img src="assets/images/jsonp/7.png"/></div>
<div class="tip">2.右击桌面，重命名为jsonp.html并保存</div>
<div class="image"><img src="assets/images/jsonp/8.png"/></div>
<div class="tip">3.打开刚启动的ASP.NET网站，复制地址栏的链接</div>
<div class="image"><img src="assets/images/jsonp/9.png"/></div>
<div class="tip">4.使用代码编辑工具或记事本打开，贴入如下代码，把下划线部分代码替换成你自己的链接，也就是复制好的链接+"JScript.js"</div>
<div class="code">
  <pre contenteditable="true" readonly="readonly" >
&lt;html&gt;
&lt;head&gt;&lt;head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;script src="<span class="link">http://localhost:37904/WebSite7/JScript.js</span>"&gt;&lt;/script&gt;
&lt;script&gt;
&#9;alert(user.nickname+" "+user.password);
&lt;/script&gt;
&lt;/html&gt;
  </pre>
</div>
<div class="section">
贴好之后不要忘记保存哦，然后就大功告成了！哈哈！让我们回到桌面，双击jsonp.html文件，或用浏览器打开它，结果如下:
</div>
<div class="image"><img src="assets/images/jsonp/10.png"/></div>
<div class="section">
我们成功的把服务器端的一个数据访问到了，由于html文件是在文件系统里打开的，而不是localhost，这就是跨域了，原理是不是一目了然？就是通过script标签来访
问服务器上的数据，当然这么简单的跨域我们是拒绝的，这只是去使用一下服务器上的js文件里的变量而已，我们需要让服务器通过我们的请求，主动给我们发送我们需要的数据，接下来上步骤：
</div>

<div class="title1">2.服务器回调客户端</div>
<div class="title2">1.服务器改动</div>
<div class="image"><img src="assets/images/jsonp/11.png"/></div>
<div class="tip">把JSript代码改成如下，只添加一行就好，然后保存F5启动服务器</div>
<div class="code">
  <pre>
var user = {
    nickname="theajack",
    password="123456"
}
callback(user);
  </pre>
</div>
<div class="title2">2.客户端改动</div>
<div class="image"><img src="assets/images/jsonp/12.png"/></div>
<div class="tip">把桌面的jsonp.html代码改成如下，同样，把下划线部分代码替换成你自己的链接，然后保存。还有就是两个script标签顺序不能交换，因为是服务器回调客户端的js，所以必须客户端在前面</div>
<div class="code">
  <pre>
&lt;html&gt;
&lt;head&gt;&lt;head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;script&gt;
function callback(user){
  alert(user.nickname+" "+user.password);
}
&lt;/script&gt;
&lt;script src="<span class="link">http://localhost:37904/WebSite7/JScript.js</span>"&gt;&lt;/script&gt;
&lt;/html&gt;
  </pre>
</div>

<div class="section">
用浏览器打开jsonp.html,结果如下：
</div>
<div class="image"><img src="assets/images/jsonp/10.png"/></div>
<div class="section">
其实结果和第一次结果一样，但是它们的原理可是不一样的，第一次是由客户端去访问服务器端的js文件，也就是说我要用什么变量或者方法，都得在服务器端写好，而第二次是由script标签去访问服务器，然后让服务器以回调函数参数的形式返回我们需要的数据，如果我们能以get请求的形式传个参数给服务器，那服务器不就可以根据参数去数据库取数据，并动态返回我们需要的数据吗？
</div>
<div class="section">
至于客户端，我们在每次需要请求的时候利用动态生成script标签的方式去向服务器发送请求。你或许会说，为什么不用同一个script标签，修改一下src属性就行？很不幸的是，script标签只在第一次设置src属性时才能够请求服务器，所以必须动态生成，完成任务之后再删除掉。那么接下来我们要用GET请求实现传参然后由服务器以回调函数的参数将结果传给客户端，不多废话了，直接上步骤：
</div>
<div class="title1">3.GET请求</div>
<div class="title2">1.服务器改动</div>
<div class="image"><img src="assets/images/jsonp/13.png"/></div>
<div class="tip">1.首先关闭调试</div>
<div class="image"><img src="assets/images/jsonp/14.png"/></div>
<div class="tip">2.是的，我们现在不需要JScript文件了</div>
<div class="image"><img src="assets/images/jsonp/15.png"/></div>
<div class="tip">3.旧的不去新的不来，我们右击网站目录，选择添加项目</div>
<div class="image"><img src="assets/images/jsonp/16.png"/></div>
<div class="tip">4.选择web窗体，点击添加，名字默认的就行</div>
<div class="image"><img src="assets/images/jsonp/17.png"/></div>
<div class="tip">5.打开新建的Default.aspx下面Default.aspx.cs文件，把代码替换成如下,保存然后F5启动服务器，待浏览器打开之后复制链接地址备用</div>
<div class="code">
  <pre>
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string arg = Request["data"];
        string result = handleData(arg);
        string call = "callback(" + result + ")";
        Response.Write(call);
        Response.End();
    }
    //模拟服务器处理参数并返回数据，可以在方法里写数据库操作
    private string handleData(string arg)
    {
        return "'From server:" + arg + " success!'";
    }
}
  </pre>
</div>
<div class="title2">2.客户端改动</div>
<div class="image"><img src="assets/images/jsonp/18.png"/></div>
<div class="tip">1.打开jsonp.html,将代码替换成如下，同样将划线部分链接替换成上一步里你自己服务器的链接就行</div>
<div class="code">
  <pre>
&lt;html&gt;
&lt;head&gt;&lt;head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;script&gt;
  var script=document.createElement("script");
  var data="My jsonp";//模拟参数
  var get="?data="+data;//包装到get请求
  script.setAttribute("src","<span class="link">http://localhost:37904/WebSite7/Default.aspx</span>"+get);
  document.getElementsByTagName("head")[0].appendChild(script);
  
  function callback(result){//供服务器回调
    alert(result);
  }
&lt;/script&gt;
&lt;/html&gt;
  </pre>
</div>
<div class="image"><img src="assets/images/jsonp/19.png"/></div>
<div class="tip">2.保存好之后，用浏览器打开jsonp.html,结果如上图</div>
<div class="section">
服务器接收到了我们的参数‘My jsonp’，并对它做了一些处理，通过回调函数参数的形式把数据返回给了我们。这其实是在模拟服务器里对数据库的操作，我们可以将一些复杂的参数以json字符串的形式
通过get请求发送到服务器，然后由服务器通过不同的参数执行不同的方法，返回我们需要的数据，这个就很灵活了。
</div>
<div class="section">
教程到这里也就差不多结束了。最后在对客户端的jsonp方法进行一下封装，以方便复用，
并增加超时提示和删除script标签，上步骤：
</div>
<div class="title1">4.简单封装</div>
<div class="title2">1.修改服务器</div>
<div class="image"><img src="assets/images/jsonp/20.png"/></div>
<div class="tip">将Default.aspx.cs文件代码替换成如下：</div>
<div class="code">
  <pre>
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string method = Request["method"];
        string nickname = Request["nickname"];
        string callback = Request["callback"];
        string result = handleData(method, nickname);
        string call = callback+"(" + result + ")";
        Response.Write(call);
        Response.End();
    }
    //模拟服务器处理参数并返回数据，可以在方法里写数据库操作
    private string handleData(string arg1,string arg2)
    {
        if (arg1 == "getUserInfo")
            return "{nickname:'" + arg2 + "',password:'" + arg2 + "123" + "'}";
        else
            return "";
    }
}
  </pre>
</div>

<div class="title2">2.修改客户端</div>
<div class="image"><img src="assets/images/jsonp/21.png"/></div>
<div class="tip">1.将jsonp.html文件代码替换成如下:</div>
<div class="code">
  <pre>
&lt;html&gt;&lt;head&gt;&lt;head&gt;&lt;body&gt;&lt;/body&gt;
&lt;script src="http://www.theajack.site/blog/assets/js/jetter.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  aa({
    url:"http://localhost:37904/WebSite7/Default.aspx",
    data:{
      method:"getUserInfo",
      nickname:"theajack"
    },
    success:function(data){
      alert(data.nickname+" "+data.password);
    }
  });
  function aa(options) {
    if (!options.url) {
      throw new Error("Parameter error");
    }else{
      var callbackName = ('_jsonp' + Math.random()).replace(".", "").substring(0, 15);
      var head = J.tag("head");
      options.data[J.checkArg(options.callback, "callback")] = callbackName;
      var script = J.new('script');
      head.append(script);
      window[callbackName] = function(a) {
        head.removeChild(script);
        clearTimeout(script.timer);
        window[callbackName] = null;
        if(a.constructor==String){
          a=JSON.parse(a);
        }
        options.success && options.success(a);
      };
      if (options.dataType != undefined && options.dataType.toUpperCase() == "JSON") {
        script.attr("src", options.url + '?json=' + encodeURIComponent(JSON.stringify(options.data)))
      } else {
        var temp = [];
        for (var item in options.data) 
          temp.push(encodeURIComponent(item) + "=" + encodeURIComponent(options.data[item]))
        script.attr("src", options.url + '?' + temp.join("&"))
      }
      options.time = J.checkArg(options.time, 5000);
      script.timer = setTimeout(function() {
        window[callbackName] = null;
        head.removeChild(script);
        options.timeout && options.timeout({
          message:( (!options.message)?"timeout":options.message)
        })
      }, options.time)
    }
  }
&lt;/script&gt;&lt;/html&gt;
  </pre>
</div>
<div class="section">这里引了一下我写的<span class="link" onclick="J.open('http://www.theajack.site/jetterjs/')">jetter.js</span>，以方便dom元素的操作，类似与jQuery,该类库已经对jsonp进行了封装</div>
<div class="image"><img src="assets/images/jsonp/22.png"/></div>
<div class="tip">2.将jsonp.html用浏览器打开，结果如上图，服务器接收到我们的参数之后又将nickname加上123作为密码传给了客户端。以模拟去数据库查询的操作，而method参数就可以作为服务器执行查询的指示。</div>
<div class="title1">5.结束</div>
<div class="section">第一次尝试写博客，写了好几个小时。古人云：温故而知新，我确实在写的过程中也更加深化了对jsonp的理解，希望这篇文章能够对阅读者有所启发。</div>
<div class="section">另，由于我是个新手，本文如有不正或疏漏之处，欢迎指正批评。</div>
<div class="section">本文乃原创，如有转载，请标明出处，谢谢！</div>
*/