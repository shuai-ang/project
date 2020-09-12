<!-- 模板 -->
<template>
    <div id="EmptyPage">
        您的信息已经提交审核,系统将于24小时内予以回复。
    </div>
</template>
<!-- 逻辑 -->
<script>
	
    export default{
        name:'EmptyPage',
        data(){
            return {
                
            }
        },
        
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
  	#EmptyPage{
        position: relative;
        color: #000;
        .rem(font-size,12px);
        text-align: center;
        height: 100%;
        
    }
    
</style>