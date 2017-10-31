---

title: HTML5新特性
tags: [html]

---

### 目录

* 用于绘画的 canvas 元素
* 用于媒介回放的 video 和 audio 元素
* 对本地离线存储的更好的支持
* 新的特殊内容元素，比如 article、footer、header、nav、section
* 新的表单控件，比如 calendar、date、time、email、url、search

<!-- more -->

## video标签

	<video width="320" height="240" controls="controls" autoplay="autoplay" loop="loop">
	  	<source src="movie.ogg" type="video/ogg">
	  	<source src="movie.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>

* width：定义播放器宽度
* height： 设置视频播放器的高度
* controls：如果出现该属性，则向用户显示控件，播放按钮，音量，进度条，下载按钮等
* autoplay： 如果出现该属性，则视频在就绪后马上播放。
* loop：如果出现该属性，则当媒介文件完成播放后再次开始播放
* preload：如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性
* src：要播放的视频的 URL，也可以像上例中写在source标签里

video 元素允许多个 source 元素。source 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式。

`<video>` 与`</video>` 之间插入的内容是供不支持 video 元素的浏览器显示的：

#### 支持格式

|格式	|IE		|Firefox	|Opera	|Chrome|Safari|
|-----------|-----------|----------|-----------|----------|--------|
|Ogg	|No		|3.5+	|10.5+	|5.0+	|No	    |
|MPEG 4	|9.0+	|No		|No		|5.0+	|3.0+   |
|WebM	|No		|4.0+	|10.6+	|6.0+	|No      |

* Ogg = 带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件
* MPEG4 = 带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件
* WebM = 带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件

#### 方法，属性和事件

|方法			|属性			|事件				|
|---------------|---------------|-------------------|
|play()			|currentSrc		|play				|
|pause()		|currentTime	|pause				|
|load()			|videoWidth		|progress			|
|canPlayType	|videoHeight	|error				|
| 				|duration		|timeupdate			|
|				|ended			|ended				|
|				|error			|abort				|
|				|paused			|empty				|
|				|muted			|emptied			|
|				|seeking		|waiting			|
|				|volume			|loadedmetadata		|
|				|height			| 					|
|				|width	 		|					||

> 在所有属性中，只有 videoWidth 和 videoHeight 属性是立即可用的。在视频的元数据已加载后，其他属性才可用。

## audio标签

	<audio src="song.ogg" controls="controls">
		Your browser does not support the audio tag.
	</audio>

* autoplay：如果出现该属性，则音频在就绪后马上播放。
* controls：如果出现该属性，则向用户显示控件，比如播放按钮。
* loop：如果出现该属性，则每当音频结束时重新开始播放。
* preload：如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
* src：要播放的音频的 URL。

audio 元素允许多个 source 元素。source 元素可以链接不同的音频文件。浏览器将使用第一个可识别的格式。

`<audio>` 与 `</audio>` 之间插入的内容是供不支持 audio 元素的浏览器显示的。


#### 支持格式

|格式	|IE9		|Firefox3.5	|Opera10.5	|Chrome3.0|Safari3.0|
|-----------|----------|-----------------|-----------------|---------------|-----------|
|Ogg Vorbis	|	|YES			|YES		 	|YES	         		|	        |
|MP3	|YES		|			|			|YES			|YES  	|
|Wav	|		|YES			|YES			|			|YES      	|

## canvas

	<canvas id="myCanvas"></canvas>

	<script type="text/javascript">
		var canvas=document.getElementById('myCanvas');
		var ctx=canvas.getContext('2d');
		ctx.fillStyle='#FF0000';
		ctx.fillRect(0,0,80,100);
	</script>

##### 浏览器支持

Internet Explorer 8 以及更早的版本不支持 `<canvas> `标签。其他浏览器不识别但是会使用衬线体来直接显示其内所有内容。

##### 标签定义和用法

`<canvas>` 标签定义图形，比如图表和其他图像。但是它只提供图形容器，必须使用javascript来绘制图形。

