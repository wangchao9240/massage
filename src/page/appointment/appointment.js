/**
  js文件生效时先请求后台数据，将后台数据导入页面中生成数据
**/

// 根据传入的参数不同，生成的html模版内容不同
function getTpl(item) {
  var tpl = '<div class="sumContainer">' +
              '<span class="sum">' + item + '</span>' +
            '</div>';
  return tpl;
}

$(document).ready(function() {
  var myScroll;
  myScroll = new IScroll('.infoWrapper .wrapper');
  // 页面载入时向后台请求基本数据
  $.ajax({
    url: 'appointment.json',
    type: 'GET',
    success: function(data) {
      // 请求来的数据为一个数组，遍历数组，将数据添加到模版中

      // 根据请求来的data数据请求头部信息
      // 头像信息
      $('.avatar').attr('src', data.avatar);
      // 价格信息
      $('.headerDetail .price').html('￥' + data.price);
      // 项目信息
      $('.headerDetail .project').html(data.project);
      // 疾病信息
      $('.headerDetail .disease').html(data.disease);

      // 生成选择技师的html模版
      data.artificer.forEach(function(item) {
        $(getTpl(item)).appendTo($('.chooseContent').first());
      });

      // 生成疗程选择的模版
      data.treatment.forEach(function(item) {
        $(getTpl(item)).appendTo($('.chooseContent').last());
      });

      // 将每个选项组中的第一个默认调整为选中状态
      $('.chooseContent').first().find('.sumContainer').first().addClass('active');
      $('.chooseContent').last().find('.sumContainer').first().addClass('active');

      // 添加介绍信息
      $('.infoWrapper .introduce').html(data.introduce);
      console.log(myScroll);
      myScroll.refresh();
    },
    error: function() {
      alert('网络开小差了..');
    }
  });
  // 选择后背景色及文字的变化效果

  // 点击后，先移除当前所有子元素的样式类，后向点击的对象添加样式类
  $('.chooseContent').delegate('.sumContainer', 'click', function(e) {
    $(e.delegateTarget).find('.sumContainer').removeClass('active');
    $(e.currentTarget).addClass('active');
  });
});