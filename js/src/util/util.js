define(["jq", "hb"], function($, hb){
	$.h = function(tpl, data) {
		var compiled = {};
		template = tpl;
		compiled[template] = hb.compile(template);
		return compiled[template](data);	
	} 
	// $.basePath = "http://192.168.1.91:8077/HBJSCMS/";
	$.basePath = "http://www.hbjsxy.cn/HBJSCMS/";
	
	$.newsLoopPic = function(){};//定义新闻列表全局的定时器名
	$.noticeTimer = function(){};//定义通知公告全局的定时器名
	return {
		todoHead: todoHead,
		todoBanner: todoBanner,
		todoIndex: todoIndex,
		todosecondMenu: todosecondMenu,
		todosecondContent: todosecondContent
	}
	//头部逻辑
	function todoHead($, hb, util, page, head, banner, index, secondMenu, secondContent) {
		var tplHead = head;
		//请求一组数据
		$.ajax({
			type:"get",
			url: $.basePath + "indexPageMenu.action",
			async:false,
			dataType: "json",
			error: function(XMLHttpRequest, errMsg, errObj) {
				console.log("XMLHttpRequest = ", XMLHttpRequest)
				console.log("errMsg = ", errMsg)
				console.log("errObj = ", errObj)
			},
			success: function(data) {
				if(data.code !== 0){
					alert("code不等于0,code值为 = " + data.code)
				}
				//获取所需导航顺序数据
				var needArr = [];
				var obj = {};				
				$(tplHead).find(".head-head-box-bottom-item-list").each(function(i, e){
					obj["keyPid" + $(e).attr("pid")] = [];
					$.each(data.data, function(i, v) {
						if($(e).attr("pid") == v.pId){
							obj["keyPid" + $(e).attr("pid")].push(v);
						}
					});
				})
				var allObj = {};
				for (key in obj) {
					for (var i = 0;i < obj[key].length;i++) {
						obj[key][i]['none'] = "false";
					}					
				}
				for (key in obj) {
					var ooo = obj[key];
					for (var i = 0;i < ooo.length;i++) {
						ooo[i]['all'] = JSON.stringify(ooo);
					}
					allObj[key] = ooo;
				}
				var tpl = $.h(head, allObj);
				$(".head").empty().html(tpl);				
			}
		});
		//首页按钮的点击
		$("body").off("click", "#nav-index");
		$("body").on("click", "#nav-index", function() {
			//二级导航全部置灰
			$(".head-head-box-bottom-item-click").removeClass("head-head-box-bottom-item-click-active");	
			//二级导航下拉全部置灰
			$(".head-head-box-bottom-item-list-word").removeClass("head-head-box-bottom-item-list-word-active")
			$(this).addClass("head-head-box-bottom-item-active");
			
			todoIndex($, hb, util, page, head, banner, index, secondMenu, secondContent);
			
		})
		
		
		
		//二级导航的点击
		$("body").off("click", ".head-head-box-bottom-item-list-word");
		$("body").on("click", ".head-head-box-bottom-item-list-word", function() {
			//二级导航全部置灰
			$(".head-head-box-bottom-item-click").removeClass("head-head-box-bottom-item-click-active");
			
			//当前二级导航点亮
			$(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").addClass("head-head-box-bottom-item-click-active")
			
			//二级导航下拉全部置灰
			$(".head-head-box-bottom-item-list-word").removeClass("head-head-box-bottom-item-list-word-active")
			
			//当前二级导航下拉点亮	
			$(this).addClass("head-head-box-bottom-item-list-word-active")
			//首页一级导航置灰
			$(".head-head-box-bottom-item").removeClass("head-head-box-bottom-item-active");
			
			var showType = Number($(this).attr("showtype"));
			//下面的二级导航所需要的数据格式
			var data = {
				slideTit: "",
				slideMenu: [],
				activeOrder: "",
				showType: "",
				leftTit: "",
				breadNav: [],
				cId: ""
			}
			if($(this).attr("cid")==162){
				window.open("http://www.hbjsxy.cn/HBJSCMS/hb/sign.html");
				return;
			}
			if(showType == 4){
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").text())];
				data.leftTit = $.trim($(this).text());
				data.showType = 4;
				data.slideTit = $.trim($(this).text());
				data.cId = $(this).attr("cid");
				$.ajax({
					type:"post",
					url:$.basePath + "getChannelItems.action",
					async:false,
					dataType: 'json',
					data: {
						pid: $(this).attr("cid")
					},
					success: function(jsonData) {
						data.slideMenu = jsonData.data;
						$.each(data.slideMenu, function(i, v) {
							v.none = "false";
						});								
					}
				});
			}else if(showType == 3){
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").text())];
				data.leftTit = $.trim($(this).text());
				data.cId = $(this).attr("cid");
				data.slideTit = $.trim($(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").text());			
				data.slideMenu = JSON.parse($(this).attr("all"));
				data.activeOrder = $(this).index();
				data.showType = 3;
			}else if(showType == 2){
				data.cId = $(this).attr("cid");
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").text())];
				data.leftTit = $.trim($(this).text());				
				data.slideTit = $.trim($(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").text());			
				data.slideMenu = JSON.parse($(this).attr("all"));				
				data.showType = 2;
				data.activeOrder = $(this).index();
			}else if(showType == 1){
				data.cId = $(this).attr("cid");
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").text())];
				data.leftTit = $.trim($(this).text());				
				data.slideTit = $.trim($(this).parents(".head-head-box-bottom-item").find(".head-head-box-bottom-item-click").text());			
				data.slideMenu = JSON.parse($(this).attr("all"));
				data.showType = 1;
				data.activeOrder = $(this).index();
			}else{
				
			}
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data);			
		})		
	}
	//banner逻辑
	function todoBanner($, hb, util, page, head, banner, index, secondMenu, secondContent) {
		

		
	}	
	//index逻辑
	function todoIndex($, hb, util, page, head, banner, index, secondMenu, secondContent) {
		banner.changeState(true);
		//请求数据
		var data = {}
//		$("body").off("click", ".school-news-bottom-list"); 
		var dataArr = [];
		$.ajax({
			type:"get",
			url:$.basePath + "indexPageNewsSecond.action",
			async:false,
			dataType: 'json',
			success:function(jsonData){
				dataArr = jsonData.data;
			}
		});
		//
//		console.log("dataArr = ", dataArr)
		var obj = {
			channel2:[],//新闻头条
			channel3:[],//学院简报
			channel4:[],//学院新闻
			channel5:[],//通知公告
			channel6:[],
			channel163:[],//新闻资讯
			channel165:[],//专题导航
			channel172:[],//图片链接
			channel145:[],//
			channel159:[],//党建专题
		};
		$.each(dataArr, function(i, v) {
			if(v.channel == 2){
				obj.channel2.push(v);
			}else if(v.channel == 3){
				obj.channel3.push(v);
			}else if(v.channel == 4){
				obj.channel4.push(v);
			}else if(v.channel == 5){
				obj.channel5.push(v);
			}else if(v.channel == 6){
				obj.channel6.push(v);
			}else if(v.channel == 163){
				obj.channel163.push(v)
			}else if(v.channel == 165){
				obj.channel165.push(v)
			}else if(v.channel == 172){
				obj.channel172.push(v)
			}else if(v.channel == 145){
				obj.channel145.push(v)
			}else if(v.channel == 159){
				obj.channel159.push(v)
			}
		});
		//
		var tpl = $.h(index, data)
		$(".content").empty().html(tpl);
		
		//新闻头条
		// $("").html(obj.channel2[0].resume);
		// if(obj.channel2[0].defaultImage){
		// 	$(".index-content-item-bottom-img-box").find("img").attr("src", obj.channel2[0].defaultImage)
		// }
		// $(".index-content-item-bottom-content-box-bottom").attr({"cid":obj.channel2[0].id,"showtype":1})
		// $("body").off("click", ".index-content-item-bottom-content-box-bottom");
		// $("body").on("click", ".index-content-item-bottom-content-box-bottom", function(){
		// 	var data = {
		// 		slideTit: "首页",
		// 		slideMenu: [{name:"新闻头条",showType:3,id:$(this).attr("cid"),none:'true'}],
		// 		activeOrder: 0,
		// 		showType: 3,
		// 		leftTit: "新闻头条",
		// 		breadNav: ["新闻头条", ">", "首页"],
		// 		cId: $(this).attr("cid")
		// 	}			
		// 	todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true)
		// })

		//学院简报
		// if( obj.channel3[0].defaultImage){
		// 	$(".index-content-item-bottom-box-img-box").find("img").attr("src", obj.channel3[0].defaultImage)
		// }
		// $(".index-content-item-bottom-box-img-box").attr("cid", obj.channel3[0].id)
		// $("body").off("click", ".index-content-item-bottom-box-img-box");
		// $("body").on("click", ".index-content-item-bottom-box-img-box", function(){
		// 	var data = {
		// 		slideTit: "首页",
		// 		slideMenu: [{name:"学院简报",showType:3,id:$(this).attr("cid"),none:'true'}],
		// 		activeOrder: 0,
		// 		showType: 3,
		// 		leftTit: "学院简报",
		// 		breadNav: ["学院简报", ">", "首页"],
		// 		cId: $(this).attr("cid")
		// 	}			
		// 	todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true)			
		// })
		//媒体聚焦
		// if( obj.channel5[0].defaultImage){
		// 	$(".index-content-item-bottom-box-meitijujiao").find("img").attr("src", obj.channel5[0].defaultImage)
		// }
		// $(".index-content-item-bottom-box-meitijujiao").find(".index-content-item-bottom-box-meitijujiao-desc").html(obj.channel5[0].resume);
		// $(".index-content-item-bottom-box-meitijujiao").attr("cid", obj.channel5[0].id)
		// $("body").off("click", ".index-content-item-bottom-box-meitijujiao");
		// $("body").on("click", ".index-content-item-bottom-box-meitijujiao", function(){
		// 	var data = {
		// 		slideTit: "首页",
		// 		slideMenu: [{name:"媒体聚焦",showType:3,id:$(this).attr("cid"),none:'true'}],
		// 		activeOrder: 0,
		// 		showType: 3,
		// 		leftTit: "媒体聚焦",
		// 		breadNav: ["媒体聚焦", ">", "首页"],
		// 		cId: $(this).attr("cid")
		// 	}			
		// 	todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true)			
		// })		
		//学院新闻
		// if(obj.channel4[0].defaultImage){
		// 	$(".school-news-top-img-box-img-img").attr("src",obj.channel4[0].defaultImage);
		// }
		// $(".school-news-top-img-box-tit-tit").html(obj.channel4[0].title);
		// $(".school-news-top-img-box-desc-desc").html(obj.channel4[0].resume);
		// $(".school-news-top-img-box-con-con").attr("cid",obj.channel4[0].id);

		//新闻资讯 查看详情的点击
		$("body").off("click", ".school-news-top-img-box-con-con");
		$("body").on("click", ".school-news-top-img-box-con-con", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"学院新闻",showType:3,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 3,
				leftTit: "学院新闻",
				breadNav: ["学院新闻", ">", "首页"],
				cId: $(this).attr("cid")
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true)			
		})				
		//新闻资讯 列表
		$(".school-news-bottom-list-remove").remove();
		$(".index-content-item-bottom-img-remove").remove();
		$(".index-content-item-bottom-loopPoint li").remove();
		for (var i = 0;i < obj.channel163.length;i++) {
			var html = $(".school-news-bottom-list-clone").clone();
			var img = $(".index-content-item-bottom-img-clone").clone();
			var li = $("<li></li>");
			li.text(i+1);
			html.show();
			html.addClass("school-news-bottom-list-remove").removeClass("school-news-bottom-list-clone");
			img.addClass("index-content-item-bottom-img-remove").removeClass("index-content-item-bottom-img-clone");
			html.find("span").text(i+1+'、')
			html.find(".school-news-bottom-list-tit").text(obj.channel163[i].title);
			html.find(".school-news-bottom-list-time").text(obj.channel163[i].createDate);
			img.find("img").attr("src",'http://www.hbjsxy.cn'+ obj.channel163[i].defaultImage);
			html.attr("cid", obj.channel163[i].id)
			img.attr("cid",obj.channel163[i].id);
			img.css("display","block");
			$(".index-content-item-bottom-content-box-top").append(html);
			$(".index-content-item-bottom-img-box").append(img);
			$(".index-content-item-bottom-loopPoint").append(li);
		}
		function newsLoop(){
			var newsIndex = 0;
			function changeNews(i){
				$(".index-content-item-bottom-img").eq(i).show().siblings(".index-content-item-bottom-img").hide();
				$(".index-content-item-bottom-loopPoint li").eq(i).addClass('active').siblings().removeClass('active');
			}
			function setTimer(){
				$.newsLoopPic =	setInterval(function(){
					newsIndex++;
					if(newsIndex == obj.channel163.length){
						newsIndex = 0;
					}
					changeNews(newsIndex);
				},3000);
			}

			$(".index-content-item-bottom-loopPoint li").click(function(){
				newsIndex = $(this).index();
				clearInterval($.newsLoopPic);
				changeNews(newsIndex);
				setTimer();
			})
			changeNews(newsIndex);
			setTimer();
		}
		newsLoop();
		$("body").off("click", ".school-news-bottom-list");
		$("body").on("click", ".school-news-bottom-list", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"新闻资讯",showType:3,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 3,
				leftTit: "新闻资讯",
				breadNav: ["新闻资讯", ">", "首页"],
				cId: $(this).attr("cid")
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true)
		});
		$("body").off("click", ".index-content-item-bottom-img");
		$("body").on("click", ".index-content-item-bottom-img", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"新闻资讯",showType:3,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 3,
				leftTit: "新闻资讯",
				breadNav: ["新闻资讯", ">", "首页"],
				cId: $(this).attr("cid")
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true)
		})
		//点击更多
		$("body").off("click", "#xueyuanmore");
		$("body").on("click","#xueyuanmore", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"学院新闻",showType:1,id:4,none:'true'}],
				activeOrder: 0,
				showType: 1,
				leftTit: "新闻资讯",
				breadNav: ["新闻资讯", ">", "首页"],
				cId: 163
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data);		
		})
		//通知公告
		$(".school-news-bottom-list-a-remove").remove();
		for (var i = 0;i < obj.channel5.length;i++) {
			var html = $(".school-news-bottom-list-a-clone").clone();
			html.show();
			html.addClass("school-news-bottom-list-a-remove").removeClass("school-news-bottom-list-a-clone");
			html.find(".school-news-bottom-list-tit-a").text(obj.channel5[i].title);
			html.find(".school-news-bottom-list-time-a").text(obj.channel5[i].createDate);
			html.attr("cid", obj.channel5[i].id)
			$("#index-content-item-bottom-box-ccc").append(html);
		}
		function autoScroll(){
			var height = 0;
			$.noticeTimer = setInterval(function(){
				height += $('.school-news-bottom-list-a').height() + 16;
				if(height>=$('#index-content-item-bottom-box-ccc').height()-240){
					$('#index-content-item-bottom-box-ccc').css({'transform':'translate3D(0,0,0)','transition-duration':'0ms'});
					height = 0;
				}else{
					$('#index-content-item-bottom-box-ccc').css({'transform':'translate3D(0,' + -height + 'px,0)','transition-duration':'1000ms'});
				}
			},3000)

		}
		autoScroll()
		$("body").off("click", ".school-news-bottom-list-a");
		$("body").on("click", ".school-news-bottom-list-a", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"通知公告",showType:3,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 3,
				leftTit: "通知公告",
				breadNav: ["通知公告", ">", "首页"],
				cId: $(this).attr("cid")
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true);
		})
		//点击更多
		$("body").off("click", "#tongzhigonggao");
		$("body").on("click","#tongzhigonggao", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"通知公告",showType:1,id:4,none:'true'}],
				activeOrder: 0,
				showType: 1,
				leftTit: "通知公告",
				breadNav: ["通知公告", ">", "首页"],
				cId: 5
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data);
		})		
		//专题导航
		$(".index-content-item-bottom-box-img-seminar-remove").remove();
		for (var i = 0;i < obj.channel165.length;i++) {
			var html = $(".index-content-item-bottom-box-img-seminar-clone").clone();
			html.show();
			html.addClass(".index-content-item-bottom-box-img-seminar-remove").removeClass("index-content-item-bottom-box-img-seminar-clone");
			html.find("img").attr('src','http://www.hbjsxy.cn/' + obj.channel165[i].defaultImage);//图片路径需改为obj.channel165[i].defaultImage
			html.find("span").text(obj.channel165[i].title)
			html.attr("cid", obj.channel165[i].id)
			$("#index-content-item-bottom-box-img-box").append(html);
		}
		
		$("body").off("click", ".index-content-item-bottom-box-img-seminar");
		$("body").on("click", ".index-content-item-bottom-box-img-seminar", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"专题导航",showType:3,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 1,
				leftTit: "专题导航",
				breadNav: ["专题导航", ">", "首页"],
				cId: $(this).attr("cid")
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true);
		})
		//图片链接
		$(".index-content-item-bottom-box-photoLink-remove").remove();
		for (var i = 0;i < obj.channel172.length;i++) {
			var html = $(".index-content-item-bottom-box-photoLink-clone").clone();
			html.show();
			html.addClass("index-content-item-bottom-box-photoLink-remove").removeClass("index-content-item-bottom-box-photoLink-clone");
			html.css({
				'background-image': 'url("http://www.hbjsxy.cn/' + obj.channel172[i].defaultImage+'")',//这里需把图片路径改为obj.channel165[i].defaultImage
				'background-size': '100% 100%'
			})
			// html.text(obj.channel172[i].title)//图片正中间的字
			html.attr("cid", obj.channel172[i].id)
			$("#index-content-item-bottom-box-photoBox").append(html);
		}
		
		$("body").off("click", ".index-content-item-bottom-box-photoLink");
		$("body").on("click", ".index-content-item-bottom-box-photoLink", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"图片链接",showType:3,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 1,
				leftTit: "图片链接",
				breadNav: ["图片链接", ">", "首页"],
				cId: $(this).attr("cid")
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true);
		})
		//党建专题
		$(".index-content-item-bottom-box-meitijujiao-remove").remove();
		for (var i = 0;i < obj.channel145.length;i++) {
			var html = $(".index-content-item-bottom-box-meitijujiao-clone").clone();
			html.show();
			html.addClass("index-content-item-bottom-box-meitijujiao-remove").removeClass("index-content-item-bottom-box-meitijujiao-clone");
			html.find('img').attr('src','http://www.hbjsxy.cn/' + obj.channel145[i].defaultImage)
			html.attr("cid", obj.channel145[i].id)
			$("#index-content-item-bottom-box-djzt").append(html);
		}
		
		$("body").off("click", ".index-content-item-bottom-box-meitijujiao");
		$("body").on("click", ".index-content-item-bottom-box-meitijujiao", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"党建专题",showType:1,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 1,
				leftTit: "党建专题",
				breadNav: ["党建专题", ">", "首页"],
				cId: 159
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data, true);
		})
		//查看更多
		$("body").off("click", "#dangjianmore");
		$("body").on("click","#dangjianmore", function(){
			var data = {
				slideTit: "首页",
				slideMenu: [{name:"党建专题",showType:1,id:$(this).attr("cid"),none:'true'}],
				activeOrder: 0,
				showType: 1,
				leftTit: "党建专题",
				breadNav: ["党建专题", ">", "首页"],
				cId: 159
			}			
			todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data);
		})
	}
	
	//secondMenu逻辑
	function todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, jsonData, bol) {
		banner.changeState(false);
		clearInterval($.newsLoopPic);//content内容改变时去掉定时器
		clearInterval($.newsLoopPic);//content内容改变时去掉定时器
		var tpl = $.h(secondMenu, jsonData)
		$(".content").empty().html(tpl);
		var tit = "";
		if(jsonData.title){
			tit = jsonData.title;
		}
		var obj = {
			"isPage": false,
			"isImg": false,
			"isContent": false,
			"type": "",
			"title": tit
		}		
		var showType = jsonData.showType;
		if(showType == 1){
			//所有列表项 置灰
			$(".second-menu-left-item").removeClass("second-menu-left-item-active")
			//传过来的列表项 高亮
			if(jsonData.activeOrder !== ""){
				$($(".second-menu-left-item")[Number(jsonData.activeOrder)]).addClass("second-menu-left-item-active")
			}
			//当是分页的时候传一个id
			obj.isPage = jsonData.cId;

		}else if(showType == 2) {
			//所有列表项 置灰
			$(".second-menu-left-item").removeClass("second-menu-left-item-active")
			//传过来的列表项 高亮
			if(jsonData.activeOrder !== ""){
				$($(".second-menu-left-item")[Number(jsonData.activeOrder)]).addClass("second-menu-left-item-active")
			}			
			//当是相册列表的时候传一个id
			obj.isImg = jsonData.cId;
		}else if(showType == 3) {
			//所有列表项 置灰
			$(".second-menu-left-item").removeClass("second-menu-left-item-active")
			//传过来的列表项 高亮
			if(jsonData.activeOrder !== ""){
				$($(".second-menu-left-item")[Number(jsonData.activeOrder)]).addClass("second-menu-left-item-active")
			}
			//
			obj.isContent = jsonData.cId;
			obj.type = 3;
		}else if(showType == 4) {
			obj.isContent = jsonData.cId
			obj.type = 4;
		}else{
			
		}
		todosecondContent($, hb, util, page, head, banner, index, secondMenu, secondContent, obj, bol)
	}		
	//secondContent逻辑
	function todosecondContent($, hb, util, page, head, banner, index, secondMenu, secondContent, jsonData, bol) {	
		var tpl = $.h(secondContent, jsonData)
		$(".second-menu-content-bottom-box").empty().html(tpl);
		if(jsonData.isContent){
			//type = 3 时的内容处理
			if(jsonData.type == 3){
				if(bol){
					var data = ajax("newsDetail.action", {
						id: jsonData.isContent,
					});	
					$(".content-box-tit").text(data.data.title)
					$(".content-box-time").text("发布时间：" +  data.data.createDate)
					$(".content-box-edit").text("编辑：" + data.data.creator)
					$(".content-box-click").text("点击：" + data.data.clickCount)
					$(".content-box-box").html(data.data.content)
					clickCount(data.data.id);
					//附件的判断
					if(data.data.downFile){
						$(".content-box-fujian").show();
						$(".content-box-fujian-load").attr("href",data.data.downFile)
					}else{
						$(".content-box-fujian").hide();
					}						
				}else{
					var data = ajax("frontNewsList.action", {
						channel: jsonData.isContent,
						showType:3,
					});	
					$(".content-box-tit").text(data.data[0].title)
					$(".content-box-time").text("发布时间：" +  data.data[0].createDate)
					$(".content-box-edit").text("编辑：" + data.data[0].creator)
					$(".content-box-click").text("点击：" + data.data[0].clickCount)
					$(".content-box-box").html(data.data[0].content)
					clickCount(data.data[0].id);
					//附件的判断
					if(data.data[0].downFile){
						$(".content-box-fujian").show();
						$(".content-box-fujian-load").attr("href",data.data[0].downFile)
					}else{
						$(".content-box-fujian").hide();
					}						
				}
			}
			if(jsonData.type == 4){
				var data = ajax("frontNewsList.action", {
					channel: jsonData.isContent,
					showType:4,
				});			
				$(".content-box-tit").text(data.data[0].title)
				$(".content-box-time").text("发布时间：" +  data.data[0].createDate)
				$(".content-box-edit").text("编辑：" + data.data[0].creator)
				$(".content-box-click").text("点击：" + data.data[0].clickCount)
				$(".content-box-box").html(data.data[0].content)
				clickCount(data.data[0].id);
				//附件的判断
				if(data.data[0].downFile){
					$(".content-box-fujian").show();
					$(".content-box-fujian-load").attr("href",data.data[0].downFile)
				}else{
					$(".content-box-fujian").hide();
				}					
			}
		}
		//相册列表的处理
		if(jsonData.isImg){
			var ddd = ajax("frontNewsList.action", {
				channel: jsonData.isImg,
				showType:2,
				page:1,
				rows:10
			});
			$(".img-box-item-box-remove").remove();
			for(var i = 0;i < ddd.data.length;i++){
				var html = $(".img-box-item-box-clone").clone();
				html.show();
				html.attr("cid", ddd.data[i].id)
				html.removeClass("img-box-item-box-clone").addClass("img-box-item-box-remove");
				html.find("img").attr("src",ddd.data[i].defaultImage);
				html.find(".img-box-item-tit").text(ddd.data[i].title);
				$(".img-box").append(html);
			}			
			$('.page-box-a').jqPaginator({
			    totalCounts: ddd.total,
			    pageSize: 10,
			    visiblePages: 10,
			    currentPage: 1,
			    first: '<div class="first"><a href="javascript:void(0);">首页</a></div>',
			    prev: '<div class="prev"><a href="javascript:void(0);">上一页</a></div>',
			    next: '<div class="next"><a href="javascript:void(0);">下一页</a></div>',
			    last: '<div class="last"><a href="javascript:void(0);">尾页</a></div>',
			    page: '<div class="page"><a href="javascript:void(0);">{{page}}</a></div>',
			    onPageChange: function (num) {
						var ddd = ajax("frontNewsList.action", {
							channel: jsonData.isImg,
							showType:2,
							page: num,
							rows:10
						});
						this.totalCounts = ddd.total;
						$(".img-box-item-box-remove").remove();
						for(var i = 0;i < ddd.data.length;i++){
							var html = $(".img-box-item-box-clone").clone();
							html.show();
							html.attr("cid", ddd.data[i].id)
							html.removeClass("img-box-item-box-clone").addClass("img-box-item-box-remove");
							if(ddd.data[i].defaultImage){
								html.find("img").attr("src",ddd.data[i].defaultImage);
							}
							html.find(".img-box-item-tit").text(ddd.data[i].title);
							$(".img-box").append(html);
						}										
			    }
			});		
			//对相册的点击
			$("body").off("click", ".img-box-item-box");
			$("body").on("click", ".img-box-item-box", function() {
				$(".img-box-item-box").removeClass("img-box-item-box-active");
				$(this).addClass("img-box-item-box-active");
				clickCount($(this).attr("cid"))
				$.ajax({
					type:"get",
					url:  $.basePath + "newsDetail.action",
					async:false,
					dataType: 'json',
					data:{
						id: $(this).attr("cid")
					},
					success:function(jsonData){
						//相册页消失
						$(".img-box-box").hide();
						//内容页出现
						$(".content-box-a").show();
						$(".content-box-tit-a").text(jsonData.data.title)
						$(".content-box-time-a").text("发布时间：" +  jsonData.data.createDate)
						$(".content-box-edit-a").text("编辑：" + jsonData.data.creator)
						$(".content-box-click-a").text("点击：" + jsonData.data.clickCount)
						$(".content-box-box-a").html(jsonData.data.content)
						//附件的判断
						if(jsonData.data.downFile){
							$(".content-box-fujian-a").show();
							$(".content-box-fujian-load-a").attr("href",jsonData.data.downFile)
						}else{
							$(".content-box-fujian-a").hide();
						}
					}
				});
			})
			//返回的点击
			$("body").off("click", ".content-box-back-a");
			$("body").on("click",".content-box-back-a",function(){
						//列表页出现
						$(".img-box-box").show();
						//内容页消失
						$(".content-box-a").hide();			
			})			
		}
		//列表项的处理
		if(jsonData.isPage){
			var tit = "";
			if(jsonData.title){
				tit = jsonData.title;
			}

			if(jsonData.isPage == -1){
//				frontSearchNews.action
				var ddd = ajax("frontSearchNews.action", {
					channel: jsonData.isPage,
					showType:1,
					page:1,
					rows:10,
					title:tit
				});
			}else{
				var ddd = ajax("frontNewsList.action", {
					channel: jsonData.isPage,
					showType:1,
					page:1,
					rows:10,
					title:tit
				});				
			}
			if(ddd.total == 0){
//				alert("未搜索到关键词，请换一个试试~")
				if(jsonData.isPage == -1){
					$(".tip").show();
				}
				return;
			}else{
				$(".tip").hide();
			}
			$(".school-news-bottom-list-remove").remove();
			for(var i = 0;i < ddd.data.length;i++){
				var html = $(".school-news-bottom-list-clone").clone();
				html.show();
				html.attr("cid", ddd.data[i].id)
				html.removeClass("school-news-bottom-list-clone").addClass("school-news-bottom-list-remove");
				html.find(".school-news-bottom-list-desc").text(ddd.data[i].title);
				html.find(".school-news-bottom-list-time").text(ddd.data[i].createDate);
				$(".school-news-bottom-list-box").append(html);
			}			
			$('.page-box').jqPaginator({
			    totalCounts: ddd.total,
			    pageSize: 10,
			    visiblePages: 10,
			    currentPage: 1,
			    first: '<div class="first"><a href="javascript:void(0);">首页</a></div>',
			    prev: '<div class="prev"><a href="javascript:void(0);">上一页</a></div>',
			    next: '<div class="next"><a href="javascript:void(0);">下一页</a></div>',
			    last: '<div class="last"><a href="javascript:void(0);">尾页</a></div>',
			    page: '<div class="page"><a href="javascript:void(0);">{{page}}</a></div>',
			    onPageChange: function (num) {

						if(jsonData.isPage == -1){
//							frontSearchNews.action
							var ddd = ajax("frontSearchNews.action", {
								channel: jsonData.isPage,
								showType:1,
								page: num,
								rows:10,
								title:tit
							});							
						}else{
							var ddd = ajax("frontNewsList.action", {
								channel: jsonData.isPage,
								showType:1,
								page: num,
								rows:10,
								title:tit
							});							
						}
							this.totalCounts = ddd.total;
							$(".school-news-bottom-list-remove").remove();
							for(var i = 0;i < ddd.data.length;i++){
								var html = $(".school-news-bottom-list-clone").clone();
								html.show();
								html.attr("cid", ddd.data[i].id)
								html.removeClass("school-news-bottom-list-clone").addClass("school-news-bottom-list-remove");
								html.find(".school-news-bottom-list-desc").text(ddd.data[i].title);
								html.find(".school-news-bottom-list-time").text(ddd.data[i].createDate);
								$(".school-news-bottom-list-box").append(html);
							}									
			    }
			});		
			//对列表的点击
			$("body").off("click", ".school-news-bottom-list"); 
			$("body").on("click", ".school-news-bottom-list", function() {
				$(".school-news-bottom-list").removeClass("school-news-bottom-list-active");
				clickCount($(this).attr("cid"))
				$(this).addClass("school-news-bottom-list-active");
				$.ajax({
					type:"get",
					url:  $.basePath + "newsDetail.action",
					async:false,
					dataType: 'json',
					data:{
						id: $(this).attr("cid")
					},
					success:function(jsonData){
						//列表页消失
						$(".school-news-bottom-list-box-box-box").hide();
						//内容页出现
						$(".content-box-a").show();
						
						$(".content-box-tit-a").text(jsonData.data.title)
						$(".content-box-time-a").text("发布时间：" +  jsonData.data.createDate)
						$(".content-box-edit-a").text("编辑：" + jsonData.data.creator)
						$(".content-box-click-a").text("点击：" + jsonData.data.clickCount)
						$(".content-box-box-a").html(jsonData.data.content)
						//附件的判断
						if(jsonData.data.downFile){
							$(".content-box-fujian-a").show();
							$(".content-box-fujian-load-a").attr("href",jsonData.data.downFile)
						}else{
							$(".content-box-fujian-a").hide();
						}
					}
					
				});
			})
			//返回的点击
			$("body").off("click", ".content-box-back-a"); 
			$("body").on("click",".content-box-back-a",function(){
						//列表页出现
						$(".school-news-bottom-list-box-box-box").show();
						//内容页消失
						$(".content-box-a").hide();			
			})
			
		}			
	}
		function ajax(url, parm) {
			var data = "";
			$.ajax({
				type:"post",
				url: $.basePath + url,
				data: parm,
				async:false,
				dataType: 'json',
				success:function(jsonData){
					data = jsonData;
				}
			});
			return data;
		}	
		//次数统计
		function clickCount(id) {
			$.ajax({
				type:"get",
				dataType: 'json',
				url: $.basePath + "clickCount.action",
				data: {
					id: id
				},
				async:false,
				success:function(jsonData){
					
				}
			});			
		}
		
})