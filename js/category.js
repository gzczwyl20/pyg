$(function(){
  init();
  function init() {
    setHTML();
    var leftscroll = new IScroll('.left');
  }

  function setHTML(){
    // 基础值
    var baseVal = 100;
    // 设计稿的宽度
    var pageWidth =375;
    // 当前屏幕的宽度
    var scrollWidth = document.querySelector('html').offsetWidth;
    // 要设置的的fontsize
    var fz = scrollWidth*baseVal / pageWidth;
    // 赋值给html
    // console.log(fz);
    
    document.querySelector('html').style.fontSize=fz+'px';
  }
  window.onresize=function(){
    setHTML();
  }
})