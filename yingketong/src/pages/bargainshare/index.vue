<!-- 砍价首页模板 -->

<template>
    <div id="BargainShare">
        <div class="title">
            <img src="../../assets/images/bargainhometitle.png" alt="">
        </div>
        <div class="main">
            <div class="person-info">
                <div class="person-img">
                    <img src="../../assets/images/people3.jpg" alt="">
                </div>
                <div class="person-name">
                    <span>崔胜铉</span>
                </div>
            </div>
            <div class="title-text">
                <span>“我正在砍价商城免费拿商品，大家一起来砍价吧”</span>
            </div>
            <div class="product-detail">
                <div class="product-img">
                    <img src="../../assets/images/bargainproduct2.jpg" alt="">
                </div>
                <div class="product-info">
                    <div class="product-name">
                        <span>男士真皮手表</span>
                    </div>
                    <div class="product-price">
                        <span>原价:  ￥450</span>
                    </div>
                </div>
            </div>
            <div class="progress">
                <div class="progress-text">
                    已砍<span class="bargain-money impo">￥330</span>，已完成<span class="bargain-money impo">71%</span>，只差<span class="pay-money impo">￥120</span>即可成功
                </div>
                <van-progress :percentage="71" stroke-width="8" color="#eab2ff" track-color="#f8e6ff" :show-pivot="false"/>
            </div>
            <div class="countdown">
                剩余<van-count-down :time="time" style="margin: 0 10px;">
                  <template v-slot="timeData">
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                  </template>
                </van-count-down>结束
            </div>
            <div class="share">
                <van-button color="#eab2ff" class="vote" block size="large">请好友帮忙砍一刀</van-button>
            </div>
        </div>
        <div class="bargain-list">
            <div class="note-title">
                <div class="title-item line"></div>
                <div class="title-item">砍价记录</div>
                <div class="title-item line"></div>
            </div>
            <div class="note-list">
                <div class="note-item">
                    <div class="note-detail">
                        <div class="note-img">
                            <img src="../../assets/images/people3.jpg" alt="">
                        </div>
                        <div class="note-text">
                            <div class="note-name"><span>崔胜铉</span></div>
                            <div class="note-use"><span>使用狂砍道具狂砍一刀</span></div>
                        </div>
                    </div>
                    <div class="note-money">
                        <span>砍掉14.5</span>
                    </div>
                </div>
                <div class="note-item">
                    <div class="note-detail">
                        <div class="note-img">
                            <img src="../../assets/images/people5.jpg" alt="">
                        </div>
                        <div class="note-text">
                            <div class="note-name"><span>完成分享任务</span></div>
                            <div class="note-use"><span>奖励多砍一刀</span></div>
                        </div>
                    </div>
                    <div class="note-money">
                        <span>砍掉14.5</span>
                    </div>
                </div>
            </div>
        </div>
        <van-overlay :show="show" @click="show = true">
          <div class="wrapper" @click.stop>
            <div class="success">
                <i class="iconfont icon-chahao" @click="closeOverlay"></i>
                <div class="success-img">
                    <img src="../../assets/images/share2.png" alt="">
                </div>
                <div class="success-title"></div>
                <div class="success-text">
                    <div class="success-bargain"><span>您已成功砍掉</span></div>
                    <div class="success-money"><span>￥5.26</span></div>
                    <div class="success-item"><span>恭喜您成功又近了一步,听说邀请好友越多,</span></div>
                    <div class="success-item"><span>砍价成功的机会越大哦!</span></div>
                </div>
                <van-button round color="#eab2ff" class="help" block size="normal">邀请好友帮忙砍一刀</van-button>
            </div>
          </div>
        </van-overlay>
    </div>
