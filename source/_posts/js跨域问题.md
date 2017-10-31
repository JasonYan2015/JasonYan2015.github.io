---

title: js跨域问题
tags: ['浏览器', 'js']

---

## 同源策略

### 同源包括三个相同

* 协议（protocol）相同
* 域名（domain/host）相同
* 端口（port）相同

<!-- more -->

举例来说，对于`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下。

* http://www.example.com/dir2/other.html：同源
* http://example.com/dir/other.html：不同源（域名不同）
* http://v2.www.example.com/dir/other.html：不同源（域名不同）
* http://www.example.com:81/dir/other.html：不同源（端口不同）

更多例子：

|URL |说明 |是否允许通信|
|------|------|------------------|
|http://www.a.com/a.js<br>http://www.a.com/b.js|同一域名下| 允许|
|http://www.a.com/lab/a.js<br>http://www.a.com/script/b.js|同一域名下不同文件夹| 允许|
|http://www.a.com:8000/a.js<br>http://www.a.com/b.js|同一域名，不同端口| 不允许|
|http://www.a.com/a.js<br>https://www.a.com/b.js|同一域名，不同协议| 不允许|
|http://www.a.com/a.js<br>http://70.32.92.74/b.js|域名和域名对应ip| 不允许|
|http://www.a.com/a.js<br>http://script.a.com/b.js|主域相同，子域不同| 不允许|
|http://www.a.com/a.js<br>http://a.com/b.js|同一域名，不同二级域名（同上）| 不允许（cookie这种情况下也不允许访问）|
|http://www.cnblogs.com/a.js<br>http://a.com/b.js|不同域名| 不允许|

> 注意
>
> 1. 如果是协议和端口造成的跨域问题“前台”是无能为力的，
> 2. 在跨域问题上，域仅仅是通过“URL的首部”来识别而不会去尝试判断相同的ip地址对应着两个域或两个域是否在同一个ip上。
>
> > “URL的首部”指`window.location.protocol` + `window.location.host`，也可以理解为“Domains, protocols and ports must match”。

### 同源策略的目的

为了保证用户信息的安全，防止恶意的网站窃取数据。

### 受限制的行为

* Cookie、LocalStorage 和 IndexDB 无法读取。
* DOM 无法获得。
* AJAX 请求不能发送。

## cookie跨域

Cookie 是服务器写入浏览器的一小段信息，是储存在用户本地终端上的数据，通常被用来记录访问者的一些信息（尽管这并不安全），只有同源的网页才能共享。

不过这个共享范围比同源稍宽松些。

### 解决办法

如果两个网页一级域名相同，只是二级域名不同，那么浏览器允许通过设置document.domain来共享 Cookie。

例如：

1. 对A,B网页同时设置：`document.domain = 'example.com';`
2. 在A网页中通过脚本设置一个Cookie：`document.cookie = "test1=hello";`
3. B网页就可以读到这个 Cookie：`var allCookie = document.cookie;`

> 注意：这种方法只适用于 Cookie 和 iframe 窗口（下一节会谈到），LocalStorage 和 IndexDB 无法通过这种方法规避同源政策，而要使用下文介绍的PostMessage API。
>
> 另外，服务器也可以在设置Cookie的时候，指定Cookie的所属域名为一级域名，比如为`.example.com`设置`Set-Cookie: key=value; domain=.example.com; path=/`这样的话，二级域名和三级域名不用做任何设置，都可以读取这个Cookie。

## iframe跨域

如果两个网页不同源，就无法拿到对方的DOM。
典型的例子是`iframe`窗口和`window.open`方法打开的窗口，它们与父窗口无法通信。

比如，父窗口运行下面的命令，如果`iframe`窗口不是同源，就会报错。

	document.getElementById("myIFrame").contentWindow.document
	// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.

上面命令中，父窗口想获取子窗口的DOM，因为跨源导致报错。
反之亦然，子窗口获取主窗口的DOM也会报错。

	window.parent.document.body
	// 报错

### 解决办法

#### 如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的`document.domain`属性，就可以规避同源策略来访问DOM。

举例如下

在a.html中

	document.domain = 'a.com';
	var ifr = document.createElement('iframe');
	ifr.src = 'http://script.a.com/b.html';
	ifr.style.display = 'none';
	document.body.appendChild(ifr);
	ifr.onload = function(){
	    var doc = ifr.contentDocument || ifr.contentWindow.document;
	    // 在这里操纵b.html
	    alert(doc.getElementsByTagName("h1")[0].childNodes[0].nodeValue);
	};

b.html中

	document.domain = 'a.com';

#### 对于完全不同源的网站，目前有以下几种方法可以解决跨域窗口的通信问题

1. 片段识别符（fragment identifier）
2. 设置`window.name`
3. 跨文档通信API（Cross-document messaging）

##### 片段标识符


片段标识符（fragment identifier）指的是，URL的#号后面的部分，比如`http://example.com/x.html#fragment的#fragment`。如果只是改变片段标识符，页面不会重新刷新。

父窗口可以把信息，写入子窗口的片段标识符。

	var src = originURL + '#' + data;
	document.getElementById('myIFrame').src = src;

子窗口通过监听`hashchange`事件得到通知。

	window.onhashchange = checkMessage;

	function checkMessage() {
	  var message = window.location.hash;
	  // ...
	}

同样的，子窗口也可以改变父窗口的片段标识符。

	parent.location.href= target + "#" + hash;

##### 设置`window.name`

浏览器窗口有`window.name`属性。这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。

有三个页面：

* a.com/app.html：应用页面。
* a.com/proxy.html：代理文件，一般是一个没有任何内容的html文件，需要和应用页面在同一域下。
* b.com/data.html：应用页面需要获取数据的页面，可称为数据页面。

