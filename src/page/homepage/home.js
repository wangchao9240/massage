	$("").ready(function(){
		//第一次进入页面时，是首页还是个人中心页
		if(localStorage.homeSwitch === 'true'){//个人中心页显示
			
			$(".container").css('display','none');
			$(".my_contain").css('display','block');
			$(".my img").attr('src','../../assets/14.png');
			$(".yuyue img").attr('src','../../assets/13.png');
			$("footer ul li").css('color','#a3a3a3');
			$('.my').css('color','#f27c7c');
			
		}else{
			
			$(".container").css('display','block');
			$(".my_contain").css('display','none');
			$(".my img").attr('src','../../assets/12.png');//底部图标的变化
			$(".yuyue img").attr('src','../../assets/10.png');
			$("footer ul li").css('color','#a3a3a3');
			$(".yuyue").css('color','#f27c7c');
			
		}
		
		//				轮播图
		$.ajax({
            url:"banner.json",
            type:"get",
            dataType:"json",
            success: function(data){
                $(data).each(function(i) {
                    //console.log(this.url);
                    $(".swiper-wrapper").append("<li class='swiper-slide'><a href='#'><img src="+this.url+" /></a></li>");
	
                });
                
                var swiper = new Swiper('.swiper-container', {
			        pagination: '.swiper-pagination',
			        nextButton: '.swiper-button-next',
			        prevButton: '.swiper-button-prev',
			        paginationClickable: true,
			        spaceBetween: 0,
			        centeredSlides: true,
			        autoplay: 3000,
			        autoplayDisableOnInteraction: false,
			        loop:true
			    });
//	                // 轮播图插件
//					$('.flexslider').flexslider({
//				        animation: "slide",
//				        slideshowSpeed: 3000,
//				        touch: true, //是否支持触屏滑动
//				        pauseOnHover: true,
//				        //触屏滑动后继续自动轮播
//				        before: function(slider) {
//				           // slider.pause();
//				            slider.play();
//				        }
//	  				});


            },
            error: function() {
     		alert('失败');
			}
        });

			
//			症状选择
			 var arr=[];
			
			$.ajax({
                url:"zhengZhuang.json",
                type:"get",
                dataType:"json",
                success: function(data){
                    //console.log(data);
               		for(var i=0;i<3;i++){
               			$(".choose").append("<div class='choose_row'></div>");
               			for(var j=0;j<3;j++){
               				var num=i*3+j;
               				$(".choose_row").last().append("<div class='li_svg1' zhengzhuangID="+num+"><img src='"+data[num].url+"'/><span>"+data[num].zhengZhuang+"</span></div>");
               			}
               		}

					//判断安卓还是苹果
					var ua = navigator.userAgent.toLowerCase();	
					if(/android/.test(ua)) {
						$('.li_svg1').removeClass('li_svg1').addClass('li_svg3');
					}
//					点击选中或者取消
             	$(".choose_row div").click(function() {
             		
					if (/iphone|ipad|ipod/.test(ua)) {  //苹果机
	             		var reg1 = /li_svg1/;
	             		var reg2 = /li_svg2/;
	             		//如果类名里有li_svg1，移除li_svg1，添加li_svg2
	         			if(reg1.test($(this)[0].className)){ 
	         				//alert($(this).attr("zhengzhuangID"));
	         				//往数组里添加对应的点击元素的id
	         				arr.push($(this).attr("zhengzhuangID"));
	         				$(this).removeClass('li_svg1').addClass('li_svg2');
	         			}else if(reg2.test($(this)[0].className)){
	         				
	         				//arr.pop($(this).attr("zhengzhuangID"));
	         				//删除数组里对应的点击元素的id
	         				for(var i in arr){
	         					if($(this).attr("zhengzhuangID")==arr[i]){
	         						//alert(i);
	         						arr.splice(i,1);
	         					}
	         				}
	         				$(this).removeClass('li_svg2').addClass('li_svg1');            				
	         			}
					} else if (/android/.test(ua)) { //安卓机
						
						//alert($(this)[0].className);
						if($(this)[0].className == 'li_svg3'){
	         				arr.push($(this).attr("zhengzhuangID"));
	         				$(this).removeClass('li_svg3').addClass('li_svg4');
	         			}else if($(this)[0].className == 'li_svg4'){
	         				//arr.pop($(this).attr("zhengzhuangID"));
	         				for(var i in arr){
	         					if($(this).attr("zhengzhuangID")==arr[i]){
	         						//alert(i);
	         						arr.splice(i,1);
	         					}
	         				}
	         				$(this).removeClass('li_svg4').addClass('li_svg3');            				
	         			}
					}
      	        
				});
				
				
				//判断边是否可以小于一像素,如果小于的话加类名hairlines	
				if (window.devicePixelRatio && devicePixelRatio >= 2) { //设备像素比
				  var testElem = document.createElement('div');
				  testElem.style.border = '.5px solid transparent';
				  document.body.appendChild(testElem);
					//console.log('11111---->', $('.li_svg1'));
				  if (testElem.offsetHeight == 1)
				  {
					$('.li_svg1').addClass('hairlines');
					$('.li_svg2').addClass('hairlines');
				  }
				  document.body.removeChild(testElem);
				}
			
                },
                error: function() {
         			alert('失败');
   				}
            });
        //在线预约按钮    
        $(".checkbt").click(function() {
		    // --------------------------->>>>>>>>>>ajax post数据
			if(arr.length>0){
			localStorage.diseases=arr;
			window.location.href="../appointment/appointment.html";
		
  	        }else{
  	        	alert("请选择症状");
  	        }
	    });	    
        //公司介绍、专家介绍、线上培训
		$.ajax({
        url:"company.json",
        type:"get",
        dataType:"json",
        success: function(data) {
        	console.log(data);
       		$(data).each(function() {
       			$('.show_ul').append("<li><a href=''><img src='"+this.url+"'/><span>"+this.detail+"</span></a></li>");
       		});
       		$('.show_ul li').eq(0).find("a").attr('href',"##");
       		$('.show_ul li').eq(1).find("a").attr('href',"../expertList/expertList.html");
       		$('.show_ul li').eq(2).find("a").attr('href',"../trainOnline/trainOnline.html");
        },
        error: function() {
 		alert('失败');
		}
    	});    
		
  	        	
//		个人中心头像和昵称
		$.ajax({
                url:"myname.json",
                type:"get",
                dataType:"json",
                success: function(data) {
                	//console.log(data);
               		$(".my_touxiang").attr('src',data.img);
               		$(".my_name").html(data.name);
                },
                error: function() {
         		alert('失败');
   				}
            });
			
//			跳转页面
			
			$(".my_icon").click(function() {
				window.location.href="../personalInfo/personalInfo.html";
			});
			
//			底部
			
			$(".yuyue").click(function() {
				$(".my img").attr('src','../../assets/12.png');//底部图标的变化
				$(".yuyue img").attr('src','../../assets/10.png');
				$("footer ul li").css('color','#a3a3a3');
				$(this).css('color','#f27c7c');
				
				$(".container").css('display','block');
				$(".my_contain").css('display','none');
				
				$("html,body").animate({scrollTop:0}, 1);
				
				localStorage.homeSwitch='false'; 
			});
			$(".my").click(function() {
				$(".my img").attr('src','../../assets/14.png');
				$(".yuyue img").attr('src','../../assets/13.png');
				$("footer ul li").css('color','#a3a3a3');
				$(this).css('color','#f27c7c');
				
				$(".container").css('display','none');
				$(".my_contain").css('display','block');
				$("html,body").animate({scrollTop:0}, 1);
				
				localStorage.homeSwitch='true'; 
			});
			
	
			});
			

