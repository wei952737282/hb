define(["jq", "text!./tpl/banner/banner.tpl", "css!../css/banner/banner.css"],function($, tpl){
	var imgArr = [];
	$.ajax({
		type:"get",
		url:$.basePath + "frontImageList.action",
		dataType: 'json',
		async:false,
		success:function(img){
			imgArr = [{"image":"./img/index/loop1.jpg","id":9,"type":2,"url":""},{"image":"./img/index/loop2.jpg","id":10,"type":1,"url":""}];
		}
	});
	var tpl = $(tpl);
	for (var i = 0;i < imgArr.length;i++) {
		var html = $('<a href="" target="_blank"><img src=""/></a>');
		if(i == 0){
			html.find("img").css({
				"opacity": 1,
				"zIndex": 8				
			})
		}
		html.attr("href",imgArr[i].url);
		html.find("img").attr("src",imgArr[i].image);
		tpl.find(".banner-box-block-box").before(html);
		var htmlBlocl = $('<div class="banner-box-block"></div>');
		if(i == 0){
			htmlBlocl.css("opacity",1)
		}
		if(i == imgArr.length-1){
			htmlBlocl.css("marginRight",0)
		}
		tpl.find(".banner-box-block-box").append(htmlBlocl)
	}
	var width = 105 * (imgArr.length - 1) + 80;
	tpl.find(".banner-box-block-box").css({
		width:width + "px"
	})
	var index = 0;
	var timer = null;
	clearInterval(timer);
	timer = setInterval(function(){
		if(index == imgArr.length){
			index = 0
		}
		tpl.find(".banner-box-loop").find("img").css({
			"opacity": 0,
			"zIndex": -1		
		})		
		$(tpl.find(".banner-box-loop").find("img")[index]).css({
			"opacity": 1,
			"zIndex": 8
		})
		$(".banner-box-block").css({
			"opacity": 0.5
		})
		$($(".banner-box-block")[index]).css({
			"opacity": 1
		})		
		index++
	}, 3000)
	$("body").on("mouseover", ".banner-box", function(){
		clearInterval(timer);
	})
	$("body").on("mouseout", ".banner-box", function(){
		clearInterval(timer);
		timer = setInterval(function(){
			if(index == imgArr.length){
				index = 0
			}
			tpl.find(".banner-box-loop").find("img").css({
				"opacity": 0,
				"zIndex": -1		
			})		
			$(tpl.find(".banner-box-loop").find("img")[index]).css({
				"opacity": 1,
				"zIndex": 8
			})
			$(".banner-box-block").css({
				"opacity": 0.5
			})
			$($(".banner-box-block")[index]).css({
				"opacity": 1
			})		
			index++
		}, 3000)		
	})
	$("body").on("click", ".banner-box-block", function(){
			tpl.find(".banner-box-loop").find("img").css({
				"opacity": 0,
				"zIndex": -1		
			})		
			$(tpl.find(".banner-box-loop").find("img")[$(this).index()]).css({
				"opacity": 1,
				"zIndex": 8
			})
			$(".banner-box-block").css({
				"opacity": 0.5
			})
			$($(".banner-box-block")[$(this).index()]).css({
				"opacity": 1
			})			
	})
	$(".banner").empty().html(tpl);
	function changeState(bol) {
		//bol 为真时 为轮播状态
		if(bol){
			$(".banner-box-loop").show();
			clearInterval(timer);
			timer = setInterval(function(){
				if(index == imgArr.length){
					index = 0
				}
				tpl.find(".banner-box-loop").find("img").css({
					"opacity": 0,
					"zIndex": -1		
				})		
				$(tpl.find(".banner-box-loop").find("img")[index]).css({
					"opacity": 1,
					"zIndex": 8
				})
				$(".banner-box-block").css({
					"opacity": 0.5
				})
				$($(".banner-box-block")[index]).css({
					"opacity": 1
				})		
				index++
			}, 3000)				
		}else{
			clearInterval(timer);
			$(".banner-box-loop").hide();
			$(".banner-img").show();			
		}
	}
	return {changeState: changeState};
})