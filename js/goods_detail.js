$(function () {
  var goodsObj;

  $.get('goods/detail',{
    goods_id:$.getUrl('goods_id')
  },function(res){
    // console.log(res);
    goodsObj = res.data
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
    //商品的对象
    var GoodsObj = {
      cat_id:goodsObj.cat_id,
      goods_id:goodsObj.goods_id,
      goods_name:goodsObj.goods_name,
      goods_price:goodsObj.goods_price,
      goods_weight:goodsObj.goods_weight,
      goods_small_logo:goodsObj.goods_small_logo
    }
    // $.post('my/cart/add',{
    //   info:JSON.stringify(GoodsObj)
    // },function(res){
    //   console.log(res);
    //   sessionStorage.setItem('pageName',location.href)
    //   if(res.meta.status == 401){
    //     mui.toast('未登录')
    //     setTimeout(() => {
    //       location.href = '/pages/login.html'
    //     }, 1000);
    //   }
    // },'json')
    $.ajax({
      url:'my/cart/add',
      type:'post',
      data:{info:JSON.stringify(GoodsObj)},
      headers:{
        Authorization:JSON.parse(localStorage.getItem('userInfo')).token
      },
      success:function(res){
        console.log(res);
      if(res.meta.status == 401){
        sessionStorage.setItem('pageName',location.href)
        mui.toast('未登录')
        setTimeout(() => {
          location.href = '/pages/login.html'
        }, 1000);
      }else if(res.meta.status == 200) {
        mui.confirm('是否跳转到购物车页面','添加成功',['跳转','取消'],function(e){
          console.log(e);
          if(e.index==0){
            setTimeout(() => {
              location.href = '/pages/cart.html'
            }, 1000);
          }
        })
      }
      }
    })
  })
})