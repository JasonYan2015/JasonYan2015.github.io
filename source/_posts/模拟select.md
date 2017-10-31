---

title: 第一次面向对象，把对象Po出来吧
tags: ['js', '模块化', '面向对象']

---

> 面对select这种如此常见的需求，怎么能不写个通用组件呢

<!-- more -->

直接po源码，第一次面向对象，如有任何建议、意见，不胜感激！

	function Select(options) {
	    this.DOMobj = document.querySelector(options.srcNode);
	    this.DOMselect = document.createElement('div');
	    this.DOMoptContainer = document.createElement('ul');
	    this.DOMoptions = {};

	    this.prototype = {
	        //默认样式
	        defaultStyle : {
	            'select': {
	                'position': 'relative',
	                'display': 'inline-block',
	                'width': '200px',
	                'height': '32px',
	                'line-height': '32px',
	                'background-color': '#fff',
	                'text-align': 'center',
	                'box-shadow': '0 0 1px #333',
	                'cursor': 'pointer'
	            },
	            'optContainer': {
	                'margin': '0',
	                'padding': '0',
	                'display': 'none',
	                'list-style': 'none',
	                'position': 'absolute',
	                'z-index': '9999',
	                'width': '200px',
	                'background-color': '#eee',
	                'text-align': 'center',
	                'box-shadow': '0 0 1px #333'
	            },
	            'option': {
	                'margin': '0',
	                'padding': '0',
	                'display': 'inline-block',
	                'list-style': 'none',
	                'width': '200px',
	                'height': '32px',
	                'line-height': '32px',
	                'background-color': '#eee',
	                'color': '#369',
	                'text-align': 'center',
	                'cursor': 'pointer'
	            },
	            'option:hover': {
	                'background-color': '#2477fb',
	                'color': '#fff'
	            }
	        },
	        //给下拉框添加上各选项，同时也作为选择内容框的点击事件
	        setOptions: (function() {
	            var flag = this.DOMselect.getAttribute('data-isOptionShown') === 'true' ? true : false;
	            if(!this.DOMselect.getAttribute('data-isOptionShown')) {
	                this.DOMoptContainer.innerHTML = '';
	                var elemLi = [];

	                for (var p in options.data) {
	                    if (options.data.hasOwnProperty(p)) {
	                        elemLi[p] = document.createElement('li');
	                        elemLi[p].setAttribute('data-value', p);
	                        elemLi[p].setAttribute('data-content', options.data[p]);
	                        elemLi[p].innerHTML = options.data[p];
	                        this.DOMoptContainer.appendChild(elemLi[p]);
	                        elemLi[p].addEventListener('click', this.prototype.handleSelect);
	                    }
	                }

	                this.DOMoptions = this.DOMoptContainer.getElementsByTagName('li');
	                this.DOMselect.setAttribute('data-isOptionShown', false);
	                this.DOMoptContainer.style.display = 'block';
	            } else if(!flag) {
	                this.DOMoptContainer.style.display = 'block';
	                this.DOMselect.setAttribute('data-isOptionShown', true);
	            } else if(flag) {
	                this.DOMoptContainer.style.display = 'none';
	                this.DOMselect.setAttribute('data-isOptionShown', false);
	            }
	        }).bind(this),
	        //每个选项的点击事件
	        handleSelect: (function(e) {
	            var ev = e || window.event;
	            var target = ev.target || ev.srcElement;

	            this.DOMselect.innerHTML = target.innerHTML;
	            this.DOMselect.setAttribute('data-value', target.getAttribute('data-value'));
	            this.DOMselect.setAttribute('data-content', target.getAttribute('data-content'));
	            this.DOMselect.setAttribute('data-isOptionShown', false);

	            this.DOMoptContainer.style.display = 'none';
	            if (options.onChange) {
	                options.onChange(this.DOMselect);
	            }
	        }).bind(this),
	        //更新样式入口
	        updateStyle: (function(str) {
	            var o = {};
	            if (str) {
	                for (var index in str) {
	                    o[index] = Object.assign({}, this.prototype.defaultStyle[index], str[index]);
	                }
	            }
	            o = Object.assign({}, this.prototype.defaultStyle, o);
	            this.prototype.setStyle(o);
	        }).bind(this),
	        //为组件内各个元素添加行内样式
	        setStyle: (function(s) {
	            for(var sKey in s) {
	                if(s.hasOwnProperty(sKey)) {
	                    var str = '';
	                    switch (sKey) {
	                    case 'root': {
	                        Object.assign(this.DOMobj.style, s[sKey]);
	                        break;
	                    }
	                    case 'select': {
	                        Object.assign(this.DOMselect.style, s[sKey]);
	                        break;
	                    }
	                    case 'optContainer': {
	                        Object.assign(this.DOMoptContainer.style, s[sKey]);
	                        break;
	                    }
	                    case 'option': {
	                        for (var i = 0; i < this.DOMoptions.length; i++) {
	                            Object.assign(this.DOMoptions[i].style, s[sKey]);
	                        }
	                        break;
	                    }
	                    case 'option:hover': {
	                        var self = this;
	                        for (var j = 0; j < this.DOMoptions.length; j++) {
	                            this.DOMoptions[j].onmouseover = function(event) {
	                                var obj = Object.assign({}, self.prototype.defaultStyle.option, self.prototype.defaultStyle['option:hover'], options.style ? Object.assign({}, options.style['option'], options.style['option:hover']) : null);
	                                Object.assign(event.target.style, obj);
	                            };
	                            this.DOMoptions[j].onmouseout = function(event) {
	                                var obj = Object.assign({}, self.prototype.defaultStyle.option, options.style ? options.style.option : null);
	                                Object.assign(event.target.style, obj);
	                            };
	                        }
	                        break;
	                    }
	                    }
	                }
	            }
	        }).bind(this),
	        //鼠标离开选项区选项消失，mouseleave事件
	        loseFocus: (function(event) {
	            var ev = event || window.event;
	            var target = ev.target || ev.srcElement;
	            ev.stopPropagation();
	            target.style.display = 'none';

	            this.DOMselect.setAttribute('data-isOptionShown', false);
	        }).bind(this)
	    };

	    //整个组件初始化
	    this.init = function() {
	        //清空并添加空元素div和ul
	        this.DOMobj.innerHTML = '';
	        this.DOMobj.appendChild(this.DOMselect);
	        this.DOMobj.appendChild(this.DOMoptContainer);

	        //div作为选择内容框，添加点击事件
	        var self = this;
	        this.DOMselect.addEventListener('click', function(){self.prototype.setOptions(options.data);}, true);
	        this.DOMoptContainer.addEventListener('mouseleave', self.prototype.loseFocus);
	        //设置默认选中项
	        this.DOMselect.setAttribute('data-value', options.chosen[0]);
	        this.DOMselect.setAttribute('data-content', options.chosen[1]);
	        this.DOMselect.innerHTML = options.chosen[1];

	        this.prototype.setOptions(options.data);
	        this.prototype.updateStyle(options.style);
	    };

	    this.init();
	}