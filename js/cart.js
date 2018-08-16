$(function () {
  init();

  function init() {
    if (!localStorage.getItem('userInfo')) {
      mui.toast('请先登录')
      $.setPage()
      location.href = '/pages/login.html'
      return
    }
    $('body').addClass('now');
    
    getData();
    //增加减少商品改变总价
    $('.pyg_cart').on('tap', 'button', function () {
      // console.log(123);
      count();
    })
    //编辑按钮
    $('.update').on('tap', function () {
      // console.log(123);
      $('body').toggleClass('active')
      if ($('body').hasClass('active')) {
        $(this).text('完成')
      } else {
        $(this).text('编辑')
      }

    })
  }
  // 删除按钮
    $('.del_btn').on('tap',function(){
      // console.log(123);
      var chks =$('.pyg_cart input[name=checkbox1]:checked')
      // console.log(chks);
      
      if(chks.length == 0){
        mui.toast('还没有选中商品')
        return;
      }
      mui.confirm('确定要删除吗？','警告',['确定','取消'],function(e){
        // console.log(e.index);
        
         if(e.index == 0){
          var lis = $('.pyg_cart input[name=checkbox1]').not(':checked').parents('li')
          // console.log(lis);
          var infos = {};
          for (var i = 0; i < lis.length; i++) {
            // var info = lis[i].dataset.info;
            var info = $(lis[i]).data('info');
            infos[info.goods_id]=info
          }
          // console.log(infos);
          $.ajax({
            url:'my/cart/sync',
            type:'post',
            data:{
              infos:JSON.stringify(infos)
            },
            headers:{
              Authorization: $.token()
            },
            success:function(res){
              console.log(res);
              
              if(res.meta.status == 200){
                mui.toast('删除成功')
                getData();
              }else{
                mui.toast('删除失败')
              }
            }
          })
                   
         } 
      })
      
    })
  // 计算总价
  function count() {
    var lis = $('.pyg_cart ul li')
    // console.log(lis);
    var price = 0;
    for (var i = 0; i < lis.length; i++) {
      var info = JSON.parse(lis[i].dataset.info);
      var goods_price = info.goods_price;
      // console.log(goods_price);
      var num = $(lis[i]).find('.num').val()
      // console.log(num);
      price += goods_price * num
    }
    // console.log(price);
    $('.price').text(price);

  }

  //数据渲染
  function getData() {
    $.ajax({
      url: 'my/cart/all',
      dataType: 'json',
      headers: {
        Authorization: $.token()
      },
      success: function (res) {
        console.log(res);
        if (res.meta.status == 401) {
          setPage()
          location.href = '/pages/login.html'
          return
        }
        // console.log(JSON.parse(res.data.cart_info));
        if(!res.data.cart_info){
          return;
        } 
        var cart_info = JSON.parse(res.data.cart_info);
        var html = template('mainTpl', {
          data: cart_info
        });
        $('.pyg_cart ul').html(html);
        mui('.mui-numbox').numbox()
        count();
      }
    })
  }
})