$(function(){
  var BaseUrl = 'http://api.pyg.ak48.xyz/';
  template.defaults.imports.iconUrl = BaseUrl;
  var ajaxNum =0;
  $.ajaxSettings.beforeSend=function (xhr,obj) {
    ajaxNum ++;
    obj.url = BaseUrl +'api/public/v1/' + obj.url;
    $('body').addClass('wait');
  }
  $.ajaxSettings.complete=function(){
    ajaxNum--;
    if(ajaxNum==0){
      $('body').removeClass('wait');
    }
  }
})