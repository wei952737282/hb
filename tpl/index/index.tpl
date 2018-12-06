<style type="text/css">
	.index-content-box{
		padding: 40px 0 60px 0;
	}
	.index-content-item-box{
		position: relative;
		float: left;		
	}
	.index-content-item-tit-box{
		margin-bottom: 25px;
	}
	.index-content-item-tit-more{
		position: absolute;
		right: 0;
		top: 4px;
		font-size: 12px;
		font-weight: 300;
		cursor: pointer;
	}
	.index-content-item-tit-box img{
		vertical-align: middle;
	}
	.index-content-item-tit-box span{
		vertical-align: middle;
	}	
	.index-content-item-bottom-img-box{
		width: 319px;
		height: 170px;
	}
	.index-content-item-bottom-img{
		position:absolute;
		cursor:pointer;
		width:100%;
		height:100%;
		top:0;
		left:0;
	}
	.index-content-item-bottom-loopPoint{
		position:absolute;
		left:0;
		right:0;
		margin: 0 auto;
		bottom:5px;
		z-index:10;
	}
	.index-content-item-bottom-loopPoint li{
		list-style:none;
		float:left;
		text-align:center;
		color:#333;
		width:20px;
		height:20px;
		margin:0 2px;
		border-radius:50%;
		background:#ccc;
		opacity:.6;
		cursor:pointer;
	}
	.index-content-item-bottom-loopPoint li.active{
		opacity:1;
		background:#eee;
	}
	#index-content-item-bottom-box-ccc{
		position:absolute;
		transition-duration:1000ms;
	}
	.index-content-item-bottom-content-box{
		float: right;
		width: 450px;
		height: 170px;
		margin-left: 20px;
	}
	.index-content-item-bottom-content-box-top{
		height: 170px;
		font-size: 14px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
		overflow: hidden;		
	}
	.index-content-item-bottom-content-box-top div:nth-child(1){
		margin-top:0;
	}
	.index-content-item-bottom-content-box-top>div{
		margin-top:16px;
	}
	.school-news-bottom-list,.school-news-bottom-list-a{
		border-bottom: 1px solid transparent;
	}
	.school-news-bottom-list span{
		font-size:14px;
    vertical-align: middle;
    color: grey;
	}
	.school-news-bottom-list:hover div, .school-news-bottom-list-a:hover div{
		color: dodgerblue !important; 
	}
	#index-content-item-bottom-box-img-box{
		float:left;
		height:302px;
		border:1px solid #ccc;
	}
	#index-content-item-bottom-box-photoBox{
		float:right;
	}
	.index-content-item-bottom-box-img-seminar{
		width:152px;
		height:100px;
		float:left;
		margin:20px 55px;
	}
	.index-content-item-bottom-box-img-seminar span{
		display:block;
		text-align:center;
	}
	.index-content-item-bottom-box-photoLink{
		height:140px;
		border:1px solid #ccc;
	}
	.index-content-item-bottom-box-photoLink:nth-child(3){
		margin-top:20px;
	}
	.index-content-item-bottom-box-meitijujiao{
		cursor: pointer;
		width:280px;
		height:124px;
		margin:0 10px;
		float:left;
	}
	.index-content-item-bottom-box-meitijujiao img{
		width:100%;
		height:100%;
	}
