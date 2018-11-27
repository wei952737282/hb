<div class="second-menu-box clear">
	<style type="text/css">
		.second-menu-box{
			position: relative;
		}
		.second-menu-left{
			width: 230px;
			position: absolute;
			top: -60px;
			left: 0;
			z-index: 10;
			background: white;
		}
		.second-menu-right{
			width: 935px;
			float: right;
		}
		.second-menu-left-tit{
			background: #0e3088;
			height: 60px;
			line-height: 60px;
		}
		.second-menu-left-item{
			height: 49px;
			font-size: 14px;
			line-height: 49px;
			border-bottom: 1px solid #e9e9e9;
			cursor: pointer;
		}
		.second-menu-left-item span{
			margin-left: 40px;
		}
		.second-menu-left-item:hover{
			color: dodgerblue;
		}
		.second-menu-left-item-active{
			background: #f6f6f6;
			color: dodgerblue;
		}
		.second-menu-content-top-box{
			height: 43px;
			border-bottom: 2px solid #0e3088;
		}
		.second-menu-content-top-box-left{
			float: left;
			height: 43px;
			line-height: 43px;
			font-size: 12px;
		}
		.second-menu-content-top-box-right{
			float: right;
			height: 43px;
			line-height: 43px;
			color: #bdbdbd;
			font-size: 12px;		
			margin-left: 5px;
		}		
	</style>	
	<div class="second-menu-left">
		{{#with slideTit}}
		<div class="second-menu-left-tit">
			<span style="color: white;margin-left: 40px;font-weight: 300;">{{this}}</span>
		</div>
		{{/with}}
		{{#each slideMenu}}
		
		<div class="second-menu-left-item"  none={{this.none}} name={{this.name}} cId={{this.id}} showType={{this.showType}} pId={{this.pId}}>
			<span>{{this.name}}</span>
		</div>
		<!--<div class="second-menu-left-item second-menu-left-item-active">
			<span>党委机关</span>
		</div>	-->
		{{/each}}
	</div>
	
	<div class="second-menu-right">
		<div class="second-menu-content-top-box">
			{{#with leftTit}}
			<span class="second-menu-content-top-box-left">{{this}}</span>
			{{/with}}
			
			{{#each breadNav}}
			<span class="second-menu-content-top-box-right" > {{this}} </span>
			{{/each}}
			
			<span class="second-menu-content-top-box-right">当前位置：</span>
		</div>		
		
		<div class="second-menu-content-bottom-box">
			
		</div>
	</div>
	
	
</div>