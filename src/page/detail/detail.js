$(document).ready(function() {
  console.log(getQueryString('code'));
});

// 获取地址栏参数函数，query
function getQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}