|属性	|值	|描述|
|-------|---|----|
|height	|pixels	|设置 canvas 的高度。|
|width	|pixels	|设置 canvas 的宽度。|

#### 使用javascript绘制

[W3School参考链接](http://www.w3school.com.cn/tags/html_ref_canvas.asp)

##### 颜色、样式和阴影

|属性	|描述|
|-------|---|
|fillStyle	|设置或返回用于填充绘画的颜色、渐变或模式|
|strokeStyle	|设置或返回用于笔触的颜色、渐变或模式|
|shadowColor	|设置或返回用于阴影的颜色|
|shadowBlur	|设置或返回用于阴影的模糊级别|
|shadowOffsetX	|设置或返回阴影距形状的水平距离|
|shadowOffsetY	|设置或返回阴影距形状的垂直距离|

|方法	|描述|
|-------|---|
|createLinearGradient()	|创建线性渐变（用在画布内容上）|
|createPattern()	|在指定的方向上重复指定的元素|
|createRadialGradient()	|创建放射状/环形的渐变（用在画布内容上）|
|addColorStop()	|规定渐变对象中的颜色和停止位置|

##### 线条样式

|属性	|描述|
|-------|---|
|lineCap	|设置或返回线条的结束端点样式|
|lineJoin	|设置或返回两条线相交时，所创建的拐角类型|
|lineWidth	|设置或返回当前的线条宽度|
|miterLimit	|设置或返回最大斜接长度|

##### 矩形

|方法	|描述|
|-------|---|
|rect()	|创建矩形|
|fillRect()	|绘制“被填充”的矩形|
|strokeRect()	|绘制矩形（无填充）|
|clearRect()	|在给定的矩形内清除指定的像素|

##### 路径

|方法	|描述|
|-------|---|
|fill()	|填充当前绘图（路径）|
|stroke()	|绘制已定义的路径|
|beginPath()	|起始一条路径，或重置当前路径|
|moveTo()	|把路径移动到画布中的指定点，不创建线条|
|closePath()	|创建从当前点回到起始点的路径|
|lineTo()	|添加一个新点，然后在画布中创建从该点到最后指定点的线条|
|clip()	|从原始画布剪切任意形状和尺寸的区域|
|quadraticCurveTo()	|创建二次贝塞尔曲线|
|bezierCurveTo()	|创建三次方贝塞尔曲线|
|arc()	|创建弧/曲线（用于创建圆形或部分圆）|
|arcTo()	|创建两切线之间的弧/曲线|
|isPointInPath()	|如果指定的点位于当前路径中，则返回 true，否则返回 false|

##### 转换

|方法	|描述|
|-------|---|
|scale()	|缩放当前绘图至更大或更小|
|rotate()	|旋转当前绘图|
|translate()	|重新映射画布上的 (0,0) 位置|
|transform()	|替换绘图的当前转换矩阵|
|setTransform()	|将当前转换重置为单位矩阵。然后运行 transform()|

##### 文本

|属性	|描述|
|-------|---|
|font	|设置或返回文本内容的当前字体属性|
|textAlign	|设置或返回文本内容的当前对齐方式|
|textBaseline	|设置或返回在绘制文本时使用的当前文本基线|

|方法	|描述|
|-------|---|
|fillText()	|在画布上绘制“被填充的”文本|
|strokeText()	|在画布上绘制文本（无填充）|
|measureText()	|返回包含指定文本宽度的对象|


##### 图像绘制

|方法	|描述|
|-------|---|
|drawImage()	|向画布上绘制图像、画布或视频|

##### 像素操作

|属性	|描述|
|-------|---|
|width	|返回 ImageData 对象的宽度|
|height	|返回 ImageData 对象的高度|
|data	|返回一个对象，其包含指定的 ImageData 对象的图像数据|

|方法	|描述|
|-------|---|
|createImageData()	|创建新的、空白的 ImageData 对象|
|getImageData()	|返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据|
|putImageData()	|把图像数据（从指定的 ImageData 对象）放回画布上|

#####　合成

|属性	|描述|
|-------|---|
|globalAlpha	|设置或返回绘图的当前 alpha 或透明值|
|globalCompositeOperation	|设置或返回新图像如何绘制到已有的图像上|

##### 其他

|方法	|描述|
|-------|---|
|save()	|保存当前环境的状态|
|restore()	|返回之前保存过的路径状态和属性|
|createEvent()	 ||
|getContext()	 ||
|toDataURL()|||

> **`<canvas>` 标记和 SVG 以及 VML 之间的差异**
`<canvas> `有一个基于 JavaScript 的绘图 API，而 SVG 和 VML 使用一个 XML 文档来描述绘图。
这两种方式在功能上是等同的，任何一种都可以用另一种来模拟。从表面上看，它们很不相同，可是，每一种都有强项和弱点。例如，SVG 绘图很容易编辑，只要从其描述中移除元素就行。
要从同一图形的一个 `<canvas>` 标记中移除元素，往往需要擦掉绘图重新绘制它。

## 拖放

	<!DOCTYPE HTML>
	<html>
	<head>
	<style type="text/css">
		#div1, #div2, #div3, #div4{
			float:left; 
			width:100px;
			height:100px;
			margin:10px;
			padding:10px;
			border:1px solid #aaaaaa;
		}
		*{
			transition:all 0.5s;
		}
		#dragDiv{
			background-color: #369;
			width:100px;
			height:100px;
		}
		#mouseLocation{
			clear: both;
			width: 265px;
			margin-left: 10px;
			text-align: center;
		}
		#crossDiv{
			clear: both;
			display: inline-block;
			height: 200px;
			width: 10px;
			background-color: #333;
		}
		#dragElement{
			float: left;
			width: 120px;
			height: 120px;
			background-color: #369;
			margin-left: -99999px;
			opacity: 1;
		}
		#dragElement:click{
			width: 150px;
			height: 150px;
		}
	</style>
	</head>
	<body>
	
	<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="dragLeave(event)">
		<div id="dragDiv" draggable="true" ondragstart="drag(event)" ondrag="draging(event)" ></div>
	</div>
	<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="dragLeave(event)"></div>
	<div id="mouseLocation">X坐标：0，Y坐标：0</div>
	<div id="dragElement"></div>
	<div id="div3" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
	<div id="div4" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
	
	<script type="text/javascript">
		var mouseLocation = document.getElementById("mouseLocation");
		var dragElement = document.getElementById("dragElement");
	
		function draging(ev) {
			mouseLocation.innerHTML = "X坐标：" + ev.clientX + "，Y坐标：" + ev.clientY;
		}
	
		function allowDrop(ev){
			ev.preventDefault();
			mouseLocation.style.backgroundColor = "#333";
			mouseLocation.style.color = "#fff";
			ev.dataTransfer.dropEffect = "copy";
		}
	
		function dragLeave(ev) {
			mouseLocation.style.backgroundColor = "#fff";
			mouseLocation.style.color = "#000";
		}
	
		function drag(ev){
			ev.dataTransfer.setData("Text",ev.target.id);
			ev.dataTransfer.setDragImage(dragElement, 60, 60);
			ev.dataTransfer.effectAllowed = "copy";
		}
	
		function drop(ev) {
			ev.preventDefault();
			var data = ev.dataTransfer.getData("Text");
			ev.target.appendChild(document.getElementById(data));
		}
	</script>
	
	</body>
	</html>

