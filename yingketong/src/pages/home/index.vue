<!-- 模板 -->
<template>
    <div id="Home">
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
                <div class="title-item">参赛选手</div>
                <div class="title-item line"></div>
            </div>
            <div class="floor-list">
                <div class="floor-item" v-for="(player,index) in playerList" :key="index" @click="toPlayerInfo(player.user_number)">
                    <div class="item-img">
                        <img :src="player.head_img" alt="">
                    </div>
                    <div class="item-detail">
                        <div class="ticket-detail">
                            <div class="item-name">
                                <span>{{player.user_number}}.</span><span>{{player.user_name}}</span>
                            </div>
                            <div class="item-tickets">
                                <span>{{player.ticket}}票</span>
                            </div>
                        </div>
                        <!-- <van-button 
                            color="linear-gradient(to bottom, #f1d5ff, #df9dff)" 
                            class="vote" 
                            block size="large"
                            @click="onVote(index)"
                        >{{player.voted}}</van-button> -->
                    </div>
                </div>
                
            </div>
        </div>
        
        <!--bottom 报名按钮部分 -->
        <!-- <div>
            <van-button color="#c753ff" class="bottom" block size="large" @click="toGetactivity">我要发起活动</van-button>
        </div> -->
    </div>
</template>
<!-- 逻辑 -->
<script>
    import { GET_OPENID } from './store/types.js'
    import axios from 'axios';
	import marquee from '../../components/marquee';
    import Title from '../../components/title';
    import Vue from 'vue';
    import { Search,Icon,Button } from 'vant';

    Vue.use(Search);
    Vue.use(Icon);
    Vue.use(Button);
    export default{
        name:'Home',
        data(){
            return {
                lists:['本活动票数统计为用户分享链接后的拉粉数量,敬请期待新的活动。','10月1号将开展中秋节欢乐活动。'],
                visits:'',
                playerList:[
                    {
                        imgUrl:require('../../assets/images/person1.jpg'),
                        num:'01',
                        name:'随风起舞',
                        ticket:'2890',
                        //voted:'投票'
                    },
                    {
                        imgUrl:require('../../assets/images/person2.jpg'),
                        num:'02',
                        name:'曼舞翩翩',
                        ticket:'3000',
                        //voted:'投票'
                    },
                ],
                code:'',
                openid:''
            }
        },
        mounted(){
            console.log('openid..',window.localStorage.getItem('openId'))
            var openid = window.localStorage.getItem('openId');
            console.log(typeof openid)
            if(!openid || openid == "undefined"){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
                console.log('if..')
                this.getCode();
                this.getPlayerInfo();
            }else {
                console.log('else..')
                this.getPlayerInfo();
            }
            
        },
        beforeUpdate(){

        },
        methods:{
            
            getPlayerInfo(){
                var _this = this;
                var activityId = 1;
                //获取所有参赛选手信息
                axios.get('http://www.simpsonit.cn:80/ykt-1.1.1/user_massage/findAll?v_m_id='+activityId)
                .then(function (result) {
                    console.log(result);
                    var playerList = result.data;
                    console.log(playerList)
                    let newList = playerList.map(function(player){
                        player.user_name = decodeURI(player.user_name);
                        player.ticket = player.number_ov;
                        //player.voted = '投票';
                        return player;
                    })
                    console.log(newList)
                    _this.playerList = newList;
                  
                })
                .catch(function (error) {
                  console.log(error);
                })
            },
            // onVote(index){
            //     console.log(index)
            //     event.stopPropagation();
            //     var voted = this.playerList[index].voted;
            //     if(voted == '投票'){
            //         var ticket = (this.playerList[index].ticket / 1) + 1;
            //         this.playerList[index].ticket = ticket + '';
            //         this.playerList[index].voted = '已投票';
            //     }else if(voted == '已投票')
            //     {
            //         var ticket = (this.playerList[index].ticket / 1) - 1;
            //         this.playerList[index].ticket = ticket + '';
            //         this.playerList[index].voted = '投票';
            //     }
                
            // },
            getCode () { // 非静默授权，第一次有弹框
                var local = window.location.href; // 获取页面url
                var appid = 'wxfa3aaa2be645037f'; 
                this.code = this.getUrlCode().code // 截取code
                if (this.code == null || this.code === '') { // 如果没有code，则去请求
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
                    this.code = this.getUrlCode().code;
                    var code = this.code;
                    console.log('getCode..',code)
                    this.getId(code);
                } else {
                    // 你自己的业务逻辑
                    
                    var code = this.code;
                    this.getId(code)
                }
            },
            getId(code){
                var _this = this;
                console.log('getId..',code)
                axios.get('http://www.simpsonit.cn:80/ykt-1.1.1/wechat/callBack?code='+code)
                .then(function (result) {
                    console.log('result..',result)
                    console.log(result.data.openid);
                    var openid = result.data.openid;
                    _this.$store.commit(GET_OPENID,openid);
                    _this.openid = openid;
                    window.localStorage.setItem('openId',openid)
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            getUrlCode() { // 截取url中的code方法
                var url = location.search
                this.winUrl = url
                var theRequest = new Object()
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1)
                    var strs = str.split("&")
                    for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
                    }
                }
                return theRequest
            },
            toGetactivity(){
                window.location.href = './#/getactivity';
            },
            toPlayerInfo(id){
                // console.log('id...',id)
                var openid = window.localStorage.getItem('openId');
                console.log('openid..',openid)
                window.location.href = './#/personinfo?id='+id;
            }
        },
        computed:{
                ids:function(){
                    return this.$store.state.home.openid
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
  	#Home{
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
        width: 100%;
        box-sizing: border-box;
        .floor-title{
            display: flex;
            justify-content: center;
            width: 100%;
            .rem(height,20px);
            margin-bottom: 5px;
            .title-item{
                .rem(width,80px);
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
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .floor-item{
                .rem(width,131px);
                .rem(height,163px);
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 10px;
                .item-img{
                    width: 100%;
                    .rem(height,140px);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .item-detail{
                    .rem(height,20px);
                    font-size: 12px;
                    color: #000;
                    .rem(padding,3,8);
                    background-color: #fff;
                    
                    .ticket-detail{
                        
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                }
            }
        }
    }
    .bottom{
        position: fixed;
        .rem(top,450px);
        width: 60%;
        left: 20%;
        .rem(height,40px);
        .rem(line-height,40px);
        border-radius: 5px;
        font-weight: 300;
        color: #fff;
        text-align: center;
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