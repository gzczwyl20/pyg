$(function () {
  var obj = {
    query: '',
    cid: $.getUrl('cid'),
    pagenum: 1,
    pagesize: 5
  }
  var totalPage;
  // console.log(obj);

  init();

  function init() {
    mui.init({
      pullRefresh: {
        container: ".pyg_view",
        down: {
          auto: true,
          //  触发下拉刷新时自动触发
          callback: function () {
            $('.pyg_view ul').html('');
            obj.pagenum = 1;
            search(function () {
              mui('.pyg_view').pullRefresh().endPulldownToRefresh();
              mui('.pyg_view').pullRefresh().refresh(true);
            })
          }
        },
        up: {
          //  触发上拉刷新时自动触发
          callback: function () {

            if (obj.pagenum >= totalPage) {
              mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
              return;
            } else {
              obj.pagenum++;
              search(function () {
                mui('.pyg_view').pullRefresh().endPullupToRefresh();
              })
            }
          }
        }
      }
    });
    //搜索框失去焦点存储数据
    $('.search input').on('blur', function () {
      // console.log(123);
      var val = $.trim($(this).val());
      if (val == '') {
        return
      }
      // console.log(JSON.parse(localStorage.getItem('history')));
      var arr = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];
      for (var i = 0; i < arr.length; i++) {
        if (val == arr[i]) {
          return;
        }
      }
      // console.log(arr);

      arr.unshift(val);
      localStorage.setItem('history', JSON.stringify(arr))

    })
    // 搜索框获得焦点显示遮罩
    $('.search input').on('focus', function () {
      // console.log(123);
      $('.record').show()
      var arr = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];
      // console.log(arr);

      var str = '<li class="active">'
      for (var i = 0; i < arr.length; i++) {
        str += '<span>' + arr[i] + '</span>'
      }
      str += '</li>'
      // console.log(str);

      $('.record ul').html(str)
    })
    $('.search_btn').on('tap', function () {
      var val = $('.search input').val();

      $.ajax({
        url: 'goods/qsearch',
        data: {
          query: val
        },
        success: function (res) {
          console.log(res);
          if (res.meta.status == 200) {
            if (res.data.length == 0) {
              var html = '没有与该关键字匹配的数据'
            } else {
              var html = template('search', {
                arr: res.data
              })
            }
            $('.record ul').html(html)
          }
        }
      })
    })
    // console.log(val);
    //历史记录点击在文本框中显示
    $('.record ul').on('tap', 'span', function () {
      // console.log(123);
      var val = $(this).text();
      // console.log(val);
      $('.search input').val(val);
      $('.record').hide();
      $.ajax({
        url: 'goods/search',
        data: {
          query: val
        },
        success: function (res) {
          console.log(res);
          totalPage = Math.ceil(res.data.total / obj.pagesize);
          console.log(totalPage);

          var html = template('mainTmp', {
            data: res.data.goods
          })
          $('.pyg_view ul').html(html);
        }
      })


    })
    $('.record ul').on('tap', '.mui-ellipsis', function () {
      // console.log(123);
      var val = $(this).text();
      // console.log(val);
      $('.search input').val(val);
      $('.record').hide();
      $.ajax({
        url: 'goods/search',
        data: {
          query: val
        },
        success: function (res) {
          console.log(res);
          totalPage = Math.ceil(res.data.total / obj.pagesize);
          console.log(totalPage);

          var html = template('mainTmp', {
            data: res.data.goods
          })
          $('.pyg_view ul').html(html);
        }
      })


    })
  }



  //发送请求
  function search(callback) {
    $.get('goods/search', obj, function (res) {
      totalPage = Math.ceil(res.data.total / obj.pagesize);
      console.log(totalPage);

      var html = template('mainTmp', {
        data: res.data.goods
      })
      $('.pyg_view ul').append(html);
      callback && callback();
    }, 'json')
  }

  mui('body').on('tap', 'a', function () {
    window.top.location.href = this.href;
  });
})