整个过程可解析为如下过程：

1. **设置元素为可拖放**——draggable 属性

		`<img draggable="true" />`

2. **拖动什么** ——ondragstart 和 setData()
<br>在上面的例子中，ondragstart 属性调用了一个函数，drag(event)，它规定了被拖动的数据。dataTransfer.setData() 方法设置被拖数据的数据类型和值。

> [参考链接](http://www.tuicool.com/articles/j6Zbam)

		function drag(ev) {
			ev.dataTransfer.setData("Text",ev.target.id);
		}

	在这个例子中，数据类型是 "Text"，值是可拖动元素的 id ("drag1")。

3. **拖动过程中**——ondrag
<br>拖动过程中，在被拖拉的节点上持续触发。

4. **放到何处** ——ondragover和getData()
<br>ondragover 事件规定在何处放置被拖动的数据。
默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
这要通过调用 ondragover 事件的 event.preventDefault() 方法。

		event.preventDefault()

5. **进行放置** ——ondrop
<br>当放置被拖数据时，会发生 drop 事件。在上面的例子中，ondrop 属性调用了一个函数，drop(event)。

		function drop(ev) {
			ev.preventDefault();
			var data=ev.dataTransfer.getData("Text");
			ev.target.appendChild(document.getElementById(data));
		}

> 代码解释：

> * 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
* 通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
* 被拖数据是被拖元素的 id ("drag1")
* 把被拖元素追加到放置元素（目标元素）中

其他事件和方法：

* **dragend事件**：
拖拉结束时（释放鼠标键或按下escape键）在被拖拉的节点上触发，该事件的target属性是被拖拉的节点。它与dragStart事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，dragend事件总是会触发的。
* **dragenter事件**：拖拉进入当前节点时，在当前节点上触发，该事件的target属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
* **dragover事件**：拖拉到当前节点上方时，在当前节点上持续触发，该事件的target属性是当前节点。该事件与dragenter事件基本类似，默认会重置当前的拖拉事件的效果（DataTransfer对象的dropEffect属性）为none，即不允许放下被拖拉的节点，所以如果允许在当前节点drop数据，通常会使用preventDefault方法，取消重置拖拉效果为none。
* **event.dataTransfer.setDragImage(element,x,y)方法**：设置拖放操作的自定义图标。其中element设置自定义图标，x设置图标与鼠标在水平方向上的距离，y设置图标与鼠标在垂直方向上的距离。

####H5拖拽常用功能

> HTML5文件拖拽预览Demo

	<!DOCTYPE html>
	<html>
	 <head> 
	  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	  <title>HTML5文件拖拽预览Demo</title> 
	  <style type="text/css">
	  	h1 {
			padding: 0px;
			margin: 0px;
		}
		div#show {
			border: 1px solid #ccc;
			width: 400px;
			height: 300px;
			display: -moz-box;
			display: -webkit-box;
			-moz-box-align: center;
			-webkit-box-align: center;
			-moz-box-pack: center;
			-webkit-box-pack: center;
			resize: both;
			overflow: auto;
		}
		div[id^=show]:hover {
			border: 1px solid #333;
		}
		div#main {
			width: 100%;
		}
		div#successLabel {
			color: Red;
		}
		div#content {
			display: none;
		}    
	</style> 
	  <script type="text/javascript">
	  	function init() {
	    	var dest = document.getElementById("show");
	    	dest.addEventListener("dragover",
	    		function(ev) {
			        ev.stopPropagation();
			        ev.preventDefault();
			    },
	    	false);
		    dest.addEventListener("dragend",
			    function(ev) {
			        ev.stopPropagation();
			        ev.preventDefault();
			    },
		    false);
	    	dest.addEventListener("drop",
			    function(ev) {
			        ev.stopPropagation();
			        ev.preventDefault();
			        console.log(ev.dataTransfer) var file = ev.dataTransfer.files[0];
			        var reader = new FileReader();
			        if (file.type.substr(0, 5) == "image") {
			            reader.onload = function(event) {
			                dest.style.background = 'url(' + event.target.result + ') no-repeat center';
			                dest.innerHTML = "";
			            };
			            reader.readAsDataURL(file);
			        } else if (file.type.substr(0, 4) == "text") {
			            reader.readAsText(file);
			            reader.onload = function(f) {
			                dest.innerHTML = "<pre>" + this.result + "</pre>";
			                dest.style.background = "white";
			            }
			        } else {
			            dest.innerHTML = "暂不支持此类文件的预览";
			            dest.style.background = "white";
			        }
			    },
	   		false);
		} 
		//设置页面属性，不执行默认处理（拒绝被拖放）
		// document.ondragover = function(e) {
		//     e.preventDefault();
		// };
		// document.ondrop = function(e) {
		//     e.preventDefault();
		// }
		// window.onload = init;
	
	  </script>
	 </head>
	 <body> 
	  <h1>HTML5文件拖拽预览Demo</h1> 
	  <div id="show">
	    文件预览区，仅限图片和txt文件 
	  </div>
	 </body>
	</html>



