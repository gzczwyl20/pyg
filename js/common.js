$(function(){
  var BaseUrl = 'http://api.pyg.ak48.xyz/';
  template.defaults.imports.iconUrl = BaseUrl;
  $.ajaxSettings.beforeSend=function (xhr,obj) {
    obj.url = BaseUrl +'api/public/v1/' + obj.url;
  }
})