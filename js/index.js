$(function () {
  init();
  function init() {
    getSwiperData();
  }

  // 获取首页轮播图数据
  function getSwiperData() {
    // http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata
    $.get('http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata',function(res){
      // console.log(res);
      var swiperdata = template('swiperdata',{data:res.data})
      $('.pyg_view').html(swiperdata);
      var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    },'json')
  }
})