## Web存储

HTML5 提供了两种在客户端存储数据的新方法：

* localStorage - 没有时间限制的数据存储
* sessionStorage - 针对一个 session 的数据存储

之前，这些都是由 cookie 完成的。但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高。

在 HTML5 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。
对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。
HTML5 使用 JavaScript 来存储和访问数据。

#### localStorage方法

localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。

这个例子创建并访问了 localStorage：

	<script type="text/javascript">
		localStorage.lastname="Smith";
		document.write(localStorage.lastname);
	</script>

下面的例子对用户访问页面的次数进行计数：

	<script type="text/javascript">
		if (localStorage.pagecount) {
		  	localStorage.pagecount=Number(localStorage.pagecount) +1;
		}
		else {
		 	localStorage.pagecount=1;
		}
		document.write("Visits "+ localStorage.pagecount + " time(s).");
	</script>

#### sessionStorage方法

sessionStorage 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。

创建并访问一个 sessionStorage：

	<script type="text/javascript">
		sessionStorage.lastname="Smith";
		document.write(sessionStorage.lastname);
	</script>

应用——统计用户在当前 session 中访问页面的次数进行计数：

	<script type="text/javascript">
		if (sessionStorage.pagecount) {
		  	sessionStorage.pagecount=Number(sessionStorage.pagecount) +1;
		}
		else {
		 	sessionStorage.pagecount=1;
		}
		document.write("Visits "+sessionStorage.pagecount+" time(s) this session.");
	</script>

