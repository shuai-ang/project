<!-- 模板 -->
<template>
    <div id="Charts">
        <div class="nav">
            <div class="nav-item">
                <i class="iconfont icon-gonggao"></i>
                <marquee :lists="lists" class="nav-text"></marquee>
            </div>
        </div>
        <Title />
        <!-- 按钮部分 -->
            <!-- <div class="action-list">
                <van-button color="#c753ff" class="action-item" block size="large" to="activitydec">活动简介</van-button>
                <van-button color="#c753ff" class="action-item" block size="large" to="charts">排行榜</van-button>
                <van-button color="#c753ff" class="action-item" block size="large" to="personinfo">个人信息</van-button>
            </div> -->
        <!--floor 信息展示部分 -->
        <div class="floor">
            <div class="floor-title">
                <div class="title-item line"></div>
                <div class="title-item">排行榜</div>
                <div class="title-item line"></div>
            </div>
            <div class="num-list">
                <div class="num-item" v-show="topTwoShow" @click="clickTopTwo">
                    <div class="head-img">
                        <img :src="topTwoImg" alt="">
                    </div>
                    <img src="../../assets/images/num2.png" class="num-icon">
                    <div class="name"><span>{{topTwoName}}</span></div>
                    <div class="tickets"><span>{{topTwoTicket}}票</span></div>
                </div>
                <div class="num1" v-show="topOneShow" @click="clickTopOne">
                    <div class="head-img">
                        <img :src="topOneImg" alt="">
                    </div>
                    <img src="../../assets/images/num1.png" class="num-icon">
                    <div class="name"><span>{{topOneName}}</span></div>
                    <div class="tickets"><span>{{topOneTicket}}票</span></div>
                </div>
                <div class="num-item" v-show="topThreeShow" @click="clickTopThree">
                    <div class="head-img">
                        <img :src="topThreeImg" alt="">
                    </div>
                    <img src="../../assets/images/num3.png" class="num-icon">
                    <div class="name"><span>{{topThreeName}}</span></div>
                    <div class="tickets"><span>{{topThreeTicket}}票</span></div>
                </div>
            </div>
            <div class="num-bottom">
                <div class="bottom-item" v-show="topFourShow" @click="clickTopFour">
                    <div class="bottom-img">
                        <img :src="topFourImg" alt="">
                    </div>
                    <div class="bottom-detail">
                        <div class="bottom-name"><span>{{topFourName}}</span></div>
                        <div class="bottom-ticket"><span>{{topFourTicket}}票</span></div>
                    </div>
                    <img src="../../assets/images/num4.png" class="bottom-icon">
                </div>
                <div class="bottom-item" v-show="topFiveShow" @click="clickTopFive">
                    <div class="bottom-img">
                        <img :src="topFiveImg" alt="">
                    </div>
                    <div class="bottom-detail">
                        <div class="bottom-name"><span>{{topFiveName}}</span></div>
                        <div class="bottom-ticket"><span>{{topFiveTicket}}票</span></div>
                    </div>
                    <img src="../../assets/images/num5.png" class="bottom-icon">
                </div>
            </div>
        </div>
        <Votebottom />
    </div>
