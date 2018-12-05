define(["jq", "text!./tpl/head/head.tpl", "css!../css/head/head.css"],function($, tpl){
	$("body").on("mouseover", ".head-head-box-bottom-item", function(){
		$(this).find(".head-head-box-bottom-item-list").show(300);
	})
	$("body").on("mouseleave", ".head-head-box-bottom-item", function(){
		$(this).find(".head-head-box-bottom-item-list").hide();
	})	
	$("body").on("click", ".head-head-box-bottom-item-list-word", function(){
		
	})
	return tpl;
})