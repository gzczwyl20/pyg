$(function () {
  

  $.get('goods/detail',{
    goods_id:$.getUrl('goods_id')
  },function(res){
    console.log(res);
    var html = template('mainTpl',{data:res.data})
    $('.pyg_view').html(html)
    //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
  });
  },'json')
})