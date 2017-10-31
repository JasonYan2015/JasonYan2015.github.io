---

title: jQuery源码剖析·第一弹
tags: ['jquery', 'js', '源码分析']

---

> 神库jQuery的内心世界

> 选用1.9.0版本jQuery

<!-- more -->

## 目录

1. **沙箱封装**
2. **core工具方法**：jquery的核心组成部分，包括
	* $.trim()去除字符串两端的空格。（内部调用7次）
	* $.each()遍历数组或对象（内部调用59次）
	* $.inArray()返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。（内部调用9次）
	* $.grep()返回数组中符合某种标准的元素。（内部调用6次）
	* $.merge()合并两个数组。（内部调用11次）
	* $.map()将一个数组中的元素转换到另一个数组中。（内部调用12次）
	* $.makeArray()将对象转化为数组。（内部调用6次）
	* $.globalEval() 在全局作用域下执行一段js脚本。（内部调用2次）
	* $.proxy()接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文(context)语境。（内部调用0次）
	* $.nodeName()返回DOM节点的节点名字，或者判断DOM节点名是否为某某名字。（内部调用51次）
	* $.extend()将多个对象，合并到第一个对象。（内部调用42次）
3. **$.type类型判断**：判断对象的类别（函数对象、日期对象、数组对象、正则对象等等（内部调用65次）,并以调用此方法来实现：
	* $.isArray()判断某个参数是否为数组。（内部调用12次）
	* $.isEmptyObject()判断某个对象是否为空（不含有任何属性）。（内部调用4次）
	* $.isFunction()判断某个参数是否为函数。（内部调用32次）
	* $.isPlainObject()判断某个参数是否为用"{}"或"new Object"建立的对象。（内部调用4次）
	* $.isWindow()判断是否为window对象。（内部调用6次）
4. **处理ajax返回数据**：主要包括
	* $.parseHTML() 解析HTML（内部调用2次）
	* $.parseJSON() 解析JSON（内部调用2次）
	* $.parseXML() 解析XML（内部调用1次）
5. **几个简单的函数**：不在之后的文章中分析
	* $.noop() 一个空函数，个人觉得是用来作为一个默认的回调函数，无需每次去定义一个空的function消耗资源。（内部调用2次）
	* $.now() 获取当前时间戳，代码很简单：return (new Date()).getTime();。（内部调用4次）
	* $.error() 报错，对外抛出一个异常，代码很简单：throw new Error(msg);。（内部调用2次）

## 沙箱封装

	(function( window, undefined ) {
	     //用一个函数域把整个库包起来，就是所谓的沙箱
	     //在这里边var定义的变量，属于这个函数域内的局部变量，避免污染全局
	     //把当前沙箱需要的外部变量通过函数参数引入进来
	     //只要保证参数对内提供的接口的一致性，你还可以随意替换传进来的这个参数
	    "use strict";
	    window.jQuery = window.$ = jQuery;
	})( window );

至于为什么第二个参数`undefined`，这是一个针对压缩的小trick，同时也是为了防止因ES5之前能对`undefined`赋值而使用者编程不规范引发错误。

压缩前

	(function( window, undefined ) {
	  var a = undefined;
	  if (a == undefined){......}

	  ......
	  if (c == undefined) return;
	})( window );

压缩后

	(function(w, u) {
	  var a = u;
	  if (a == u){......}

	  ......
	  if (c == u) return;
	})(w);

内部全局的`undefined`被缩成一个`u`，缩小了整个库的压缩包的体积。

## core工具方法

### 引用类型公有方法的存储

#### 源码：

	class2type = {},
	core_deletedIds = [],
	core_version = "1.9.0",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

#### 等同于：

	core_concat = Array.prototype.concat, 
	......

#### 分析：

这里把js的几个引用类型的原生方法存储下来。本身这些方法的调用方式就有这3种：

	var arr = [];

	1. arr.concat();
	2. core_concat.call(arr);
	3. core_concat.apply(arr);

