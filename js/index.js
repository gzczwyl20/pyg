$(function () {
  init();
  function init() {
    getSwiperData();
    getCatitems();
    getGoodslist();
  }

  // 获取首页轮播图数据
  function getSwiperData() {
    // http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata
    $.get('home/swiperdata',function(res){
      // console.log(res);
      var swiperdata = template('swiperdata',{data:res.data})
      $('.index_slider').html(swiperdata);
      var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    },'json')
  }
  //首页导航数据
  function getCatitems() {
    $.get('home/catitems',function(res){
      var Catitems = template('catitems',{data:res.data});
      $('.index_nav').html(Catitems);
    },'json')
  }
  //首页内容渲染
  function  getGoodslist() {
    $.get('home/goodslist',function(res){
      var goodslist = template('goodslist',{data:res.data})
      $('.index_goodsList').html(goodslist);
    },'json')
  }
})