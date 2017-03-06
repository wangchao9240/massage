/**
  js文件生效时先请求后台数据，将后台数据导入页面中生成数据
**/

// 根据传入的参数不同，生成的html模版内容不同
function getTpl(item, index) {
	index++;
	if (index) {
	  var tpl = '<div class="sumContainer" data-id="' + index + '">' +
	              '<span class="sum">' + item + '</span>' +
	            '</div>';
	} else {
		var tpl = '<div class="sumContainer">' +
	              '<span class="sum">' + item + '</span>' +
	            '</div>';
	}
  return tpl;
}

$(document).ready(function() {
  var myScroll;
  // 页面载入时向后台请求基本数据
  $.ajax({
    url: 'appointment.json',
    type: 'GET',
    success: function(data) {
      // 请求来的数据为一个数组，遍历数组，将数据添加到模版中

      // 根据请求来的data数据请求头部信息
      // 头像信息
      $('.avatar').attr('src', data.avatar);
      // 项目、疾病信息
      $('.headerDetail .project').html('小儿推拿&nbsp;&nbsp;' + data.disease);

      // 生成选择技师的html模版
      if(data.artificer) {
        data.artificer.forEach(function(item) {
          $(getTpl(item)).appendTo($('.chooseContent').first());
        });
      } else {
        $('.infoWrapper').first().remove();
      }

      // 生成疗程选择的模版
      data.treatment.forEach(function(item, index) {
        $(getTpl(item, index)).appendTo($('.chooseContent').last());
      });
      // 点击疗程选择时去到元素上的data-id属性并向后台发送数据，更改价格内容
	    $('.chooseContent').last().find('.sumContainer').click(function(e) {
	    	var checkedId = parseInt($(this).attr('data-id')) - 1;
	    	$.ajax({
	    		type:"post",
	    		url:"/price",
	    		data: {
	    			checkedId: checkedId
	    		},
	    		success: function(data) {
	    			$('.price').html(data.price);
	    			localStorage.price = data.price;
	    		}
	    	});
	    });

      // 将每个选项组中的第一个默认调整为选中状态
      $('.chooseContent').first().find('.sumContainer').first().addClass('active');
      $('.chooseContent').last().find('.sumContainer').first().addClass('active');
		  // 点击后，先移除当前所有子元素的样式类，后向点击的对象添加样式类
		  $('.sumContainer').click(function(e) {
		  	$($(this).parent().get(0)).find('.sumContainer').removeClass('active');
		    $(e.currentTarget).addClass('active');
		  });

      // 添加介绍信息
      $('.infoWrapper .introduce').html(data.introduce);
    },
    error: function(err) {
      console.log(err);
      alert('网络开小差了..');
    }
  });

	$('.confirmBtn').click(function() {
		localStorage.price = $('.price').html().replace('￥', "");
		window.location.href = '../account/account.html';
	});
});