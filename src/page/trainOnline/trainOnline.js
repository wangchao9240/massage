$(document).ready(function() {
  // 页面加载进来时先向服务器请求数据
  $.ajax({
    url: 'trainOnline.json',
    type: 'GET',
    success: function(data) {
      data.forEach(function(item) {
        // 根据模版生成“在线培训”的html数据
        var tpl = '<li class="border-1px">' +
                    '<img src="' + item.src + '" width="110" height="74" alt="trainOnline" class="thumbImg">' +
                    '<div class="abstract">' +
                      '<h3 class="title">' + item.title + '</h3>' +
                      '<span class="time">' + item.time + '</span>' +
                    '</div>' +
                  '</li>';
        $(tpl).appendTo($('.wrapper'));
      });
    }
  });
});