window.onload = function(){
    setTimeout(getpre, 1000);
    timer = setInterval(getpre, 3000);
    var pics = new Array();
    var dots = new Array();
    var banner = document.getElementById('banner');

    const picturesNum = 8; // 图片数量, 用于循环, 请根据实际图片数量修改

    for(var i = 1; i <= picturesNum; i++){
        var lbli = document.createElement('li');
        var lbimg = document.createElement('img');

        lbimg.src = "/assets/img/index/album/pic" + i + ".png";

        lbli.appendChild(lbimg);

        banner.appendChild(lbli);
        pics.push(lbli);
        pics[pics.length - 1].style.left = "0px";

        lbimg.onmouseenter = function(){
            clearInterval(timer);
        }
        lbimg.onmouseleave = function(){
            timer=setInterval(getpre,3000);
        }    
        var bottomdot = document.createElement("div");
        bottomdot.className = "dot";
        bottomdot.name = i;
        dots.push(bottomdot);
        document.getElementById('dots-container').appendChild(bottomdot);

        lbli.id = i;
        
    }

    var len = pics.length - 1;
    pics[len-2].style.left = "0px";
    pics[len-2].style.opacity = 0.5;
    pics[len-3].style.opacity = 0;
    pics[len-4].style.opacity = 0;
    pics[len-1].style.zIndex = 100;
    pics[len-1].style.left = "200px";
    pics[len-1].style.transform = "scale(1.3)";
    pics[len-1].style.opacity = 1;
    pics[len].style.left = "400px";
    pics[len].style.opacity = 0.5;



function getnext() {
    var give_up = pics[len];
    pics.pop();
    pics.unshift(give_up);
    for(var i = 0; i < pics.length; i++){
        pics[i].style.zIndex = i;
        pics[i].style.transform = "scale(1)";
    }
    pics[len - 2].style.left = "0px";
    pics[len - 2].style.opacity = 0.5;
    pics[len - 3].style.opacity = 0;
    pics[len - 4].style.opacity = 0;
    pics[len - 1].style.zIndex = 100;
    pics[len - 1].style.left = "200px";
    pics[len - 1].style.transform = "scale(1.3)";
    pics[len - 1].style.opacity = 1;
    pics[len].style.left = "400px";
    pics[len].style.opacity = 0.5;

    dotmov();
    pics[len - 2].onclick = function(){
        getnext();
    }
    pics[len].onclick = function(){
        getpre();
    }
}

function getpre(){
    var give_up = pics[0];
    pics.push(give_up);
    pics.shift();
    for(var i = 0; i < pics.length; i++){
        pics[i].style.zIndex = i;
        pics[i].style.transform = "scale(1)";
    }
    pics[len - 2].style.left = "0px";
    pics[len - 2].style.opacity = 0.5;
    pics[len - 3].style.opacity = 0;
    pics[len - 4].style.opacity = 0;
    pics[len - 1].style.zIndex = 100;
    pics[len - 1].style.left = "200px";
    pics[len - 1].style.transform = "scale(1.3)";
    pics[len - 1].style.opacity = 1;
    pics[len].style.left = "400px";
    pics[len].style.opacity = 0.5;
    dotmov();
    pics[len - 2].onclick = function(){
        getnext();
    }
    pics[len].onclick = function(){
        getpre();
    }
    
}

dots[0].style.background = "rgb(48, 72, 77)";
function dotmov() {
    for(var i = 0 ;i < dots.length; i++){
        if (dots[i].name == pics[len - 1].id) {
            dots[i].style.background = "rgb(48, 72, 77)";
        }
        else {
            dots[i].style.background = "rgb(123, 168, 175)";
        }
    }
}

}