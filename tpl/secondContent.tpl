<style type="text/css">
	.second-menu-wrap{
		padding-top: 20px;
	}
	.page-box,.page-box-a{
		margin-top: 80px;
		text-align: center;
		margin-bottom: 100px;
	}
	.page-box div,.page-box-a div{
		display: inline-block;
		margin: 0 15px;
	}
	.page-box div a,.page-box-a div a{
		color: black;
		font-size: 14px;
	}	
	.page-box .page,.page-box-a .page{
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;

	}
	.page-box .page a,.page-box-a .page a{
		font-size: 12px;
	}
	.page.active{
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 18px;		
		background: url(./img/content/page-yuan.png) no-repeat;
		background-size: 100% 100%;
	}
	.page.active a{
		color: white;
	}
	.img-box-item-box{
		width: 300px;
		margin-bottom: 30px;
		cursor: pointer;
		display: inline-block;
		float: left;
		margin-left: 8px;
	}
	.img-box-item-box:hover{
		color: dodgerblue;
	}
	.img-box-item-box-active{
		color: dodgerblue;
	}	
	.img-box-item-box img{
		width: 300px;
		height: 190px;
	}
	.img-box-item-box div{
		width: 300px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
	}
	.content-box,.content-box-a{
		text-align: center;
		/*font-weight: 300;*/
	}
	.content-box-desc,.content-box-desc-a{
		margin-top: 20px;
		font-size: 12px;
		color: #BDBDBD;
	}
	.content-box-box,.content-box-box-a{
		margin: 30px 0 50px 0;
	}
	.content-box-box *{
		font-size: 14px !important;
		line-height: 28px !important;
	}
	.content-box-box img{
		max-width: 935px !important;
	}
	.content-box-box-a img{
		max-width: 935px !important;
	}	
	.content-box-box-a *{
		font-size: 14px !important;
		line-height: 28px !important;
	}
	.school-news-bottom-list:hover div{
		color: dodgerblue !important;
	}
	.school-news-bottom-list-active .school-news-bottom-list-desc,.school-news-bottom-list-active .school-news-bottom-list-time{
		color: dodgerblue !important;
	}
	.img-box a{
		color: black;
	}
</style>
<div class="second-menu-wrap">
	<!--3种类型 图册 列表分页 内容-->
	<!--分页-->
	{{#if isPage}}
	<div class="school-news-bottom-list-box-box-box">
		<div class="school-news-bottom-list-box">
			<div style="margin-top: 16px;cursor: pointer;margin-bottom: 30px;display: none;" class="school-news-bottom-list school-news-bottom-list-clone">
				<img src="./img/content/content-news3.png" style="width: 20px;vertical-align: middle;"/>
				<div class="school-news-bottom-list-desc" style="display: inline-block;width: 748px;font-size: 14px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;vertical-align: middle;color: #727272;">
					鹤壁市成人职业技术教研室 关于印发2016年鹤壁市职业教育技能 大赛比赛方案的通知
				</div>
				<div class="school-news-bottom-list-time" style="display: inline-block;color: darkgray;font-size: 12px;vertical-align: middle;">
					2017-10-12 12:19:10
				</div>					
			</div>			
					
		</div>
		<div class="tip" style="display: none;text-align: center;padding-top: 100px;font-weight: 500;">
			未搜索到关键词，请换一个试试~
		</div>
		<div class="page-box clear">
			
			
			
		</div>		
	</div>
	{{/if}}
	<!--图册-->
	{{#if isImg}}
	<div class="img-box-box">
		<div class="img-box clear">
			
			<div class="img-box-item-box img-box-item-box-clone" style="display: none;">
				<img src="./img/content/xiaoyuanfengjing.png"/>
				<div class="img-box-item-tit">
					校园风景
				</div>
			</div>		
		</div>
		
		<div class="page-box-a clear">
				
				
				
		</div>	
	</div>	
	{{/if}}	
	<!--内容-->
	{{#if isContent}}
		<div class="content-box">
			<h3 class="content-box-tit"></h3>
			<div class="content-box-desc">
				<span class="content-box-time">发布时间：2017-11-23 09:44:53 </span>
				<span class="content-box-edit" style="margin: 0 15px;">编辑：鹤壁机电信息工程学校 </span>
				<span class="content-box-click" >点击：261次 </span>
			</div>
			<div class="content-box-box">
				

				
			</div>
			<div class="content-box-fujian" style="text-align: right;margin-bottom: 30px;" style="display: none;">
				<a class="content-box-fujian-load" href="" target="_blank" style="cursor: pointer;"><img src="./img/fujian.png" style="width: 30px;margin-right: 5px;"/><span style="color: black;font-size: 14px;font-weight: 500;position: relative;top: -8px;">附件下载</span></a>
			</div>			
		</div>
	{{/if}}	
		<div class="content-box-a" style="display: none;">
			<h3 class="content-box-tit-a"></h3>
			<div class="content-box-desc-a">
				<span class="content-box-time-a"> </span>
				<span class="content-box-edit-a" style="margin: 0 15px;"> </span>
				<span class="content-box-click-a"> </span>
			</div>
			<div class="content-box-back-a" style="text-align: right;height: 30px;line-height: 30px;cursor: pointer;">
				<span style="font-size: 14px;color: black;font-weight: 500;vertical-align: middle;position: relative;top: 2px;margin-right: 5px;">点击返回</span><img src="./img/back.png" style="width: 30px;vertical-align: middle;"/>
			</div>			
			<div class="content-box-box-a">

				
				
			</div>
			<div class="content-box-fujian-a" style="text-align: right;margin-bottom: 30px;" style="display: none;">
				<a class="content-box-fujian-load-a" href="" target="_blank" style="cursor: pointer;"><img src="./img/fujian.png" style="width: 30px;margin-right: 5px;"/><span style="color: black;font-size: 14px;font-weight: 500;position: relative;top: -8px;">附件下载</span></a>
			</div>
			
		</div>	
</div>