</template>
<!-- 逻辑 -->
<script>
    import Vue from 'vue';
    import { Icon,Button,Popup,Form,Field,CellGroup,Area,Progress,CountDown,Overlay } from 'vant';

    Vue.use(Icon);
    Vue.use(Button);
    Vue.use(Popup);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(CellGroup);
    Vue.use(Area);
    Vue.use(Progress);
    Vue.use(CountDown);
    Vue.use(Overlay);
    export default{
        name:'BargainShare',
        data(){
            return {
                time: 30 * 60 * 60 * 1000,
                timeData:{
                    hours:3,
                    minutes:0,
                    seconds:0
                },
                show:true
            }
        },
        methods:{
            closeOverlay(){
                this.show = false;
            }
        }
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
  	#BargainShare{
        position: relative;
        height: 1000px;
        background-color: #f0c7ff;
    }
    .title{
        width: 100%;
        .rem(height,300px);
        img{
            width: 100%;
            .rem(height,300px);
        }
    }
    .main{
        position: relative;
        width: 90%;
        .rem(height,420px);
        .rem(margin-top,-180px);
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        background-color: #fff;
    }
    .person-info{
        position: absolute;
        .rem(top,-50px);
        left: 50%;
        .rem(margin-left,-40px);
        .rem(width,80px);
        .rem(height,100px);
        .person-img{
            .rem(width,80px);
            .rem(height,80px);
            border-radius: 50%;
            overflow: hidden;
            img{
                .rem(width,80px);
                .rem(height,80px);
            }
        }
        .person-name{
            color: #bdbdbd;
            .rem(font-size,12px);
            .rem(margin-top,5px);
            text-align: center;
        }
    }
    .title-text{
        position: absolute;
        .rem(top,50px);
        left: 2%;
        width: 96%;
        color: #000;
        .rem(font-size,12px);
        text-align: center;
    }
    .product-detail{
        position: absolute;
        .rem(top,70px);
        left: 2%;
        width: 96%;
        .rem(height,160px);
        .rem(padding,20,15);
        box-sizing: border-box;
        color: #000;
        background-color: #fdf7ff;
        border-radius: 10px;
        .product-img{
            float: left;
            .rem(width,120px);
            .rem(height,120px);
            .rem(margin-right,10px);
            img{
                .rem(width,120px);
                .rem(height,120px);
            }
        }
        .product-info{
            float: left;
            .product-price{
                color: #bdbdbd;
                .rem(font-size,12px);
                .rem(margin-top,70px);
            }
        }
    }
    .progress{
        position: absolute;
        .rem(top,250px);
        left: 6%;
        width: 88%;
        .rem(height,100px);
        .progress-text{
            width: 100%;
            .rem(height,25px);
            .rem(line-height,25px);
            .rem(font-size,10px);
            .rem(margin-bottom,15px);
            text-align: center;
            color: #000;
            border-radius: 20px;
            background-color: #f6deff;
            .impo{
                color:#ff0000;
            }
        }
    }
    .countdown{
        position: absolute;
        display: flex;
        justify-content: center;
        .rem(top,310px);
        left: 10%;
        width: 80%;
        .rem(height,100px);
        color:#000;
        .colon {
            display: inline-block;
            margin: 0 4px;
            color: #000;
        }
        .block {
            display: inline-block;
            width: 22px;
            color: #eab2ff;
            font-size: 12px;
            text-align: center;
            background-color: #f8e6ff;
        }
    }
    .share{
        position: absolute;
        .rem(top,350px);
        left: 10%;
        width: 80%;
        .rem(height,100px);
        border-radius: 10px;
    }
    .bargain-list{
        width: 90%;
        .rem(height,200px);
        .rem(padding,20,25);
        box-sizing: border-box;
        .rem(margin-top,20px);
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        background-color: #fff;
    }
    .note-title{
        color: #dc7dff;
        display: flex;
        justify-content: center;
        width: 100%;
        .rem(height,20px);
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 5px;
        .title-item{
            .rem(width,80px);
            box-sizing: border-box;
            text-align: center;
        }
        .line{
            .rem(height,10px);
            border-bottom: 2px solid #dc7dff;
        }
    }
    .note-list{
        width: 100%;
        .note-item{
            display: flex;
            justify-content: space-between;
            .rem(height,40px);
            .rem(padding,10,0);
            .rem(margin-bottom,20px);
            box-sizing: border-box;
            .note-detail{
                .note-img{
                    float: left;
                    .rem(width,40px);
                    .rem(height,40px);
                    .rem(margin-right,5px);
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        .rem(width,40px);
                        .rem(height,40px);
                    }
                }
                .note-text{
                    float: left;
                    .note-name{
                        color: #f0c7ff;
                        .rem(font-size,12px);
                        .rem(margin-top,5px);
                    }
                    .note-use{
                        color: #dbd9db;
                        .rem(font-size,10px);
                    }
                }
            }
            .note-money{
                color: #f0c7ff;
                .rem(margin-top,15px);
            }
        }
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .success {
        position: relative;
        .rem(width,250px);
        .rem(height,250px);
        background-color: #fff;
        border-radius: 10px;
        .icon-chahao{
            position: absolute;
            .rem(top,-30px);
            .rem(left,230px);
            color: #c2c2c2;
        }
        .success-img{
            position: absolute;
            .rem(top,-20px);
            .rem(left,23px);
            .rem(width,200px);
            .rem(height,70px);
            img{
                .rem(width,200px);
                .rem(height,70px);
            }
        }
        .success-title{
            .rem(width,250px);
            .rem(height,30px);
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background-color: #df9dff;
        }
        .success-text{
            color: #000;
            text-align: center;
            .success-bargain{
                .rem(font-size,16px);
                .rem(margin,10,0);
            }
            .success-money{
                color:#ff0000;
                .rem(margin,10,0);
                .rem(font-size,12px);
            }
            .success-item{
                color: #b2b3b8;
                .rem(margin,10,0);
                .rem(font-size,12px);
            }
        }
        .help{
            .rem(width,200px);
            .rem(margin-top,30px);
            .rem(font-size,16px);
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>