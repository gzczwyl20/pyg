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
    console.log(123);

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
        var lis = $('.pyg_cart li')
        if (lis.length == 0) {
          mui.toast('你还没有购买商品')
          return
        }
        var infos = {}
        for (var i = 0; i < lis.length; i++) {
          var obj = $(lis[i]).data('info');
          obj.amount = $(lis[i]).find('.num').val()
          infos[obj.goods_id] = obj
        }
        // console.log(infos);
        $.ajax({
          url: 'my/cart/sync',
          type: 'post',
          data: {
            infos: JSON.stringify(infos)
          },
          headers: {
            Authorization: $.token()
          },
          success: function (res) {
            console.log(res);

            if (res.meta.status == 200) {
              // mui.toast('删除成功')
              getData();
            } else {
              mui.toast('删除失败')
            }
          }
        })
      }

    })
  }
  // 删除按钮
  $('.del_btn').on('tap', function () {
    // console.log(123);
    var chks = $('.pyg_cart input[name=checkbox1]:checked')
    // console.log(chks);

    if (chks.length == 0) {
      mui.toast('还没有选中商品')
      return;
    }
    mui.confirm('确定要删除吗？', '警告', ['确定', '取消'], function (e) {
      // console.log(e.index);

      if (e.index == 0) {
        var lis = $('.pyg_cart input[name=checkbox1]').not(':checked').parents('li')
        // console.log(lis);
        var infos = {};
        for (var i = 0; i < lis.length; i++) {
          // var info = lis[i].dataset.info;
          var info = $(lis[i]).data('info');
          infos[info.goods_id] = info
        }
        // console.log(infos);
        $.ajax({
          url: 'my/cart/sync',
          type: 'post',
          data: {
            infos: JSON.stringify(infos)
          },
          headers: {
            Authorization: $.token()
          },
          success: function (res) {
            console.log(res);

            if (res.meta.status == 200) {
              mui.toast('删除成功')
              getData();
            } else {
              mui.toast('删除失败')
            }
          }
        })

      }
    })

  })

  // 生成订单
  $('.order .right').on('tap', function () {
    // console.log(123);
    // 判断有无数据
    var lis = $('.pyg_cart li')
    if (lis.length == 0) {
      mui.toast('你还没有购买商品')
      return
    }
    var obj = {
      order_price: $('.order .price').text(),
      consignee_addr: '广州天河吉山',
      goods: []
    }
    for (var i = 0; i < lis.length; i++) {
      var info = $(lis[i]).data('info');
      var tmp = {
        goods_id: info.goods_id,
        goods_price: info.goods_price,
        goods_number: $(lis[i]).find('.mui-numbox-input').val()
      }
      obj.goods.push(tmp)
    }
    // console.log(obj);
    $.ajax({
      url: 'my/orders/create',
      type: 'post',
      data: obj,
      headers: {
        Authorization: $.token()
      },
      success: function (res) {
        // console.log(res);
        if (res.meta.status == 200) {
          mui.toast('下单成功')
          setTimeout(() => {
            location.href = '/pages/order.html'
          }, 1000);
        } else {
          mui.toast('下单失败')
        }
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
        // console.log(res);
        if (res.meta.status == 401) {
          setPage()
          location.href = '/pages/login.html'
          return
        }
        // console.log(JSON.parse(res.data.cart_info));
        if (!res.data.cart_info) {
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