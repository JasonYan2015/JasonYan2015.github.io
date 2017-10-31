---

title: 新时代使用react框架的环境搭建
tags: ['js', 'webpack', 'react', 'babel']

---

> 作为一名2016年成长起来的前端，怎么能不会react，不会babel，不会es6，不会webpack.....呢

<!-- more -->

## 安装与配置

创建一个目录，就不用说了。这里先取名为`root`。

### 创建项目配置文件`package.json`

	npm init

填写相关问题，即可在`root`根目录创建`package.json`文件。

> 注意，其中的package name不能与`npm`的包同名，否则`npm install`的时候会出错，安装不上。另外，创建该配置文件后，后续`npm install`的包都会在安装完成后自动加入`package.json`的字段中。

这里给个目录预告

* /app
	* main.js
	* component.js
* /public
	* bundle.js
	* index.html
* /node_modules
	* ...
* package.json
* webpack.config.js

### 安装与配置`webpack`

#### 安装

	npm install --save-dev webpack

#### 配置

在根目录`root`创建`webpack.config.js`。

具体配置参数请搜索相关信息，不详细介绍，这里给个例子

	var path = require('path');

	module.exports = {
        entry: path.resolve(__dirname, 'app/main.js'),
	    output: {
	        path: path.resolve(__dirname, 'public'),
	        filename: 'bundle.js',
	    },
	    module: {
		    loaders: [
		      	{
				    test: /\.js$/, 
				    exclude: /node_modules/, 
				    loader: 'babel-loader'
				}
			]
	    },
	};

### 安装与配置`webpack-dev-server`

这是一个能够提供一个可选的本地开发服务器（基于Node创建），用来监听文件改变并自动编译的包

#### 安装

	npm install --save-dev webpack-dev-server

#### 配置

在`webpack.config.js`中添加

	module.exports = {
	    ......
	    devServer: {
	    	contentBase: "public",
		    historyApiFallback: true,
		    inline: true,
		    hot: true
	    },
	    plugins: [
	    	new webpack.HotModuleReplacementPlugin()
	    ]
	};

### 安装react,react-dom

	npm install --save-dev react react-dom

> 多个包之间用空格间隔开

### 安装与配置eslint

#### 安装

	npm install eslint -g

> 用了全局安装，我在使用时使用本地安装使用时在根目录找不到命令`eslint`不知道为什么，最后一想，反正代码检查全都要用，就全局安装了。后续有时间会研究一下这个问题。

#### 配置

使用`eslint`自带的命令配置即可：

	eslint -init

和`npm init`的形式一样，也是问答式的自动创建。更为方便的是也可以通过这个命令直接使用比如airbnb公司的配置（他们的配置几乎是所有`eslint`使用者的强推，这也看出来大家都用的mac[捂脸],windows下使用`eslint-config-airbnb`每行都错，因为windows使用的换行符是`crlf`而mac是`lf`，他们的配置要求所有换行是`lf`）

## 目录树

安装了一些必要的包之后，目前根目录`root`下的文件结构应该是这样的，其中有三个文件是手动创建的：

* `main.js`：`webpack`打包整个项目时作为唯一入口，引用项目的所有依赖
* `index.html`：引入`main.js`，作为承载整个项目的页面
* `component.js`：具体的业务相关逻辑代码存放处，可再细分

而`bundle.js`会在后续中使用`webpack`自动创建。

* /app
	* main.js
	* component.js
* /public
	* bundle.js
	* index.html
* /node_modules
	* ...
* package.json
* webpack.config.js

## 使用

### `index.html`，`component.js`和`main.js`的例子

**app/component.js**

	'use strict';

	module.exports = function () {
	    var element = document.createElement('h1');

	    element.innerHTML = 'Hello world';

	    return element;
	};

**app/main.js**

	'use strict';
	var component = require('./component.js');

	document.body.appendChild(component());

**index.html**

	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="UTF-8"/>
	  </head>
	  <body>
	    <script src="bundle.js"></script>
	  </body>
	</html>

好了，最后在根目录运行 

	webpack

就自动编译出了`bundle.js`。

另外，如果使用自动编译：

	webpack-dev-server --devtool eval --progress --colors

参数说明：

* webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
* --devtool eval - 为代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
* --hot - 需要在`webpack.config.js`中引用一个`plugins`插件`new webpack.HotModuleReplacementPlugin()`才生效
* --progress - 显示合并代码进度
* --colors - 在命令行中显示颜色
* --content-base public - 指向设置的输出目录

附：

|devtool选项	|配置结果|
|:--------------|:--------|
|source-map	|在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度；|
|cheap-module-source-map	|在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；|
|eval-source-map	|使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；|
|cheap-module-eval-source-map	|这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点|


### 命令行规范

随着工程的复杂化，我们会需要越来越多的命令去执行，规范的行为是，统一放到`package.json`的`scripts`字段中，统一管理。

像上面的 

`webpack-dev-server --devtool eval --progress --colors`

命令，可以这样配置`scripts`字段(`key`名可以任意起，这里叫`build`，`dev`)

	"scripts": {
		"build": "webpack",
    	"dev": "webpack-dev-server --devtool eval --progress --colors"
	}

这样每次使用

	npm run dev

就会实际上执行

	webpack-dev-server --devtool eval --progress --colors

### 使用总结

使用`npm run dev`后每次修改并保存`main.js`都会触发一次`webpack`编译，然后在浏览器访问`127.0.0.1:8080`监听8080端口即可看到浏览器渲染结果。