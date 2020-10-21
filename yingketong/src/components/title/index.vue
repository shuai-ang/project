<template>
	<div id="Title">
		<div class="title">
           <img src="../../assets/images/baner.png">
        </div>
        <!--main 主体部分 -->
        <div class="main">
            <div class="activity-num">
                <ul class="num-list">
                    <li class="num-item person-num">
                        <img src="../../assets/images/icon1.png" alt="">
                        <div class="num-detail">
                            <p class="person-text">参赛人数</p>
                            <p id="person-nums">{{playerNums}}</p>
                        </div>
                    </li>
                    <li class="num-item ticket-num">
                        <img src="../../assets/images/icon2.png" alt="">
                        <div class="num-detail">
                            <p class="person-text">累积投票</p>
                            <p id="person-nums">{{tickets}}</p>
                        </div>
                    </li>
                    <li class="num-item visit-num">
                        <img src="../../assets/images/icon3.png" alt="">
                        <div class="num-detail">
                            <p class="person-text">访问量</p>
                            <p id="person-nums">{{visits}}</p>
                        </div>
                    </li>
                </ul>
                <form action="/" class="search-box">
                  <van-search
                    v-model="value"
                    placeholder="请输入参赛编号"
                    shape="round"
                    background="#df9dff"
                    left-icon="none"
                    @search="onSearch"
                    :clearable="false"
                  />
                  <img src="../../assets/images/search.png" class="search-img" @click="searchPlayer">
                </form>
            </div>
            <!-- 倒计时部分 -->
            <div class="countdown">
                <div class="countdown-time">
                    <i class="iconfont icon-naozhong"></i>
                    <span>距活动结束还有:</span><van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
                </div>
                <div class="countdown-date">
                    <div class="start-time time">
                        <span>开始时间:</span><span>2020年</span><span>09月</span><span>10日</span>
                    </div>
                    <div class="end-time time">
                        <span>结束时间:</span><span>2020年</span><span>09月</span><span>30日</span>
                    </div>
                    <div class="attention">
                        <span>提示:本活动只限于许昌地区用户参与!每个微信号每天只限3次投票次数,对违规行为系统将做进一步处理。</span>
                    </div>
                </div>
            </div>
            <!-- 按钮部分 -->
            <div class="action-list">
                <van-button color="#c753ff" class="action-item" block size="large" to="activitydec">活动简介</van-button>
                <van-button color="#c753ff" class="action-item" block size="large" to="charts">排行榜</van-button>
                <van-button color="#c753ff" class="action-item" block size="large" to="personinfo">个人信息</van-button>
            </div>
        </div>
	</div>    
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import { CountDown } from 'vant';
    Vue.use(CountDown);

	export default{
		name:"Title",
        // props:{
        //     visit:{
        //       type:Number,

        //     }
        // },
		data(){
			return{
                visits:'',
				value:'',
                time: 0,
                nowTime: Date.now(),
                playerNums:'',
                tickets:''
			}
		},
        mounted(){
            this.getVisits();
            this.getTime();
            this.getPeopleTickets();
        },
		methods: {
            onSearch(val) {
                console.log(val);
                this.searchPlayer()
            },
            onCancel() {
              console.log('取消');
            },
            //判断页面是首次加载还是刷新,获取首页访问量
            getVisits(){
                var activityId = 1;
                var _this = this;
                if (window.performance.navigation.type == 1) {
                    console.log("页面被刷新")
                    axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/vote_massages/fw?m_id='+activityId)
                    .then(function (result) {
                        console.log(result);
                        var visits = result.data;
                        _this.visits = visits - 1;
                    })
                }else{
                    console.log("首次被加载")
                    axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/vote_massages/fw?m_id='+activityId)
                    .then(function (result) {
                        console.log(result);
                        var visits = result.data;
                        _this.visits = visits;
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                }
            },
            //计算活动结束距离现在的时间
            getTime(){
                var endDate = new Date('2020-10-01'.replace(/\-/g, "/"));
                var time1 = endDate.getTime();
                console.log(time1)
                console.log(this.nowTime)
                this.time = time1 - this.nowTime;
                if(this.time <=0){
                    this.time = 0;
                }
            },
            //获取参赛人数和累计投票
            getPeopleTickets(){
                var activityId = 1;
                var _this = this;
                axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/vote_massages/findId?m_id='+activityId)
                .then(function (result) {
                    var activityinfo = result.data;
                    _this.playerNums = activityinfo.activity_num + '';
                    _this.tickets = activityinfo.c_voting + '';
                })
                .catch(function (error) {
                  console.log(error);
                })
            },
            searchPlayer(){
                console.log('search..')
                var str = this.value;
                var id = str.replace(/\s*/g,'');
                if(id){
                    var _this = this;
                    axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/user_massage/findId?user_number='+id)
                    .then(function (result) {
                        console.log(result);
                        if(result && (result.data != '')){
                            window.location.href = './#/personinfo?id='+id;
                        }else{
                            return;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    
                }else{
                    return
                }
                
            }
        }
	}
</script>
<style scoped lang='less'>
	.title{
        width: 100%;
        .rem(height,170px);
        img{
            width: 100%;
            .rem(height,170px);
        }
    }
    .main{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        .rem(height,300px);
        box-sizing: border-box;
        
        .activity-num{
            width: 90%;
            .rem(height,110px);
        }
        .countdown{
            .rem(width,290px);
            .rem(height,147px);
        }
        .action-list{
            .rem(width,290px);
            .rem(height,50px);
        }
    }
    .num-list{
        font-size: 12px;
        .rem(padding-top,10);
        .rem(height,50px);
        margin-left: auto;
        margin-right: auto;
        .num-item{
            display: flex;
            float: left;
            .rem(width,95px);
            .rem(height,50px);
            padding-left: 5px;
            box-sizing: border-box;
            border-right: 1px solid #fff;
            img{
                float: left;
                margin-top: 20px;
                .rem(margin-right,10px);
                .rem(width,25px);
                .rem(height,25px);

            }
            .num-detail{
                float: right;
                p{
                    padding: 0 !important;
                    color: #fff !important;
                    margin-bottom: 10px;
                }
                .person-text{
                    margin-top: 10px;
                }
            }
        }
        .visit-num{
            border-right: none;
        }
    }
    .search-box{
        position: relative;
        .search-img{
            position: absolute;
            .rem(top,15px);
            .rem(right,20px);
            .rem(width,15px);
            .rem(height,15px);
        }
    }
    
    .countdown{
        /*position: absolute;
        .rem(top,280px);*/
        
        font-size: 14px;
        span{
            margin-left: 3px;
        }
        .countdown-time{
            margin-bottom: 3px;
            .icon-naozhong{
                margin-right: 10px;
            }
            .van-count-down {
                color: #fff;
                display: inline-block;
                margin-left: 8px;
            }    
        }
        .countdown-date{
            width: 100%;
            height: 130px;
            .rem(padding,5,10,10,10);
            box-sizing: border-box;
            color: #000;
            background-color: #fff;
            border-radius: 5px;
            .time{
                margin-bottom: 5px;
            }
        }
    }
    .action-list{
        /*position: absolute;
        .rem(top,430px);*/
        display: flex;
        justify-content: space-around;
        align-items: center;
        
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