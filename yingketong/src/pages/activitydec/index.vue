<!-- 模板 -->
<template>
    <div id="ActivityDec">
        <div class="nav">
            <div class="nav-item">
                <i class="iconfont icon-gonggao"></i>
                <marquee :lists="lists" class="nav-text"></marquee>
            </div>
        </div>
        <Title />
        <!-- 按钮部分 -->
            <div class="action-list">
                <van-button color="#c753ff" class="action-item" block size="large" to="activitydec">活动简介</van-button>
                <van-button color="#c753ff" class="action-item" block size="large" to="charts">排行榜</van-button>
                <van-button color="#c753ff" class="action-item" block size="large" to="personinfo">个人信息</van-button>
            </div>
        <!--floor 信息展示部分 -->
        <div class="floor">
            <div class="floor-title">
                <div class="title-item line"></div>
                <div class="title-item">活动简介</div>
                <div class="title-item line"></div>
            </div>
            <div class="floor-list">
                <div class="floor-item">
                    <div class="item-title">活动时间:</div>
                    <div class="item-detail">
                        2020年8月20日-2020年8月31日。
                    </div>
                </div>
                <div class="floor-item">
                    <div class="item-title">投票方式:</div>
                    <div class="item-detail">
                        搜索您喜欢的选手,并点击投票即可。
                    </div>
                </div>
                <div class="floor-item">
                    <div class="item-title">投票条件:</div>
                    <div class="item-detail">
                        投票时,需要登录您的微信号,关注"营客推广通"公众号,同一账号一天只能投一票。
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<!-- 逻辑 -->
<script>
	import marquee from '../../components/marquee';
    import Title from '../../components/title';
    import Vue from 'vue';
    import { Search,Icon,Button } from 'vant';

    Vue.use(Search);
    Vue.use(Icon);
    Vue.use(Button);
    export default{
        name:'ActivityDec',
        data(){
            return {
                lists:['本活动票数统计为用户分享链接后的拉粉数量,敬请期待新的活动。','8月20号将开展七夕节欢乐活动。'],
            }
        },
        components:{
            marquee,
            Title
        },
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
    #ActivityDec{
        position: relative;
        background-color: #df9dff;
        height: 100%;
        
    }
    .nav{
        position: absolute;
        top: 0;
        width: 100%;
        .rem(height,20px);
        .rem(line-height,20px);
        .rem(padding,0,20);
        background-color: rgba(176,172,177,0.7);
        box-sizing: border-box;
        color: #fff;
        .rem(font-size,8px);
        
    }
    .nav-item{
        .rem(height,20px);
        .rem(line-height,20px);
        box-sizing: border-box;
        .icon-gonggao{
            .rem(font-size,8px);
            vertical-align: 7px;
            margin-right: 10px;
        }
        .nav-text{
            display: inline-block;
            width: 92%;
        }
    }
    
    .floor{
        margin-top: 15px;
        padding: 0 8%;
        .rem(padding-bottom,15px);
        width: 100%;
        box-sizing: border-box;
        .floor-title{
            display: flex;
            justify-content: center;
            width: 100%;
            .rem(height,20px);
            margin-bottom: 8px;
            .title-item{
                .rem(width,80px);
                .rem(font-size,14px);
                font-weight: 500;
                box-sizing: border-box;
                text-align: center;
            }
            .line{
                .rem(height,10px);
                border-bottom: 2px solid #fff;
            }
        }
        .floor-list{
            width: 100%;
            .rem(height,150px);
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .floor-item{
                margin-bottom: 8px;
                font-weight: 300;
                .item-title{
                    .rem(font-size,10px);
                    .rem(width,70px);
                    margin-bottom: 8px;
                    background: linear-gradient(to right, #b22af4, transparent);
                }
                .item-detail{
                    .rem(font-size,10px);
                }
            }
        }
    }
    .action-list{
        position: absolute;
        .rem(top,430px);
        .rem(margin-left,13px);
        display: flex;
        justify-content: space-around;
        align-items: center;
        .rem(width,290px);
        .rem(height,50px);
        .action-item{
            .rem(width,60px);
            .rem(height,30px);
            .rem(line-height,30px);
            text-align: center;
            font-size: 14px;
            background-color: #000;
            border-radius: 5px;
        }
    }
</style>