## H5标签

### nav标签

	<nav>
		<a href="index.asp">Home</a>
		<a href="html5_meter.asp">Previous</a>
		<a href="html5_noscript.asp">Next</a>
	</nav>

##### 定义和用法

`<nav>`定义导航链接的部分。

> 如果文档中有“前后”按钮，则应该把它放到 `<nav>` 元素中。

### section标签

	<section>
	  <h1>PRC</h1>
	  <p>The People's Republic of China was born in 1949...</p>
	</section>

##### 定义和用法

`<section>` 标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。

### header标签

	<header>
		<h1>Welcome to my homepage</h1>
		<p>My name is Donald Duck</p>
	</header>

	<p>The rest of my home page...</p>

##### 定义和用法

`<header>`定义 section 或 page 的页眉（介绍信息）。

### footer标签

	<footer>
	  	<p>Posted by: Ajun</p>
	  	<p>Contact information: <a href="mailto:774271383@qq.com">774271383@qq.com</a>.</p>
	</footer>

##### 定义和用法

`<footer>` 标签定义文档或节的页脚。

页脚通常包含文档的作者、版权信息、使用条款链接、联系信息等等。
一个文档中可以使用多个 `<footer>` 元素。

> `<footer>` 元素内的联系信息应该位于 `<address>` 标签中。

### output标签

	<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
	   	<input type="range" id="a" value="50">100+<input type="number" id="b" value="50">
	   	=<output name="x" for="a b">100</output>
	</form> 

##### 定义和用法

`<output>`定义不同类型的输出，比如脚本的输出。

|属性	|值	|描述|
|-------|---|----|
|for	|element_id	|定义输出域相关的一个或多个元素。|
|form	|form_id	|定义输入字段所属的一个或多个表单。|
|name	|name	|定义对象的唯一名称。（表单提交时使用）|

### progress标签

	<progress value="22" max="100"></progress> 

##### 浏览器支持

Internet Explorer 9 以及更早的版本不支持 `<progress>` 标签。

##### 定义和用法

`<progress>` 标签标示任务的进度（进程）。

> 结合`<progress>`标签与 JavaScript 一同使用，来显示任务的进度。
注意不适合用来表示度量衡（例如，磁盘空间使用情况或查询结果）。如需表示度量衡，请使用 `<meter>` 标签代替。