这里就有两个问题

1. jQuery为什么要先把这些方法存储起来？
2. jQuery为什么要采用方式二或者三，而不直接使用方式一的做法？ 

其实第二个问题就回答了第一个问题。
而关于第二个问题有两个回答：

1. 按第一种方式调用时，首先需要辨别当前实例`arr`的类型是`Array`，在内存空间中寻找`Array`的`concat`内存入口，把当前对象`arr`的指针和其他参数压入栈，跳转到`concat`地址开始执行。而当保存了`concat`方法的入口`core_concat`时，完全就可以省去前面两个步骤，从而提升一些性能。
2. `var obj = {};`此时调用`obj.concat`会报错。但是如果采用后两种方式调用的话，能够解决这个问题。 也即是让类数组也能用到数组的方法（这就是`call`跟`apply`带来的另一种用法），尤其在jQuery里边引用一些DOM对象时，也能完美的用这个方法去解决。

### $.trim()

#### 源码：

	core_version = "1.9.0",
	core_trim = core_version.trim,
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
	  function( text ) {
	    return text == null ?
	      "" :
	      core_trim.call( text );
	  } :

	  // Otherwise use our own trimming functionality
	  function( text ) {
	    return text == null ?
	      "" :
	      ( text + "" ).replace( rtrim, "" );
	  }

#### 等同于：

	 trim: if (String.prototype.trim && "\uFEFF\xA0".trim() !== "") {
	 	//直接调用原生String的trim方法
	 } else {
	 	//使用正则表达式和replace方法替换前尾的空格
	 }

#### 分析：

如果浏览器原生支持`String`的`trim`方法，并且能够解析全角空格，那么就直接使用原生的`trim`方法

> `\uFEFF`是utf8的字节序标记，`\xA0`是全角空格

如果以上条件成立，那就直接用原生的trim函数:

	$.trim = function( text ) {
	    return text == null ?
	        "" :
	        text.trim();
	}

如果上述条件不成立，那就自己实现一个`trim`方法：

	$.trim = function( text ) {
	    return text == null ?
	        "" :
	        ( text + "" ).replace( rtrim, "" );
	}

### $.each()

#### 源码：

	$.each = function( obj, callback, args ) {
	  //obj 是需要遍历的数组或者对象
	  //callback是处理数组或对象的每个元素的回调函数，它的返回值实际会中断循环的过程

	  var value,
	    i = 0,
	    length = obj.length,
	    //判断是不是数组
	    isArray = isArraylike( obj );

	  if ( args ) {
	    if ( isArray ) {
	      for ( ; i < length; i++ ) {
	        value = callback.apply( obj[ i ], args );
	        //相当于: args = [arg1, arg2, arg3];
	        //callback(args1, args2, args3)。然后callback里边的this指向了obj[i]

	        if ( value === false ) {
	          //注意到，当callback函数返回值会false的时候，注意是全等！循环结束
	          break;
	        }
	      }
	    } else {
	      for ( i in obj ) {
	        value = callback.apply( obj[ i ], args );

	        if ( value === false ) {
	          break;
	        }
	      }
	    }

	  // A special, fast, case for the most common use of each
	  } else {
	    if ( isArray ) {
	      for ( ; i < length; i++ ) {
	        value = callback.call( obj[ i ], i, obj[ i ] );
	        //相当于callback(i, obj[i])。然后callback里边的this指向了obj[i]

	        if ( value === false ) {
	            break;
	          }
	        }
	      } else {
	        for ( i in obj ) {
	          value = callback.call( obj[ i ], i, obj[ i ] );

	          if ( value === false ) {
	            break;
	          }
	        }
	      }
	    }

	  return obj;
	}

