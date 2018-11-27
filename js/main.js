require.config({
	baseUrl: "./",
	paths: {
		 "jq": "js/lib/jquery",
		 "page": "js/lib/page",
		 "hb": "js/lib/handlebars",
		"text": "js/lib/text",
		"css": "js/lib/css",
		"util": "js/src/util/util",
		"head": "js/src/head/head",
		"banner": "js/src/banner/banner",
		"index": "js/src/index/index",
		"secondMenu": "js/src/secondMenu",
		"secondContent": "js/src/secondContent"
	},
	shim: {
		"jq": {
			exports: "$"
		}, 
		"hb": {
			exports: "Handlebars"
		},
		"page": ["jq"]
	} 
})

require(["jq", "hb", "util", "page", "head", "banner", "index", "secondMenu", "secondContent"], function( $, hb, util, page, head, banner, index, secondMenu, secondContent){
	//加载默认banner
	$.ajax({
		type:"get",
		url:$.basePath + "frontDefaultImage.action",
		async:true,
		dataType: 'json',
		success:function(img){
			if(img.data.image){
				$(".banner-img").attr("src",img.data.image)
			}
			
		}
	});
	//头部处理
	util.todoHead($, hb, util, page, head, banner, index, secondMenu, secondContent);
	//默认index 
	util.todoIndex($, hb, util, page, head, banner, index, secondMenu, secondContent);
	//搜索查询
	$("body").off("click", "#search-enter");
	$("body").on("click","#search-enter", function(){
		var data = {
			slideTit: "首页",
			slideMenu: [{name:"搜索",showType:1,id:4,none:'true'}],
			activeOrder: 0,
			showType: 1,
			leftTit: "搜索",
			breadNav: ["搜索", ">", "首页"],
			cId: -1,
			title: $("#search-value").val()
		}			
		util.todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data);
	})		
   $(document).keypress(function(e) {  
    // 回车键事件  
       if(e.which == 13) {  
 		var data = {
			slideTit: "首页",
			slideMenu: [{name:"搜索",showType:1,id:4,none:'true'}],
			activeOrder: 0,
			showType: 1,
			leftTit: "搜索",
			breadNav: ["搜索", ">", "首页"],
			cId: -1,
			title: $("#search-value").val()
		}			
		util.todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data);  			
       }  
   }); 	
	//二级点击
	$("body").off("click", ".second-menu-left-item"); 
	$("body").on("click", ".second-menu-left-item", function() {
			if($(this).attr("none") == "true"){
				return;
			}
//			//二级导航全部置灰
			$(".head-head-box-bottom-item-list-word").removeClass("head-head-box-bottom-item-list-word-active")
			var pId = $(this).attr("pid");
			var el = $(".head-head-box-bottom-item-list[pid='"+ pId + "']").find(".head-head-box-bottom-item-list-word");
			$(el[$(this).index() - 1]).addClass("head-head-box-bottom-item-list-word-active");
//			//当前点亮
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
			if(showType == 4){
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".second-menu-left").find(".second-menu-left-tit").text())];
				data.leftTit = $.trim($(this).text());
				data.showType = 4;
				data.slideTit = $.trim($(this).text());
				data.cId = $(this).attr("cid");
				$.ajax({
					type:"post",
					url:$.basePath + "getChannelItems.action",
					async:false,
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
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".second-menu-left").find(".second-menu-left-tit").text())];
				data.leftTit = $.trim($(this).text());
				data.slideTit = $.trim($(this).parents(".second-menu-left").find(".second-menu-left-tit").text());
				data.cId = $(this).attr("cid");
				var objArr = [];
				$(this).parents(".second-menu-left").find(".second-menu-left-item").each(function(i, e){
					var obj = {};
					obj.showType = $(e).attr("showType");
					obj.pId = $(e).attr("pid");
					obj.id = $(e).attr("cid");
					obj.name = $(e).attr("name");
					objArr.push(obj);
				})
				data.slideMenu = objArr;
				$.each(data.slideMenu, function(i, v) {
					v.none = "false";
				});				
				data.activeOrder = $(this).index() - 1;

				data.showType = 3;
			}else if(showType == 2){
				data.cId = $(this).attr("cid");
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".second-menu-left").find(".second-menu-left-tit").text())];
				data.leftTit = $.trim($(this).text());
				data.slideTit = $.trim($(this).parents(".second-menu-left").find(".second-menu-left-tit").text());		
				var objArr = [];
				$(this).parents(".second-menu-left").find(".second-menu-left-item").each(function(i, e){
					var obj = {};
					obj.showType = $(e).attr("showType");
					obj.pId = $(e).attr("pid");
					obj.id = $(e).attr("cid");
					obj.name = $(e).attr("name");
					objArr.push(obj);
				})
				data.slideMenu = objArr;	
				$.each(data.slideMenu, function(i, v) {
					v.none = "false";
				});				
				data.showType = 2;
				data.activeOrder = $(this).index() - 1;
			
		
			}else if(showType == 1){
				data.cId = $(this).attr("cid");
				data.breadNav = [$.trim($(this).text()), ">", $.trim($(this).parents(".second-menu-left").find(".second-menu-left-tit").text())];
				data.leftTit = $.trim($(this).text());
				data.slideTit = $.trim($(this).parents(".second-menu-left").find(".second-menu-left-tit").text());		
				var objArr = [];
				$(this).parents(".second-menu-left").find(".second-menu-left-item").each(function(i, e){
					var obj = {};
					obj.showType = $(e).attr("showType");
					obj.pId = $(e).attr("pid");
					obj.id = $(e).attr("cid");
					obj.name = $(e).attr("name");
					objArr.push(obj);
				})
				data.slideMenu = objArr;
				$.each(data.slideMenu, function(i, v) {
					v.none = "false";
				});				
				data.showType = 1;
				data.activeOrder = $(this).index() - 1;
			
			}else{
				
			}
			util.todosecondMenu($, hb, util, page, head, banner, index, secondMenu, secondContent, data);			
	})		
})