### article标签

	<article>
	  	<h1>Internet Explorer 9</h1>
	  	<p>Windows Internet Explorer 9（简称 IE9）于2011年3月14日发布。</p>
	</article>

##### 定义和用法

`<article>` 标签规定独立的自包含内容。一篇文章应有其自身的意义，应该有可能独立于站点的其余部分对其进行分发。

`<article>` 元素的潜在来源：

* 论坛帖子
* 报纸文章
* 博客条目
* 用户评论

### aside标签

	<p>Me and my family visited The Epcot center this summer.</p>
	<aside>
		<h4>Epcot Center</h4>
		The Epcot Center is a theme park in Disney World, Florida.
	</aside>

##### 定义和用法

`<aside>`标签定义其所处内容之外的内容。aside的内容应该与附近的内容相关。

### bdi标签

	<ul>
		<li>Username <bdi>Bill</bdi>:80 points</li>
		<li>Username <bdi>Steve</bdi>: 78 points</li>
	</ul>

##### 定义和用法

bdi 指的是 bidi 隔离。

`<bdi>` 标签允许您设置一段文本，使其脱离其父元素的文本方向设置。在发布用户评论或其他您无法完全控制的内容时，该标签很有用。

### command标签

	<menu>
		<command onclick="alert('Hello World')">Click Me!</command>
	</menu>

##### 浏览器支持

目前只有 Internet Explorer 支持 `<command>` 标签。(自己测试怎么IE也不行)

##### 定义和用法

command 元素表示用户能够调用的命令。可以定义命令按钮，比如单选按钮、复选框或按钮。

只有当 command 元素位于 menu 元素内时，该元素才是可见的。否则不会显示这个元素，但是可以用它规定键盘快捷键。

|属性	|值	|描述|
|-------|---|----|
|checked	|checked	|定义是否被选中。仅用于 radio 或 checkbox 类型。|
|disabled	|disabled	|定义 command 是否可用。|
|icon	|url	|定义作为 command 来显示的图像的 url。|
|label	|text	|为 command 定义可见的 label。|
|radiogroup	|groupname	|定义 command 所属的组名。仅在类型为 radio 时使用。|
|type	|checkbox<br>command<br>radio |定义该 command 的类型。默认是 "command"。|

### datalist标签

	<input id="myCar" list="cars" />
	<datalist id="cars">
	  <option value="BMW">宝马</option>
	  <option value="Ford">福特</option>
	  <option value="Volvo">沃尔沃</option>
	</datalist>

##### 定义和用法

`<datalist>`标签定义下拉选项列表。请与 input 元素配合使用该元素，来定义 input 可能的值。

datalist 及其选项不会被显示出来，它仅仅是合法的输入值列表。

> * 请使用 input 元素的 list 属性来绑定 datalist。
  * 注意value属性值为选项内容，option标签内为当前选项内容的注释。
  * 区别与select标签的区分，输入方式也有所不同。

### details标签

	<details>
		<summary>Copyright 2011.</summary>
		<p>All pages and graphics on this web site are the property of W3School.</p>
	</details>

> 与`<summary>`标签配合使用可以为details定义标题。标题是可见的，用户点击标题时，会显示出 details。若不定义summary则标题显示详细信息。

##### 定义和用法

定义元素的细节，用于描述文档或文档某个部分的细节。

##### 浏览器支持

目前只有 Chrome 支持 `<details>` 标签。其他浏览器不识别但是会使用衬线体来直接显示其内所有内容。

##### 属性

open属性，只有一个值“open”，定义 details 内的内容默认可见。

### dialog标签

	<table border="1">
	<tr>
	  <th>一月 <dialog open>这是打开的对话窗口</dialog></th>
	  <th>二月</th>
	  <th>三月</th>
	</tr>
	<tr>
	  <td>31</td>
	  <td>28</td>
	  <td>31</td>
	</tr>
	</table>

##### 定义和用法

定义对话框或窗口。

##### 属性

