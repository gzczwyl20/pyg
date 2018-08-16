$(function(){
  init()
  function init(){
    if (!localStorage.getItem('userInfo')) {
      mui.toast('请先登录')
      $.setPage()
      location.href = '/pages/login.html'
      return
    }
    $.ajax({
      url:'my/orders/all',
      data:{
        type:1
      },
      headers: {
        Authorization: $.token()
      },
      success:function(res){
        console.log(res);
        if(res.meta.status == 200){
          var html = template('mainTpl',{data:res.data})
          $('#item1 ul').html(html)
        }
      }
    })
  }
})