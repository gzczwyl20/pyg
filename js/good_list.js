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

  mui('body').on('tap','a',function(){
    window.top.location.href=this.href;
});
})