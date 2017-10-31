---

title: Js的隐式类型转换
tags: ['js', '数据类型']

---

## 起因

##### 腾讯笔试题

顺便吐槽一句......

<!-- more -->

腾讯考的选择题相对其他网易阿里360什么的要更专业前端一些，他们几个都更广泛考一些计算机组成，堆栈，二分什么乱七八糟的计算机基础知识，腾讯选择题全考的网络相关的，但是考的也太网络基础了.....交换机，IPV6相比IPV4的优点，UDP协议头，FTP协议.....咱们安安心心考个HTTP不好么.....我还没懂这么多呢[哭]

##### 好了正式的

起因是在腾讯2017实习生笔试，选择题考了一道关于

	if(0<100<0) console.log('0<100<0');
	if(0<100<(0+4)) console.log('0<100<(0+4)')

## Js的隐式类型转换

JS是弱类型编程语言，这点我一直印象深刻，因为刚学JS的时候发现声明变量不用乱七八糟的去动脑区分 `int`,`long int`,`short int`,`double`等等，只要一个`var`！没错！统统不要，只要一个`var`是不是hin贴心！！！

但是弱类型也带来了一些副作用，比如在代码中存在一些隐式类型转换，可能会让输入输出结果与编程者的期望不太一样。就像这道考题。

考完去chrome控制台验证了一下，输出结果应该是`0<100<(0+4)`，也就是说，`0<100<0+4`在if逻辑中判断为`true`。（神tm的判断......）

这就是隐式类型转换存在的缘故。因为括号内容`(0+4)`的存在，导致了括号中的表达式参与的判断被隐式转换成了number类型，因此，`0<100`正常逻辑判断为`true`后，判断`true<(0+4)`时被转换成了`0<(0+4)`，所以最后被判断为`true`。

以下为控制台验证过程，'//'后为返回结果

	true < 1				//false
	true < 2				//true
	true - 1				//0
	true < (0 + 0)			//false
	true < (0 + 4) 			//true
	true === (0 + 1)		//false
	true == (0 + 1)			//true
	true + 0 === (0 + 1)	//true


P.S.今天做赛码的笔试题的时候学到一个零几年就有但现在基本没人用的跑马灯标签：
`<marquee>`

其实我感觉功能还挺酷炫的。不仅可以移动文字，也可以移动图片，表格等。

语法：`<marquee direction="" behavior="" scrollamount="" >...</marquee>`(在标记之间添加要进行滚动的内容)

重要属性：

* 滚动方向direction（包括4个值：up、 down、 left和 right）
* 滚动方式behavior（scroll:循环滚动，默认效果； slide:只滚动一次就停止； alternate:来回交替进行滚动）
* 滚动速度scrollamount（滚动速度是设置每次滚动时移动的长度，以像素为单位）
* 滚动延迟scrolldelay（设置滚动的时间间隔，单位是毫秒）
* 滚动循环loop（默认值是-1，滚动会不断的循环下去）
* 滚动范围width、height
* 滚动背景颜色bgcolor
* 空白空间hspace、vspace

例子跑起来

	<!DOCTYPE html>
	<html>
	<head>
		<title>test</title>
	</head>
	<body>
		<marquee direction="up" scroll="alternate" loop="-1" scrollamount="10">这是一个marquee标签，似乎是零几年就存在的一个标签，但是现在好像没听说过</marquee>
		<marquee direction="left" scroll="alternate" loop="-1" scrollamount="10"><img src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=156557612,1695936325&fm=85&s=695818D27C46B819D23D44D50300C062"></marquee>
	</body>
	</html>

那么问题来了，这么酷炫的标签为什么现在没人用了呢？

因为他被W3C标准抛弃了！

主要原因可以看一下参考链接。一句话就是：用归用，标准归标准。

> 顺便插个嘴，这玩意儿浏览器支持还挺好的（毕竟那么早的标签了）

参考链接：

* [Marquee为什么不符合WEB标准？](http://www.chinablackhat.com/kf/201410/6610.html)
* [HTML标签marquee实现滚动效果](http://www.cnblogs.com/zzuIvy/p/marqueeTest_1.html)
* [一个不陌生的JS效果-marquee的代替实现方法](http://www.cnblogs.com/hustskyking/p/marquee-in-javascript.html)