</template>
<!-- 逻辑 -->
<script>
    import axios from 'axios';
	import marquee from '../../components/marquee';
    import Title from '../../components/title';
    import Votebottom from '../../components/votebottom';
    import Vue from 'vue';
    import { Search,Icon,Button } from 'vant';

    Vue.use(Search);
    Vue.use(Icon);
    Vue.use(Button);
    export default{
        name:'Charts',
        data(){
            return {
                lists:['本活动票数统计为用户分享链接后的拉粉数量,敬请期待新的活动。','10月1号将开展中秋节欢乐活动。'],
                //第一名
                topOneShow:false,
                topOneImg:'',
                topOneName:'',
                topOneTicket:'',
                topOneNum:'',
                //第二名
                topTwoShow:false,
                topTwoImg:'',
                topTwoName:'',
                topTwoTicket:'',
                topTwoNum:'',
                //第三名
                topThreeShow:false,
                topThreeImg:'',
                topThreeName:'',
                topThreeTicket:'',
                topThreeNum:'',
                //第四名
                topFourShow:false,
                topFourImg:'',
                topFourName:'',
                topFourTicket:'',
                topFourNum:'',
                //第五名
                topFiveShow:false,
                topFiveImg:'',
                topFiveName:'',
                topFiveTicket:'',
                topFiveNum:'',
            }
        },
        mounted(){
            this.getCharts()
        },
        methods:{
            getCharts(){
                var _this = this;
                var activityId = 1;
                axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/user_massage/rank?m_id='+activityId)
                .then(function (result) {
                    console.log(result);
                    var topFiveArr = result.data;
                    if(topFiveArr != []){
                        if(topFiveArr.length == 1){
                            _this.topOneDo(topFiveArr);
                        }
                        else if(topFiveArr.length == 2){
                            _this.topOneDo(topFiveArr);
                            _this.topTwoDo(topFiveArr);
                        }
                        else if(topFiveArr.length == 3){
                            _this.topOneDo(topFiveArr);
                            _this.topTwoDo(topFiveArr);
                            _this.topThreeDo(topFiveArr);
                        }
                        else if(topFiveArr.length == 4){
                            _this.topOneDo(topFiveArr);
                            _this.topTwoDo(topFiveArr);
                            _this.topThreeDo(topFiveArr);
                            _this.topFourDo(topFiveArr);
                        }
                        else if(topFiveArr.length == 5){
                            _this.topOneDo(topFiveArr);
                            _this.topTwoDo(topFiveArr);
                            _this.topThreeDo(topFiveArr);
                            _this.topFourDo(topFiveArr);
                            _this.topFiveDo(topFiveArr);
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            topOneDo(arr){
                this.topOneShow = true;
                var topOneInfo = arr[0];
                this.topOneImg = topOneInfo.head_img;
                this.topOneName = topOneInfo.user_name;
                this.topOneTicket = topOneInfo.number_ov;
                this.topOneNum = topOneInfo.user_number;
            },
            topTwoDo(arr){
                this.topTwoShow = true;
                var topTwoInfo = arr[1];
                this.topTwoImg = topTwoInfo.head_img;
                this.topTwoName = topTwoInfo.user_name;
                this.topTwoTicket = topTwoInfo.number_ov;
                this.topTwoNum = topTwoInfo.user_number;
            },
            topThreeDo(arr){
                this.topThreeShow = true;
                var topThreeInfo = arr[2];
                this.topThreeImg = topThreeInfo.head_img;
                this.topThreeName = topThreeInfo.user_name;
                this.topThreeTicket = topThreeInfo.number_ov;
                this.topThreeNum = topThreeInfo.user_number;
            },
            topFourDo(arr){
                this.topFourShow = true;
                var topFourInfo = arr[3];
                this.topFourImg = topFourInfo.head_img;
                this.topFourName = topFourInfo.user_name;
                this.topFourTicket = topFourInfo.number_ov;
                this.topFourNum = topFourInfo.user_number;
            },
            topFiveDo(arr){
                this.topFiveShow = true;
                var topFiveInfo = arr[4];
                this.topFiveImg = topFiveInfo.head_img;
                this.topFiveName = topFiveInfo.user_name;
                this.topFiveTicket = topFiveInfo.number_ov;
                this.topFiveNum = topFiveInfo.user_number;
            },
            clickTopOne(){
                var id = this.topOneNum;
                window.location.href = './#/personinfo?id='+id;
            },
            clickTopTwo(){
                var id = this.topTwoNum;
                window.location.href = './#/personinfo?id='+id;
            },
            clickTopThree(){
                var id = this.topThreeNum;
                window.location.href = './#/personinfo?id='+id;
            },
            clickTopFour(){
                var id = this.topFourNum;
                window.location.href = './#/personinfo?id='+id;
            },
            clickTopFive(){
                var id = this.topFiveNum;
                window.location.href = './#/personinfo?id='+id;
            },
        },
        computed:{
                ids:function(){
                    return this.$store.state.home.openid
                }
        },
        components:{
            marquee,
            Title,
            Votebottom
        },
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
    #Charts{
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
        .rem(padding-bottom,15);
        .rem(margin-bottom,40px);
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
        .num-list{
            width: 100%;
            .rem(height,150px);
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            .num-item{
                position: relative;
                .rem(width,75px);
                .rem(padding-top,15px);
                text-align: center;
                box-sizing: border-box;
                .head-img{
                    .rem(width,75px);
                    .rem(height,75px);
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        .rem(width,75px);
                        .rem(height,75px);
                    }
                }
                .num-icon{
                    position: absolute;
                    .rem(top,75px);
                    left: 50%;
                    .rem(margin-left,-10px);
                    .rem(width,20px);
                    .rem(height,20px);
                }
                .name{
                    .rem(margin-top,10px);
                    .rem(margin-bottom,3px);
                    
                }
            }
        }
        .num1{
            .rem(width,90px);
            position: relative;
            text-align: center;
            .head-img{
                .rem(width,90px);
                .rem(height,90px);
                border-radius: 50%;
                overflow: hidden;
                img{
                    .rem(width,90px);
                    .rem(height,90px);
                }
            }
            .num-icon{
                position: absolute;
                .rem(top,72px);
                left: 50%;
                .rem(margin-left,-10px);
                .rem(width,25px);
                .rem(height,25px);
            }
            .name{
                .rem(margin-top,10px);
                .rem(margin-bottom,3px);
                
            }
        }
    }
    .num-bottom{
        .bottom-item{
            position: relative;
            width: 100%;
            .rem(height,70px);
            .rem(padding,10,15);
            .rem(margin-bottom,15);
            color: #df9dff;
            background-color: #fff;
            border-radius: 5px;
            box-sizing: border-box;
            .bottom-img{
                float: left;
                .rem(width,50px);
                .rem(height,50px);
                border-radius: 50%;
                overflow: hidden;
                img{
                    .rem(width,50px);
                    .rem(height,50px);
                }
            }
            .bottom-detail{
                float: left;
                .rem(margin,10,15);
            }
            .bottom-icon{
                position: absolute;
                top: 0;
                .rem(right,10px);
                .rem(width,20px);
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