</style>
<div class="index-content-box clear">
	<div class="index-content-item-box">
		<div class="index-content-item-tit-box">
			<img src="./img/content/content-jiantou.png"/>
			<span>新闻资讯</span>
			<span style="color: #ababab;">Headlines</span>
			<span style="color: #ababab;" id="xueyuanmore" class="index-content-item-tit-more">MORE</span>
		</div>
		<div class="index-content-item-bottom-box clear">
			<div class="index-content-item-bottom-img-box" style="position: relative;float: left;">
				<ul class="index-content-item-bottom-loopPoint"></ul>
			</div>
			<div class="index-content-item-bottom-content-box">
				<div class="index-content-item-bottom-content-box-top">
									
				</div>			
			</div>
		</div>
	</div>
	<div class="index-content-item-box" style="float: right;height:230px;overflow:hidden;position:relative;width: 380px;">
		<div class="index-content-item-tit-box" style="position:relative">
			<img src="./img/content/content-jiantou.png"/>
			<span>通知公告</span>
			<span style="color: #ababab;">Notice Bulletin</span>
			<span style="color: #ababab;" id="tongzhigonggao" class="index-content-item-tit-more">MORE</span>
		</div>
		<div class="scrollArea" style="position:relative;height:200px;overflow:hidden;margin-top:-22px;">
			<div class="index-content-item-bottom-box clear" id="index-content-item-bottom-box-ccc" style="width: 380px;">			
					<div style="margin-top: 16px;cursor: pointer;display: none;" class="school-news-bottom-list-a school-news-bottom-list-a-clone">
						<img src="./img/content/content-news3.png" style="width: 20px;vertical-align: middle;"/>
						<div class="school-news-bottom-list-tit-a" style="display: inline-block;width: 220px;font-size: 14px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;vertical-align: middle;color: grey;">
							担惊受恐龙卷风多少了多少担惊受恐龙卷风多少了多少
						</div>
						<div class="school-news-bottom-list-time-a" style="display: inline-block;color: darkgray;font-size: 12px;vertical-align: middle;">
							2017-10-12
						</div>					
					</div>
			</div>
		</div>
	</div>
	<div class="index-content-item-box" style="display:none;">
		<div class="index-content-item-tit-box">
			<img src="./img/content/content-jiantou.png"/>
			<span>新闻资讯</span>
			<span style="color: #ababab;">College News</span>
		</div>
		<div class="index-content-item-bottom-box clear" style="width: 380px;">
			<div class="school-news-top-box">
				<div class="school-news-top-img-box" style="display: inline-block;width: 139px;height: 84px;border: 1px solid #e9e9e9;position: relative;">
					<img class="school-news-top-img-box-img-img" src="./img/content/content-news2.png" style="width: 135px;height: 80px;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;"/>
				</div>
				
			<div class="index-content-item-bottom-img index-content-item-bottom-img-clone" style="display:none;">
				<img src="./img/content/content-news1.png" style="width: 300px;height:170px;float:left;margin:auto"/>
			</div>
				<div style="display: inline-block;height: 87px;vertical-align: top;">
					<div class="school-news-top-img-box-tit-tit" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 230px;">
						2017正式祝贺我校2017正式祝贺我校2017正式祝贺我校
					</div>
					<div class="school-news-top-img-box-desc-desc" style="font-size: 12px;width: 230px;margin-top: 2px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">
						2017正式祝贺我校2017正式祝贺我校2017正式祝贺我校2017正式祝贺我校2017正祝贺我校2017正
					</div>		
					<div class="school-news-top-img-box-con-con" style="font-size: 14px;color: dodgerblue;padding-top: 5px;cursor: pointer;">
						查看详情>>
					</div>
				</div>
			</div>
			<div class="school-news-bottom-box" id="school-news-bottom-box-aaa" style="height: 160px;">
				<!--5-->
				<div style="cursor: pointer;display: none;" class="school-news-bottom-list school-news-bottom-list-clone">
					<img src="./img/content/content-news3.png" style="width: 20px;vertical-align: middle;"/>
					<span></span>
					<div class="school-news-bottom-list-tit" style="display: inline-block;width: 220px;font-size: 14px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;vertical-align: middle;color: grey;">
						担惊受恐龙卷风多少了多少担惊受恐龙卷风多少了多少
					</div>
					<div class="school-news-bottom-list-time" style="display: inline-block;color: darkgray;font-size: 12px;vertical-align: middle;">
						2017-10-12
					</div>					
				</div>		
			</div>
		</div>
	</div>

	<div class="index-content-item-box" style="float: left;margin-top: 40px;width:100%">
		<div class="index-content-item-tit-box">
			<img src="./img/content/content-jiantou.png"/>
			<span>专题导航</span>
			<span style="color: #ababab;">College Bulletin</span>
		</div>
		<div class="index-content-item-bottom-box clear" style="width:1200px;">
			<div id="index-content-item-bottom-box-img-box" style="width:790px;">
				<div class="index-content-item-bottom-box-img-seminar index-content-item-bottom-box-img-seminar-clone" style="cursor: pointer;display:none">
					<img src="./img/content/content-danwei-1.png" style="width: 100%;height: 100%;"/>	
					<span></span>
				</div>
			</div>
			<div id="index-content-item-bottom-box-photoBox" style="width:380px;">
				<div class="index-content-item-bottom-box-photoLink index-content-item-bottom-box-photoLink-clone" style="display:none"></div>
			</div>
		</div>
	</div>
	
	<div class="index-content-item-box" style="float: left;margin-top: 40px;width:100%">
		<div class="index-content-item-tit-box">
			<img src="./img/content/content-jiantou.png"/>
			<span>党建专题</span>
			<span style="color: #ababab;">Media Focus</span>
			<span style="color: #ababab;" id="dangjianmore" class="index-content-item-tit-more">MORE</span>
		</div>
		<div class="index-content-item-bottom-box clear">
			<div id="index-content-item-bottom-box-djzt">
				<div class="index-content-item-bottom-box-meitijujiao index-content-item-bottom-box-meitijujiao-clone" style="display:none;">
					<img src="./img/content/content-jujiao.png"/>
				</div>
			</div>				
		</div>	 
	</div>
</div>