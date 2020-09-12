<!-- 转阅文章详情模板 -->

<template>
    <div id="TransferDetail">
        <div class="main">
            <div class="article-item">
                <div class="article-title">
                    <div class="title-left">
                        <div class="author-img">
                            <img src="../../assets/images/people4.jpg" alt="">
                        </div>
                        <div class="person-info">
                            <div class="name">
                                <span>井柏然</span>
                            </div>
                            <div class="time">
                                <span>3小时前</span><span>来自iphone</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="article-intro">
                    <span>你赢了 [微笑]我服//@李荣浩:事情是这样的 修片界一直有这样一句谚语 修前井柏然 修后李荣浩 //@井柏然:@李荣浩 我有点不同意你这么说. 因为我们帅的很平均</span>
                </div>
                <div class="article-img">
                    <img src="../../assets/images/articleimg1.jpg" alt="">
                </div>
                <div class="shareto">
                    <span>分享到</span><i class="iconfont icon-weixin"></i><i class="iconfont icon-pengyouquan"></i>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="comment-item">
                <div class="person-img">
                    <img src="../../assets/images/people1.jpg" alt="">
                </div>
                <div class="comment-detail">
                    <div class="name">凡哥</div>
                    <div class="comment-content">这个厉害了,点个赞</div>
                    <div class="time">
                        <span>8-28</span><span>13:28</span><span>.</span><span>回复</span>
                    </div>
                </div>
            </div>
            <div class="comment-item">
                <div class="person-img">
                    <img src="../../assets/images/people2.jpg" alt="">
                </div>
                <div class="comment-detail">
                    <div class="name">李哥</div>
                    <div class="comment-content">这个厉害了,点个赞</div>
                    <div class="time">
                        <span>8-27</span><span>19:00</span><span>.</span><span>回复</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <van-cell-group>
              <van-field
                v-model="value"
                right-icon="smile-o"
                placeholder="评论"
              />
            </van-cell-group>
        </div>
    </div>
</template>
<!-- 逻辑 -->
<script>
    import Vue from 'vue';
    import { Icon,Button,Popup,Form,Field,CellGroup,Area } from 'vant';

    Vue.use(Icon);
    Vue.use(Button);
    Vue.use(Popup);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(CellGroup);
    Vue.use(Area);
    export default{
        name:'TransferDetail',
        data(){
            return {
                value:''
            }
        },
        methods:{
            
        }
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
  	#TransferDetail{
        position: relative;
        height: 812px;
        background-color: #ebebeb;
    }
    .main{
        height: auto;
        .article-item{
            width: 100%;
            height: auto;
            .rem(margin-bottom,5px);
            .rem(padding,15,20);
            box-sizing: border-box;
            background-color: #fff;
        }
    }
    .article-title{
        display: flex;
        justify-content: space-between;
        .title-left{
            .author-img{
                float: left;
                .rem(width,40px);
                .rem(height,40px);
                border-radius: 50%;
                overflow: hidden;
                img{
                    .rem(width,40px);
                    .rem(height,40px);
                }
            }
            .person-info{
                float: left;
                .rem(margin-top,5px);
                .rem(margin-left,5px);
                .name{
                    color: #000;
                    .rem(font-size,14);
                }
                .time{
                    color: #c2c2c2;
                    .rem(font-size,10);
                    span{
                        .rem(margin-right,5px);
                    }
                }
            }
        }
    }
    .article-intro{
        width: 100%;
        height: auto;
        color: #a1a1a2;
        .rem(font-size,10);
    }
    .article-img{
        .rem(margin,5,0);
        img{
            .rem(max-width,200px);
            .rem(height,150px);
        }
    }
    .shareto{
        color: #c0c0c0;
        text-align: center;
        .iconfont{
            color: #28d359;
            font-size: 24px;
        }
        .icon-weixin{
            .rem(margin,0,20px);
        }
    }
    .comment{
        width: 100%;
        .rem(height,200px);
        .rem(padding,10,20);
        .rem(margin-bottom,10);
        background-color: #fff;
        box-sizing: border-box;
    }
    .comment-item{
        width: 100%;
        height: auto;
        overflow: hidden;
        .rem(margin-bottom,10px);
        .person-img{
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
        .comment-detail{
            float: left;
            .name{
                color: #8d8d8d;
                .rem(font-size,12px);
            }
            .comment-content{
                color: #000;
            }
            .time{
                color: #8d8d8d;
                .rem(font-size,10px);
                span{
                    .rem(margin-right,5px);
                }
            }
        }
    }
</style>