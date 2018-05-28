//封装document.gerElementById
function byId(id) {
  return typeof(id) === "string" ? document.getElementById(id) : id;
}

var index = 0,
  timer = null,
  pics = byId("banner").getElementsByTagName("div"),
  dots = byId('dots').getElementsByTagName('span'),
  len = pics.length,
  prev = byId("prev"),
  next = byId("next"),
  menu = byId("menu-content"),
	subMenu = byId("sub-menu"),
	innerBox = subMenu.getElementsByClassName("inner-box"),
  menuItems = menu.getElementsByClassName("menu-item");

function slideImg() {
  var main = byId("main");
  //划过清除定时器，离开继续
  main.onmouseover = function() {
    //划过清除定时器
    if (timer) clearInterval(timer);

  }
  main.onmouseout = function() {
    timer = setInterval(function() {
      index++;
      if (index >= len) {
        index = 0;
      }
      //切换图片
      changeImg();
    }, 3000);
  }

  main.onmouseout();

  //点击圆点切换图片
  for (var d = 0; d < dots.length; d++) {
    dots[d].id = d;
    dots[d].onclick = function() {
      index = this.id;
      changeImg();
    }
  }

  //下一张
  next.onclick = function() {
    index++;
    if (index >= len) {
      index = 0;
    }
    changeImg();
  }

  //上一张
  prev.onclick = function() {
    index--;
    if (index < 0) index = len - 1;
    changeImg();
  }

  for (var m = 0; m < menuItems.length; m++) {
    menuItems[m].setAttribute("data-index", m);

    menuItems[m].onmouseover = function() {
      var idx = this.getAttribute("data-index");
			for(var n=0;n<innerBox.length;n++){
				innerBox[n].style.display = 'none';
			}
			subMenu.className = 'sub-menu';
			innerBox[idx].style.display = 'block';
    }
  }
menu.onmouseout = function(){
	subMenu.className = 'sub-menu hide';
}

subMenu.onmouseover = function(){
	this.className = 'sub-menu';
}

subMenu.onmouseout = function(){
	this.className = 'subMenu hide';
}

}
//切换图片
function changeImg() {
  //遍历banner，将所有div隐藏
  for (var i = 0; i < len; i++) {
    pics[i].style.display = 'none';
    dots[i].className = ' ';
  }
  pics[index].style.display = 'block';
  dots[index].className = 'active';
}

slideImg();
