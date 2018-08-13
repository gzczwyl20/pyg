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

  $('.joinCar').on('tap',function(){
    // console.log(123);
    var token = localStorage.getItem('token')
    // console.log(token);
    if(!token){
      mui.toast('请重新登录')
      // console.log(123);
      setTimeout(() => {
      location.href='/pages/login.html'
      }, 1000);
    }else{
      mui.toast('添加购物车成功')
    }
  })
})