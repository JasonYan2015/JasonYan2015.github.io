---

title: CSS3媒体查询
tags: ['响应式', 'CSS']

---

> 移动浪潮的到来，促使web的主战场从PC迁移到了Mobile。于是为了适应各式各样的设备尺寸，出现了响应式设计模型。而这一设计的核心，便是CSS的Media媒体查询器。

<!-- more -->

## meta标签

先介绍一下HTML的meta标签。`<meta>`可提供有关某个 HTML 元素的元信息 (meta-information)，比如描述、针对搜索引擎的关键词以及刷新频率。

它有以下几个属性：

|属性		|描述	|
|-----------|-------|
|content	|设置或返回 <meta> 元素的 content 属性的值。|
|httpEquiv	|把 content 属性连接到一个 HTTP 头部。|
|name		|把 content 属性连接到某个名称。|
|scheme		|设置或返回用于解释 content 属性的值的格式。|

而在响应式中我们常常这么设置(IE9及以上)：

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

参数说明：

* width = device-width：宽度等于当前设备的宽度
* initial-scale：初始的缩放比例（默认设置为1.0）  
* minimum-scale：允许用户缩放到的最小比例（默认设置为1.0）    
* maximum-scale：允许用户缩放到的最大比例（默认设置为1.0）   
* user-scalable：用户是否可以手动缩放（默认设置为no，因为我们不希望用户放大缩小页面） 

还有这个：

	<meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">

这个主要是为了防止有的用户IE升级到IE9以上了而浏览器的文档模式却是IE8。最后的`chrome=1`代表`[Google Chrome Frame（谷歌内嵌浏览器框架GCF）](http://zh.wikipedia.org/wiki/Google_Chrome_Frame)`.如果有的用户电脑里面装了这个chrome的插件，就可以让电脑里面的IE不管是哪个版本的都可以使用Webkit引擎及V8引擎进行排版及运算，如果用户没装这个插件，那这段代码就会让IE以最高的文档模式展现效果。

> IE8既不支持HTML5也不支持CSS3 Media,所以如果需要兼容，则需要引入一下两个js文件
>
>	<!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	  <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
>
> 顺便，复习一下[CSS条件注释](http://www.cnblogs.com/fm168/p/5526702.html)

## CSS3 Media

### 语法

	@media mediatype and|not|only (media feature) {
	    CSS-Code;
	}

或者使用引用link

	<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">

其中`mediatype`主要有:

* all: 用于所有设备
* print:　用于打印机和打印预览
* screen: 用于电脑屏幕，平板电脑，智能手机等。
* speech: 用于屏幕阅读器等发声设备

`media feature`主要有:

|值	|描述|
|---|----|
|aspect-ratio	|定义输出设备中的页面可见区域宽度与高度的比率|
|color	|定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0|
|color-index	|定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0|
|device-aspect-ratio	|定义输出设备的屏幕可见宽度与高度的比率。|
|device-height	|定义输出设备的屏幕可见高度。|
|device-width	|定义输出设备的屏幕可见宽度。|
|grid	|用来查询输出设备是否使用栅格或点阵。|
|height	|定义输出设备中的页面可见区域高度。|
|max-aspect-ratio	|定义输出设备的屏幕可见宽度与高度的最大比率。|
|max-color	|定义输出设备每一组彩色原件的最大个数。|
|max-color-index	|定义在输出设备的彩色查询表中的最大条目数。|
|max-device-aspect-ratio	|定义输出设备的屏幕可见宽度与高度的最大比率。|
|max-device-height	|定义输出设备的屏幕可见的最大高度。|
|max-device-width	|定义输出设备的屏幕最大可见宽度。|
|max-height	|定义输出设备中的页面最大可见区域高度。|
|max-monochrome	|定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。|
|max-resolution	|定义设备的最大分辨率。|
|max-width	|定义输出设备中的页面最大可见区域宽度。|
|min-aspect-ratio	|定义输出设备中的页面可见区域宽度与高度的最小比率。|
|min-color	|定义输出设备每一组彩色原件的最小个数。|
|min-color-index	|定义在输出设备的彩色查询表中的最小条目数。|
|min-device-aspect-ratio	|定义输出设备的屏幕可见宽度与高度的最小比率。|
|min-device-width	|定义输出设备的屏幕最小可见宽度。|
|min-device-height	|定义输出设备的屏幕的最小可见高度。|
|min-height	|定义输出设备中的页面最小可见区域高度。|
|min-monochrome	|定义在一个单色框架缓冲区中每像素包含的最小单色原件个数|
|min-resolution	|定义设备的最小分辨率。|
|min-width	|定义输出设备中的页面最小可见区域宽度。|
|monochrome	|定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0|
|orientation	|定义输出设备中的页面可见区域高度是否大于或等于宽度。|
|resolution	|定义设备的分辨率。如：96dpi, 300dpi, 118dpcm|
|scan	|定义电视类设备的扫描工序。|
|width	|定义输出设备中的页面可见区域宽度。|

### 举例

	@media screen and (max-width: 960px){
	    body{
	        background: #000;
	    }
	}

上面这段CSS代码意思是：当页面小于960px的时候执行这一段CSS。

也可以省略screen(不考虑用户打印等其他需求)，直接

	@media (max-width: 960px){
	    body{
	        background: #000;
	    }
	}

再比如：

	@media screen and (max-device-width:960px){
	    body{
	        background:red;
	    }
	}

实现等于960px尺寸的代码

或者混合：

	@media screen and (min-width:960px) and (max-width:1200px){
	    body{
	        background:yellow;
	    }
	}

****

参考链接

* [HTML DOM Meta 对象](http://www.runoob.com/jsref/dom-obj-meta.html)
* [css3 media媒体查询器用法总结--来自520UED](http://www.520ued.com/article/53882d7ab992a7c43f5c204b)