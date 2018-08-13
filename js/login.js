$(function () {
  init()

  function init() {
    $('.pyg_btn button').on('tap', function () {
      // console.log(123);
      var mobile_txt = $.trim($('[name=mobile]').val())
      var pwd_txt = $.trim($('[name=pwd]').val())
      // 手机验证
      if (!$.checkPhone(mobile_txt)) {
        mui.toast('请输入合法的号码')
        return
      }
      // 密码验证
      if (pwd_txt.length < 6) {
        mui.toast('密码最少为6位数')
        return
      }
      $.post('login',{
        username:mobile_txt,
        password:pwd_txt
      },function(res){
        console.log(res);
        if(res.meta.status == 200){
          localStorage.setItem('token',res.data.token)
          mui.toast(res.meta.msg)
          setTimeout(() => {
          location.href = '/index.html'
          }, 1000);
        }else {
          mui.toast(res.meta.msg)
        }
      },'json')
    })
  }
})