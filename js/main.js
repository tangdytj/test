window.onload=function(){

var banner=document.getElementById("banner");//获取container
var list=document.getElementById("banner_list");//获取图片列表；
var buttons=document.getElementById("slideBtn").getElementsByTagName("span");//获取图片切换圆点按钮；
var pre=document.getElementById("prev");//获取向左切换箭头
var next=document.getElementById("next");//获取向右切换箭头； 


var index=1;//第一张播放图片的下标
var animated=false;//优化动画执行效果，只有当前切换动画未执行时，才能被执行。解决当前动画执行未完成时，多次点击切换按钮导致的页面卡图现象，初始值为false

pre.onclick=function(){
        //切换到当前图片左边的图片，如果当前是第一张，会切换到最后一张
        if(index==1){
            index=3;
        }
        //否则会切换到前一张，即index-1
        else{
            index-=1;    
        }
        //每次点击时，判断animated为false时执行切换
        if(!animated){
            animate(500);    
        }
        
        //设置当前圆点按钮样式切换到选中状态，其他圆点为未选中状态
        showBtn();
    }
next.onclick=function(){
        //切换到当前图片右边的图片，如果当前是最后一张，会切换到第一张
        if(index==3){
            index=1;
        }
        //否则会切换到下一张，即index+1
        else{
            index+=1;    
        }
        //每次点击时，判断animated为false时执行动画
        if(!animated){
            animate(-500);    
        }
        //改变图片样式
        showBtn();
    }
    
    
//将偏移的动作封装到函数animate()中
function animate(offset){ 
    animated=true;//调用animate()切换时设置为true;
    var newleft=parseInt(list.style.left)+offset;//偏移之后的位置
    var time=500;//位移总时间
    var interval=10;//位移间隔时间
    var speed=offset/(time/interval);//每次位移量 =总偏移量/次数

function go(){//递归，在函数内部调用自身实现入场图片500ms淡入的效果            
   //判断偏移量是否达到了目标值，如果没有，在原来的基础上继续移动
        if((speed<0 && parseInt(list.style.left)>newleft)||(speed>0 && parseInt(list.style.left)<newleft)){
            list.style.left=parseInt(list.style.left) + speed +'px';
            //设置定时器，每隔interval的时间调用一下go()函数
            //setTimeout()函数只会被执行一次
            setTimeout(go,interval);
        }
        //如果达到了目标值，就将newleft值设置为目标值，
        else{
            animated=false;//切换结束，设置为false;

            //获取当前图片的left值：用list.style.left获取left的字符串，需要parseInt()函数将字符串转换为数值
            list.style.left = newleft+'px';
            
           //设置无缝切换
            if( newleft > -500 ){
                list.style.left='-1500px';
            }
            if( newleft < -1500){
                list.style.left='-500px';
            }
        }
    } 
    go();//调用animate()时执行go()函数 

}

//将圆点按钮样式
    function showBtn(){
        //遍历圆点按钮数组
        for(var i=0;i<buttons.length;i++){
            var button=buttons[i];
            //取消之前按钮设置的active状态
            if(button.className == 'active'){
                button.className='';
                break;
            }
        }
        //设置当前图片对应的圆点按钮状态为active
        buttons[index-1].className='active';
    }

for(var i=0;i<buttons.length;i++){
        var button=buttons[i];
        button.onclick=function(){
           //点击active状态按钮，不做任何操作
            if(this.className=='active'){
                return;
            }
        //点击按钮，跳转指定图片
            var myIndex=parseInt(this.getAttribute('index'));//根据点击按钮index计算出偏移量
            var offset=-500 * (myIndex-index);//算出偏移量
            if(!animated){
                animate(offset);
            } 
            index=myIndex;
            showBtn();
        }
    }
    
 var timer;//设置自动播放的定时器
    function play(){
           //默认状态是2s点击右箭头
            timer=setInterval(function(){ 
                next.onclick(); 
            },2000);
        }
        function stop(){
            //暂停自动播放
            clearInterval(timer);
        }
    
        banner.onmouseover=stop;//鼠标悬停某张图片，则暂停切换；
        banner.onmouseout=play;//鼠标移除时，继续自动切换；
    //初始化执行自动播放
        play();
        
    }
