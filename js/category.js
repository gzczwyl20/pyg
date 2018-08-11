$(function () {
  init();
  var leftscroll;
  var rightscroll;
  function init() {
    setHTML();
    getCategories(function (res) {
      // console.log(res);
      var leftHtml = template('left', {
        data: res.data
      });
      $('.view_title').html(leftHtml);
      leftscroll = new IScroll('.left');
    });
    getCategories(function (res) {
      // console.log(res.data[0].children);

      var rightHtml = template('right', {
        data: res.data[0].children
      })
      $('.right_box').html(rightHtml);
      var nums = $('.right img').length
      $(".right img").on("load", function () {
        nums--;
        if(nums==0){
          rightscroll = new IScroll('.right');
        }
      })
    })
  }

  function setHTML() {
    // 基础值
    var baseVal = 100;
    // 设计稿的宽度
    var pageWidth = 375;
    // 当前屏幕的宽度
    var scrollWidth = document.querySelector('html').offsetWidth;
    // 要设置的的fontsize
    var fz = scrollWidth * baseVal / pageWidth;
    // 赋值给html
    // console.log(fz);

    document.querySelector('html').style.fontSize = fz + 'px';
  }
  window.onresize = function () {
    setHTML();
  }

  //发送请求 获取数据
  function getCategories(callback) {
    $.get('categories', function (res) {
      callback && callback(res);
    }, 'json')
  }

  // 点击按钮渲染页面
  $('.view_title').on('tap', 'li', function () {
    // console.log(123);
    var val = this.dataset.val;
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    leftscroll.scrollToElement(this);
    // console.log(val);
    getCategories(function (res) {
      // console.log(res.data[0].children);

      var rightHtml = template('right', {
        data: res.data[val].children
      })
      $('.right_box').html(rightHtml);
      var nums = $('.right img').length
      $(".right img").on("load", function () {
        nums--;
        if(nums==0){
          rightscroll = new IScroll('.right');
        }
      })
    })

  })
})