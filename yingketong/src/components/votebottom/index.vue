<template>
	<div id="Votebottom">
        <div class="bottom">
            <div class="btn-item" @click="toHome">
                <i class="iconfont icon-shouye"></i><span>活动首页</span>
            </div>
            <div class="btn-item paihangbang" @click="toCharts">
                <i class="iconfont icon-paihangbang"></i><span>排行榜</span>
            </div>
            <div class="btn-item" @click="toPerson">
                <i class="iconfont icon-baoming"></i><span>我要报名</span>
            </div>
        </div>
	</div>    
</template>
<script>
    import Vue from 'vue';

	export default{
		name:"Votebottom",
		methods: {
            toHome(){
                window.location.href = './#/home';
            },
            toCharts(){
                window.location.href = './#/charts';
            },
            toPerson(){
                window.location.href = './#/personinfo';
            }
        }
	}
</script>
<style scoped lang='less'>
    .bottom{
        position: fixed;
        bottom: 0;
        display: flex;
        width: 100%;
        .rem(height,40px);
        background-color: #000;
        .btn-item{
            flex-grow: 1;
            text-align: center;
            .rem(height,40px);
            .rem(line-height,40px);
            .rem(font-size,12px);
            .iconfont{
                .rem(margin-right,9px);
                .rem(font-size,16px);
            }
        }
        .paihangbang{
            border-left: 1px solid #ffffff;
            border-right: 1px solid #ffffff;
        }
    }
</style>