---

title: 【模块化JS】AMD规范
tags: ['模块化', 'js']

---

Asynchronous Module Definition——异步模块定义

它是一个在浏览器端模块化开发的规范。由于不是Javascript原生支持，使用AMD规范进行页面开发需要用到对应的库函数——**RequireJS**

![RequireJS图标](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1485016792251&di=e0445002cd2ccabd9c130a8e12d4d1d2&imgtype=0&src=http%3A%2F%2Fwww.uedsc.com%2Fwp-content%2Fuploads%2F2015%2F08%2Frequirejs.jpg)

#### RequireJS主要解决两个问题

1. 多个js文件之间可能存在依赖关系时需要被依赖文件先备加载到浏览器
2. js文件加载时，加载文件越多，页面失去响应时间越久

<!-- more -->

#### 语法简介

*定义模块*——define([id], [dependencies], factory);

它是全局变量，用于定义模块。

* id：可选，用于定义模块标识。若没有提供该参数，则标识为脚本文件名
* dependencies：可选，所依赖的模块
* factory：模块初始化要执行的函数或对象。若为函数，则只被执行一次，若为对象，则此对象应为模块的输出值。


*加载模块*——require([dependencies], callback);

* dependencies：数组，表示所依赖的模块
* callback：回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

> 补充：require()函数在加载依赖的函数时是异步加载的，这样浏览器就不会失去响应，它指定的回调函数只有在前面的模块都加载成功后才会运行。由此解决依赖性问题。

### 使用RequireJS

#### 下载

[下载链接](http://www.requirejs.cn/docs/download.html)

#### 添加

假定现在项目中所有js文件都放在一个"scripts"目录下，并添加上require.js。

	* 项目目录/
	  * project.html
	  * scripts/
	     * main.js
	     * *require.js*
	     * helper/
	         * util.js

为了充分利用require.js建议只在HTML中引入require.js，然后通过它来请求加载其他的scripts：

	<!DOCTYPE html>
	<html>
	    <head>
	        <title>My Sample Project</title>
	        <!-- data-main attribute tells require.js to load scripts/main.js after require.js loads. -->
	        <script data-main="scripts/main" src="scripts/require.js"></script>
	    </head>
	    <body>
	        <h1>My Sample Project</h1>
	    </body>
	</html>

* data-main属性：require.js使用它来启动脚本加载过程。

> RequireJS以一个相对于baseUrl的地址来加载所有的代码。而baseUrl有三种方式可以设置。

> 1. 使用上述data-main属性，可设置baseUrl为该属性相一致的目录。上例中为scripts文件夹
2. 使用RequireJS 的config手动设置。比如在main.js头部添加
		 	require.config({
				paths: {
			    		jsFileName: 'FileAddress'
				}
			});
> 3. 如果没有显式指定上述二者，则默认为包含RequireJS的那个HTML页面所属目录。

然后在main.js中使用require()来加载所有需要运行的scripts。

	require(["helper/util"], function(util) {
	    //This function is called when scripts/helper/util.js is loaded.
	    //If util.js calls define(), then this function is not fired until
	    //util's dependencies have loaded, and the util argument will hold
	    //the module value for "helper/util".
	});

#### 加载文件

以加载一个jQuery库为例。之前都是加载本地js模块，若是需要加载来自本地服务器、其他网站或CDN的js，那么可以用如下方式：

	require.config({
	    paths : {
	        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery"]   
	    }
	})
	require(["jquery","js/a"],function($){
	    $(function(){
	        alert("load finished");  
	    })
	})

require.config用来配置模块加载位置。简单点说就是给模块起一个更短更好记的名字，比如将百度的jquery库地址标记为jquery，这样在require时只需要写["jquery"]就可以加载该js。当然，本地的js也可以这样配置。

通过paths的配置会使我们的模块名字更精炼，paths还有一个重要的功能，就是可以配置多个路径，如果远程cdn库没有加载成功，可以加载本地的库，如：

	require.config({
	    paths : {
	        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],
	        "a" : "js/a"   
	    }
	})
	require(["jquery","a"],function($){
	    $(function(){
	        alert("load finished");  
	    })
	})

这样配置后，当百度的jquery没有加载成功后，会加载本地js目录下的jquery。

1. 在使用requirejs时，加载模块时不用写.js后缀的，当然也是不能写后缀
2. 上面例子中的callback函数中发现有$参数，这个就是依赖的jquery模块的输出变量，如果你依赖多个模块，可以依次写入多个参数来使用。

事实上，一般把require.config配置放到data-main中配置，这样就可以使每一个页面都使用这个配置，然后页面中就可以直接使用require来加载所有的短模块名。

*main.js*

	require.config({
	    paths : {
	        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],
	        "a" : "js/a"   
	    }
	})

*project.html*

	<script data-main="js/main" src="js/require.js"></script>

##### 加载第三方模块

通过require加载的模块一般都需要符合AMD规范即使用define来申明模块，但是部分时候需要加载非AMD规范的js，这时候就需要用到另一个功能——shim

主要用在两个地方

1. 非AMD模块输出，将非标准的AMD模块"垫"成可用的模块，例如：老版本的jquery，并没有继承AMD规范，所以不能直接require["jquery"],这时候就需要shim。比如我要是用underscore类库，但是他并没有实现AMD规范，那么可以这样配置：

		require.config({
		    shim: {
		        "underscore" : {
		            exports : "_";
		        }
		    }
		})

	这样配置后，就可以在其他模块中引用underscore模块：

		require(["underscore"], function(_){
		    _.each([1,2,3], alert);
		})

2. 插件形式的非AMD模块。我们经常会用到jquery插件，而这些插件基本都不符合AMD规范，比如jquery.form插件，这时候就需要将form插件shim到jquery中：

		require.config({
		    shim: {
		        "underscore" : {
		            exports : "_";
		        },
		        "jquery.form" : {
		            deps : ["jquery"]
		        }
		    }
		})

	这样配置之后我们就可以使用加载插件后的jquery了

		require.config(["jquery", "jquery.form"], function($){
		    $(function(){
		        $("#form").ajaxSubmit({...});
		    })
		})

****
[RequireJS简单教程](http://www.runoob.com/w3cnote/requirejs-tutorial-1.html)

[RequireJS中文网](http://www.requirejs.cn/)