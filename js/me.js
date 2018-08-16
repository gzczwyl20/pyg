$(function(){
  init()
  function init(){
    if (!localStorage.getItem('userInfo')) {
      mui.toast('请先登录')
      $.setPage()
      location.href = '/pages/login.html'
      return
    }
    $('body').addClass('pyg_body');
    $.ajax({
      url:'my/users/userinfo',
      headers: {
        Authorization: $.token()
      },
      success:function(res){
        console.log(res);
        if(res.meta.status == 200){
          var html = template('mainTpl',{data:res.data})
          $('.useInfo').html(html)
        }
        
      }
    })

    $('.loginOut button').on('tap',function(){
      // console.log(123);
      mui.confirm('确定退出登录','警告',['确定','取消'],function(e){
        if(e.index==0){
          localStorage.removeItem('userInfo')
          $.setPage()
          location.href='/pages/login.html'
        }
      })
      
    })
  }
})