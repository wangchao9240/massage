$(document).ready(function() {
  // 请求数据获取用户当前余额
  $.ajax({
    url: 'pay.json',
    type: 'GET',
    success: function(data) {
      console.log(data);
      $('.title .right').html('￥' + data.balance);
    }
  });

  $('ul').delegate('.pay', 'click', function(e) {
    // 找到当前点击的元素，先将所有背景图变为未选中状态，后将
    // 点击的元素背景图片路径改变为选中状态
    $('ul .right').css({
      'background-image': 'url(6.png)'
    });
    var checkBox = $(e.currentTarget).find('.right');
    checkBox.css({
      'background-image': 'url(5.png)'
    });
  });
});