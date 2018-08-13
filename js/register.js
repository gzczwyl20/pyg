$(function () {
  init()

  function init() {
    // 获取验证码
    $('#code_btn').on('tap', function () {
      // console.log(123);
      // 接收并去掉前后空格
      var mobile_txt = $.trim($('[name=mobile]').val())
      // console.log(mobile_txt);
      if (!$.checkPhone(mobile_txt)) {
        mui.toast('请输入合法的号码')
        return
      }
      $(this).attr('disabled','disabled')
      var that = $(this);
      $.post('users/get_reg_code', {
        mobile: mobile_txt
      }, function (res) {
        console.log(res.data);
        var times = 6;
        var timeId = setInterval(function(){
          times --; 
          that.text(times+'秒后重新获取')
          if(times == 0){
            clearInterval(timeId);
            that.text('获取验证码').removeAttr('disabled');
          }
        },1000)

      }, 'json')

    })

    // 注册逻辑
    $('.zhuCe').on('tap', function () {
      // console.log(123);
      var mobile_txt = $.trim($('[name=mobile]').val())
      var code_txt = $.trim($('[name=code]').val())
      var email_txt = $.trim($('[name=email]').val())
      var pwd_txt = $.trim($('[name=pwd]').val())
      var pwd2_txt = $.trim($('[name=pwd2]').val())
      var gender_txt = $.trim($('[name=gender]:checked').val())
      //校验手机号
      if (!$.checkPhone(mobile_txt)) {
        mui.toast('请输入合法的号码')
        return
      }
      //校验验证码
      if (code_txt.length != 4) {
        mui.toast('请输入合法的验证码')
        return
      }
      //校验邮箱
      if (!$.checkEmail(email_txt)) {
        mui.toast('请输入合法的邮箱')
        return
      }
      // 校验密码
      if (pwd_txt.length < 6) {
        mui.toast('密码最少为6位数')
        return
      }
      //2次检验密码
      if (pwd2_txt != pwd_txt) {
        mui.toast('2次输入密码必需一致')
        return
      }

      // 发送请求
      $.post('users/reg', {
        mobile: mobile_txt,
        code: code_txt,
        email: email_txt,
        pwd: pwd_txt,
        gender: gender_txt
      }, function (res) {
        // console.log(res);
        if (res.meta.status == 200) {
          mui.toast(res.meta.msg)
          setTimeout(() => {
            location.href = '/pages/login.html'
          }, 1000);
        } else {
          mui.toast(res.meta.msg)
        }

      }, 'json')
    })
  }
})