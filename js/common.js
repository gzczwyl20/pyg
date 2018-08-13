$(function () {
  var BaseUrl = 'http://api.pyg.ak48.xyz/';
  template.defaults.imports.iconUrl = BaseUrl;
  var ajaxNum = 0;
  $.ajaxSettings.beforeSend = function (xhr, obj) {
    ajaxNum++;
    obj.url = BaseUrl + 'api/public/v1/' + obj.url;
    $('body').addClass('wait');
  }
  $.ajaxSettings.complete = function () {
    ajaxNum--;
    if (ajaxNum == 0) {
      $('body').removeClass('wait');
    }
  }
  //拓展进zepto中 获取url中的参数
  $.extend($, {
    getUrl: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    checkPhone: function (phone) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
      } else {
        return true;
      }
    },
    checkEmail: function (myemail) {　　
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (myReg.test(myemail)) {　　　　
        return true;　　
      } else {　　　　
        return false;
      }
    }
  })
})