#### 等同于：

	//for in对于数组来说性能比较低而且存在某些bug
	//这里只是希望用更简洁的代码来减少原先代码的重复性
	$.each = function( obj, callback, args ) {
	  var value,
	    i = 0,
	    length = obj.length;

	  for ( i in obj ) {
	    value =
	      args ?
	      callback.apply( obj[ i ], args ) :
	      callback.call( obj[ i ], i, obj[ i ] );

	    if ( value === false ) {
	      break;
	    }
	  }
	  return obj;
	}

#### 分析：

看这两个例子

	$.each([1,2,3], function(key, value){
	  console.log("[" + key + "]=" + value);
	  return false;
	});
	//输出：
	[0]=1
	//原数组结果：
	[1,2,3]

`$.each()`接受2个参数， 数组[1,2,3],回调函数
可以看到回调函数具有两个参数，`key`是数组的索引，`value`是对应的元素

	$.each([1,2,3], function(arg1, arg2){
	  console.log(this + "," + arg1 + "," + arg2);
	  return ;
	}, [4, 5]);
	//输出：
	1,4,5
	2,4,5
	3,4,5
	//原数组结果：
	[1,2,3]

`$.each()`接受3个参数， 数组[1,2,3],回调函数，一个额外的参数数组`args`=[4,5]
可以看到回调函数的两个参数就是`$.each()`的第三个参数`args`，在函数里边的`this`就是遍历元素自己

对比上述二者也可以看到，当回调函数`return false`后就跳出循环，遍历不再执行

### $.inArray()

#### 源码：

	core_deletedIds = [],
	core_indexOf = core_deletedIds.indexOf,

	//elem 规定需检索的值。
	//arr 数组
	//i 可选的整数参数。规定在数组中开始检索的位置。它的合法取值是 0 到 arr.length - 1。如省略该参数，则将从数组首元素开始检索。
	inArray: function( elem, arr, i ) {
	  var len;

	  if ( arr ) {
	    //原生的Array对象支持indexOf方法，直接调用
	    if ( core_indexOf ) {
	      return core_indexOf.call( arr, elem, i );
	    }

	    len = arr.length;
	    i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

	    for ( ; i < len; i++ ) {
	      if ( i in arr && arr[ i ] === elem ) {
	        return i;
	      }
	    }
	  }

	  //全部都不符合，返回-1
	  return -1;
	},

#### 分析：

    i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

当i为负数时，从数组后边len+i的位置开始索引

	for ( ; i < len; i++ ) {
		if ( i in arr && arr[ i ] === elem ) {
		return i;
		}
    }

这里的`(i in arr)`判断是为了跳过稀疏数组中的元素
例如 `var arr = []; arr[2] = 1;`
此时 `arr == [undefined, undefined, 1]`
结果是 => 

* `(0 in arr == false)` 
* `(1 in arr == false)` 
* `(2 in arr == true)`

另外（在火狐下）测试得：

	var arr = [undefined, 1]; 

输出是： 

	arr == [undefined, 1] 
	0 in arr == true; 
	arr.indexOf(undefined) == 0; 
	arr[0] == undefined; 

但是如果是以下代码： 

	var arr = []; 
	a[1] = 1; 

输出是： 

	arr == [undefined, 1] 
	0 in arr == false; 
	arr.indexOf(undefined) == -1; 
	arr[0] == undefined;

所以`(i in arr)`也是必要的。

### $.grep()

#### 源码：

	grep: function( elems, callback, inv ) {
		var retVal,
		ret = [],
		i = 0,
		length = elems.length;
		//转成布尔型
		inv = !!inv;

		// Go through the array, only saving the items that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			//注意这里的callback参数是先value,后key
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	}

用例：

	$.grep( [0,1,2], function(n,i){
	  return n <= 0;
	});
	//结果是：[0] 

	$.grep( [0,1,2], function(n,i){
	  return n <= 0;
	}, true);
	//结果是：[1, 2]

****

参考链接
* [jQuery源码剖析（一）——概览&工具方法](https://www.w3ctech.com/topic/256)