过程如下：

1. 在应用页面`（a.com/app.html）`中创建一个`iframe`，把其`src`指向数据页面`（b.com/data.html）`。数据页面`（b.com/data.html）`设置window.name时，由于同源，会自动把数据附加到这个`iframe`的`window.name`上，代码如下：
		<script type="text/javascript">
	    		window.name = 'I was there!';    //这里是要传输的数据，大小一般为2M，IE和firefox下可以大至32M左右。
												 //数据格式可以自定义，如json、字符串
		</script>
2. 在应用页面`（a.com/app.html）`中监听`iframe`的`onload`事件，在此事件中设置这个`iframe`的`src`指向本地域的代理文件（代理文件和应用页面在同一域下，所以可以相互通信）。app.html部分代码如下：
		<script type="text/javascript">
		    var state = 0, 
		    iframe = document.createElement('iframe'),
		    loadfn = function() {
		        if (state === 1) {
		            var data = iframe.contentWindow.name;    // 读取数据
		            alert(data);    //弹出'I was there!'
		        } else if (state === 0) {
		            state = 1;
		            iframe.contentWindow.location = "http://a.com/proxy.html";    // 设置的代理文件，此时由于iframe的loaction改变，又一次触发load事件
		        }  
		    };
		    iframe.src = 'http://b.com/data.html';
		    if (iframe.attachEvent) {
		        iframe.attachEvent('onload', loadfn);
		    } else {
		        iframe.onload  = loadfn;
		    }
		    document.body.appendChild(iframe);
		</script>
3. 获取数据以后销毁这个`iframe`，释放内存；这也保证了安全（不被其他域frame js访问）。
		<script type="text/javascript">
		    iframe.contentWindow.document.write('');
		    iframe.contentWindow.close();
		    document.body.removeChild(iframe);
		</script>

总结起来即：iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

* 优点: window.name容量很大，可以放置非常长的字符串；
* 缺点: 必须监听子窗口window.name属性的变化，影响网页性能。

##### 跨文档通信API--postMessage()

HTML5新增一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。并且支持基于web的实时消息传递。

	otherWindow.postMessage(message, targetOrigin);

* `otherWindow`: 对接收信息页面的window的引用。可以是页面中`iframe`的`contentWindow`属性；`window.open`的返回值；通过`name`或下标从`window.frames`取到的值。
* `message`: 所要发送的数据，string类型。
* `targetOrigin`: 用于限制otherWindow，即"协议 + 域名 + 端口"，`*`表示不限制域名，向所有窗口发送

举例来说，父窗口`http://aaa.com`与子窗口`http://bbb.com`互发消息

父->子

	var popup = window.open('http://bbb.com', 'title');
	popup.postMessage('Hello World!', 'http://bbb.com');

子->父

	window.opener.postMessage('Nice to see you', 'http://aaa.com');

接受消息：message事件

	window.addEventListener('message', function(e) {
	  console.log(e.data);
	},false);

`message`事件的事件对象`event`，提供以下三个属性。

* event.source：发送消息的窗口
* event.origin: 消息发向的网址
* event.data: 消息内容

下面的例子是，子窗口通过`event.source`属性引用父窗口，然后发送消息。

	window.addEventListener('message', receiveMessage);
	function receiveMessage(event) {
	  event.source.postMessage('Nice to see you!', '*');
	}

`event.origin`属性可以过滤不是发给本窗口的消息。

	window.addEventListener('message', receiveMessage);
	function receiveMessage(event) {
	  if (event.origin !== 'http://aaa.com') return;
	  if (event.data === 'Hello World') {
	      event.source.postMessage('Hello', event.origin);
	  } else {
	    console.log(event.data);
	  }
	}


## Ajax跨域

同源政策规定，AJAX请求只能发给同源的网址。

除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

* JSONP
* WebSocket
* CORS

### JSONP

JSONP是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

举个例子

	function addScriptTag(src) {
	  var script = document.createElement('script');
	  script.setAttribute("type","text/javascript");
	  script.src = src;
	  document.body.appendChild(script);
	}
	
	window.onload = function () {
	  addScriptTag('http://example.com/ip?callback=foo');
	}
	
	function foo(data) {
	  console.log('Your public IP address is: ' + data.ip);
	};

上面代码通过动态添加`<script>`元素，向服务器`example.com`发出请求。

> 注意：该请求的查询字符串有一个`callback`参数（在服务器中须对其进行相关声明和定义），用来指定回调函数的名字，这对于JSONP是必需的。假设目标返回的数据是`["customername1","customername2"]`那么真正返回到客户端的数据为`foo(["customername1","customername2"])`

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了`foo`函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。

### WebSocket跨域

WebSocket是一种通信协议，使用`ws://`（非加密）和`wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

下面是一个例子，浏览器发出的WebSocket请求的头信息

	GET /chat HTTP/1.1
	Host: server.example.com
	Upgrade: websocket
	Connection: Upgrade
	Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
	Sec-WebSocket-Protocol: chat, superchat
	Sec-WebSocket-Version: 13
	Origin: http://example.com

上面代码中，有一个字段是Origin，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了`Origin`这个字段，所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

	HTTP/1.1 101 Switching Protocols
	Upgrade: websocket
	Connection: Upgrade
	Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
	Sec-WebSocket-Protocol: chat

### CORS跨域

跨源资源分享（Cross-Origin Resource Sharing）

它是W3C标准，是跨源AJAX请求的根本解决方法。

相比JSONP只能发GET请求，CORS允许任何类型的请求。

[CORS跨域详细](http://www.ruanyifeng.com/blog/2016/04/cors.html)


****

参考链接

* [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
* [JavaScript跨域总结与解决办法](http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html)

