 /*倒计时*/
$(document).ready(function () {
        var oDate = new Date();
        var nowTime = oDate.getTime(); //现在的毫秒数
        oDate.setDate(oDate.getDate() + 1); // 设定截止时间为第二天
        var targetDate = new Date(oDate.toLocaleDateString());
        run(targetDate);
    });

    function run(enddate) {
        getDate(enddate);
        setInterval("getDate('" + enddate + "')", 500);
    }

    function getDate(enddate) {
        var oDate = new Date(); //获取日期对象

        var nowTime = oDate.getTime(); //现在的毫秒数
        var enddate = new Date(enddate);
        var targetTime = enddate.getTime(); // 截止时间的毫秒数
        var second = Math.floor((targetTime - nowTime) / 1000); //截止时间距离现在的秒数

        var day = Math.floor(second / 24 * 60 * 60); //整数部分代表的是天；一天有24*60*60=86400秒 ；
        second = second % 400; //余数代表剩下的秒数；
        var hour = Math.floor(second / 3600); //整数部分代表小时；
        second %= 3600; //余数代表 剩下的秒数；
        var minute = Math.floor(second / 60);
        second %= 60;
        var spanH = $('.se-txt')[0];
        var spanM = $('.se-txt')[1];
        var spanS = $('.se-txt')[2];

        spanH.innerHTML = tow(hour);
        spanM.innerHTML = tow(minute);
        spanS.innerHTML = tow(second);
    }

    function tow(n) {
        return n >= 0 && n < 10 ? '0' + n : '' + n;
    }

 /*点击弹出按钮*/
    function popBox() {
        var popBox = document.getElementById("popBox");
        var popLayer = document.getElementById("popLayer");
        popBox.style.display = "block";
        popLayer.style.display = "block";
    };
 
    /*点击关闭按钮*/
    function closeBox() {
        var popBox = document.getElementById("popBox");
        var popLayer = document.getElementById("popLayer");
        popBox.style.display = "none";
        popLayer.style.display = "none";
}

/*轮播图区块*/
    function my$(id) {
        return document.getElementById(id);
    }
 
    //获取各元素，方便操作
    var box=my$("box");
    var inner=box.children[0];
    console.log(inner)
    var ulObj=inner.children[0];
    var list=ulObj.children;
    var olObj=inner.children[1];
    var arr=my$("arr");
    var imgWidth=inner.offsetWidth;
    var right=my$("right");
    var pic=0;


    //根据li个数，创建小按钮
    for(var i=0;i<list.length;i++){
        var liObj=document.createElement("li");
 
        olObj.appendChild(liObj);
        liObj.innerText=(i+1);
        liObj.setAttribute("index",i);
        //为按钮注册mouseover事件
        
        liObj.onmouseenter=function () {
            //先清除所有按钮的
            for (var j=0;j<olObj.children.length;j++){
                olObj.children[j].removeAttribute("class");
            }
            this.className="current";
            pic=this.getAttribute("index");
            animate(ulObj,-pic*imgWidth);

        }
 
    }
 
 
    //设置ol中第一个li有背景颜色
    olObj.children[0].className = "current";
    //克隆一个ul中第一个li,加入到ul中的最后=====克隆
    ulObj.appendChild(ulObj.children[0].cloneNode(true));
 
    var timeId=setInterval(onmouseclickHandle,1000);
    //左右焦点实现点击切换图片功能
    box.onmouseenter = function () {
        arr.style.display="block";
        clearInterval(timeId);
        
    };
    box.onmouseleave = function () {
        arr.style.display="none";
        timeId=setInterval(onmouseclickHandle,1000);
    };
 
    right.οnclick=onmouseclickHandle;
    function onmouseclickHandle() {
        //如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
        //所以,如果用户再次点击按钮,用户应该看到第二个图片
        if (pic == list.length - 1) {
            //如何从第6个图,跳转到第一个图
            pic = 0;//先设置pic=0
            ulObj.style.left = 0 + "px";//把ul的位置还原成开始的默认位置
        }
        pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
        animate(ulObj, -pic * imgWidth);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
        //如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
        if (pic == list.length - 1) {
            //第五个按钮颜色干掉
            olObj.children[olObj.children.length - 1].className = "";
            //第一个按钮颜色设置上
            olObj.children[0].className = "current";
        } else {
            //干掉所有的小按钮的背景颜色
            for (var i = 0; i < olObj.children.length; i++) {
                olObj.children[i].removeAttribute("class");
            }
            olObj.children[pic].className = "current";
        }
    }
    left.onclick=function () {
        if (pic==0){
            pic=list.length-1;
            ulObj.style.left=-pic*imgWidth+"px";
        }
        pic--;
        animate(ulObj,-pic*imgWidth);
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
        
        //当前的pic索引对应的按钮设置颜色
        olObj.children[pic].className = "current";
    };
    right.onclick = function () {
        if(pic >= list.length -1) {
            pic = 0
            ulObj.style.left = -pic * imgWidth + 'px'
        }
        pic ++
        animate(ulObj, -pic * imgWidth)
        for(var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute('class')
        }
        olObj.children[pic].className = 'current'
    }
    
    //设置任意的一个元素,移动到指定的目标位置
    function animate(element, target) {
        clearInterval(element.timeId);
        //定时器的id值存储到对象的一个属性中
        element.timeId = setInterval(function () {
            //获取元素的当前的位置,数字类型
            var current = element.offsetLeft;
            //每次移动的距离
            var step = 10;
            step = current < target ? step : -step;
            //当前移动到位置
            current += step;
            if (Math.abs(current - target) > Math.abs(step)) {
                element.style.left = current + "px";
            } else {
                //清理定时器
                clearInterval(element.timeId);
                //直接到达目标
                element.style.left = target + "px";
            }
        }, 10);
    }