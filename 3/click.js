window.onload = function() {
	var container = document.getElementById("container");
	var list = document.getElementById("list");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1; //小圆点
	var animated = false;
	var timer;

	function showButton() {
		for (var i = 0; i < buttons.length; i++) { //关闭其余小圆点
			if (buttons[i].className == "on") {
				buttons[i].className = "";
				break;
			}
		}
		buttons[index - 1].className = "on";
		//数组第一个为0 所以要减一 className对应class属性
	}

	//方法二 点击箭头切换
	function animate(offset) {
		animated = true;
		//list.style.left=parseInt(list.style.left)+offset+"px";
		var newLeft = parseInt(list.style.left) + offset;

		var time = 300; //位移总时间
		var interval = 10; //位移间隔时间
		var speed = offset / (time / interval); //每次位移量

		function go() {
			if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go, interval); //重复调用 递归
			} else {
				animated = false;
				list.style.left = newLeft + "px";
				if (newLeft > -600) {
					list.style.left = -3000 + "px";
				}
				if (newLeft < -3000) {
					list.style.left = -600 + "px";
				}
				//可以用debugger来测试偏移量
			}
		}
		go();
	}
	//自动播放 定时器
	function play() {
		timer = setInterval(function() {
			next.onclick();
		}, 3000);
	}
	//使自动播放停止
	function stop() {
		clearInterval(timer);
	}

	next.onclick = function() {
		if (index == 5) {
			index = 1;
		} else {
			index += 1;
		}
		showButton();
		if (!animated) {
			animate(-600); //偏移量
		}

	}
	prev.onclick = function() {
		if (index == 1) {
			index = 5;
		} else {
			index -= 1;
		}
		showButton();
		if (!animated) {
			animate(600); //偏移量
		}

	}

	// 				// 方法一 点击箭头切换
	// 				// 点击触发右箭头
	// 				next.onclick=function(){
	// 					list.style.left = parseInt(list.style.left)-600+"px";					
	// 				}//list.style.left是字符串
	// 				// 点击触发左箭头
	// 				prev.onclick=function(){
	// 					list.style.left=parseInt(list.style.left)+600+"px";					
	// 				}

	//点击小圆点切换
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function() {
			//点击同个按钮不执行
			if (this.className == "on") {
				return;
			}
			var myIndex = parseInt(this.getAttribute("index"));
			//getAttribute获取自定义或者自带属性
			var offset = -600 * (myIndex - index);
			index = myIndex;
			showButton(); //添加完按钮才会跟着显示
			if (!animated) {
				animate(offset);
			}

		}
	}

	container.onmouseover = stop; //鼠标移进 停止
	container.onmouseout = play; //鼠标移开 执行

	play();
}