open属性，只有一个值“open”，规定 dialog 元素是活动的，用户可与之交互。

##### 浏览器支持

目前只有 Chrome 和 Safari 6 支持 <dialog> 标签。

### embed标签

	<embed src="helloworld.swf" />

##### 定义和用法

定义嵌入的内容，可以用来插入各种多媒体，格式可以是Swf、Midi、Wav、AIFF、AU、MP3等等。

|属性	|值	|描述|
|-------|---|----|
|height	|pixels	|设置嵌入内容的高度。|
|src	|url	|嵌入内容的 URL。|
|type	|type	|定义嵌入内容的类型。|
|width	|pixels	|设置嵌入内容的宽度。|

### figure标签

	<figure>
	  <p>黄浦江上的的卢浦大桥</p>
	  <img src="shanghai_lupu_bridge.jpg" width="350" height="234" />
	</figure>

##### 定义和用法

`<figure>` 标签规定独立的流内容（图像、图表、照片、代码等等）,定义媒介内容的分组，以及它们的标题。其内容应该与主内容相关，但如果被删除，则不应对文档流产生影响。

> 使用 `<figcaption>` 元素为 figure 添加标题（caption）。

### input标签

H5新增许多其属性，列表如下

|属性	|值	|描述|
|-------|---|----|
|accept	|mime_type	|规定通过文件上传来提交的文件的类型。|
|align	|left<br>right<br>top<br>middle<br>bottom |不赞成使用。规定图像输入的对齐方式。|
|alt	|text	|定义图像输入的替代文本。|
|autocomplete	|on<br>off|规定是否使用输入字段的自动完成功能。|
|autofocus	|autofocus	|规定输入字段在页面加载时是否获得焦点。（不适用于 type="hidden"）|
|checked	|checked	|规定此 input 元素首次加载时应当被选中。|
|disabled	|disabled	|当 input 元素加载时禁用此元素。|
|form	|formname	|规定输入字段所属的一个或多个表单。|
|formaction	|URL	|覆盖表单的 action 属性。（适用于 type="submit" 和 type="image"）|
|formenctype	|见注释	|覆盖表单的 enctype 属性。（适用于 type="submit" 和 type="image"）|
|formmethod	|get<br>post|覆盖表单的 method 属性。（适用于 type="submit" 和 type="image"）|
|formnovalidate	|formnovalidate	|覆盖表单的 novalidate 属性。如果使用该属性，则提交表单时不进行验证。|
|formtarget	|_blank<br>_self<br>_parent<br>_top<br>framename|覆盖表单的 target 属性。（适用于 type="submit" 和 type="image"）|
|height	|pixels<br>%|定义 input 字段的高度。（适用于 type="image"）|
|list	|datalist-id	|引用包含输入字段的预定义选项的 datalist 。|
|max	|number<br>date|规定输入字段的最大值。请与 "min" 属性配合使用，来创建合法值的范围。|
|maxlength	|number	|规定输入字段中的字符的最大长度。|
|min	|number<br>date|规定输入字段的最小值。请与 "max" 属性配合使用，来创建合法值的范围。|
|multiple	|multiple	|如果使用该属性，则允许一个以上的值。|
|name	|field_name	|定义 input 元素的名称。|
|pattern	|regexp_pattern	|规定输入字段的值的模式或格式。例如 pattern="[0-9]" 表示输入值必须是 0 与 9 之间的数字。|
|placeholder	|text	|规定帮助用户填写输入字段的提示。|
|readonly	|readonly	|规定输入字段为只读。|
|required	|required	|指示输入字段的值是必需的。|
|size	|number_of_char	|定义输入字段的宽度。|
|src	|URL	|定义以提交按钮形式显示的图像的 URL。|
|step	|number	|规定输入字的的合法数字间隔。|
|type	|button<br>checkbox<br>file<br>hidden<br>image<br>password<br>radio<br>reset<br>submit<br>text|规定 input 元素的类型。|
|value	|value	|规定 input 元素的值。|
|width	|pixels<br>%|定义 input 字段的宽度。（适用于 type="image"）|