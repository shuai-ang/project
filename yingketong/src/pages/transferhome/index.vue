<!-- 砍价首页模板 -->

<template>
    <div id="TransferHome">
        <div class="nav">
            <div class="nav-list">
                <div class="nav-item"><span>关注</span></div>
                <div class="nav-item active"><span>最热</span></div>
                <div class="nav-item"><span>推荐</span></div>
            </div>
            <div id="add">
                <van-icon name="add" color="#c9c9c9" size="20"/>    
            </div>
            
            <div class="add-box"></div>
            <div class="write-box">
                <span>写说说</span>
            </div>
        </div>
        <div class="main">
            <div class="article-item" @click="toDetail">
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
                    <div class="follow">
                        <span>关注</span>
                    </div>
                </div>
                <div class="article-intro">
                    <span>你赢了 [微笑]我服//@李荣浩:事情是这样的 修片界一直有这样一句谚语 修前井柏然 修后李荣浩 //@井柏然:@李荣浩 我有点不同意你这么说. 因为我们帅的很平均</span>
                </div>
                <div class="article-img">
                    <img src="../../assets/images/articleimg1.jpg" alt="">
                </div>
                <div class="item-bottom">
                    <div class="browse">
                        <span>浏览3892次</span>
                    </div>
                    <div class="bottom-right">
                        <div class="give-like">
                            <van-icon name="good-job-o"/><span class="like-count">72</span>
                        </div>
                        <div class="share">
                            <van-icon name="share"/><span class="share-count">35</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="article-item" @click="toDetail">
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
                    <div class="follow">
                        <span>关注</span>
                    </div>
                </div>
                <div class="article-intro">
                    <span>你赢了 [微笑]我服//@李荣浩:事情是这样的 修片界一直有这样一句谚语 修前井柏然 修后李荣浩 //@井柏然:@李荣浩 我有点不同意你这么说. 因为我们帅的很平均</span>
                </div>
                <div class="article-img">
                    <img src="../../assets/images/articleimg1.jpg" alt="">
                </div>
                <div class="item-bottom">
                    <div class="browse">
                        <span>浏览3892次</span>
                    </div>
                    <div class="bottom-right">
                        <div class="give-like">
                            <van-icon name="good-job-o"/><span class="like-count">72</span>
                        </div>
                        <div class="share">
                            <van-icon name="share"/><span class="share-count">35</span>
                        </div>
                    </div>
                </div>
            </div>
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
        name:'TransferHome',
        data(){
            return {
                
            }
        },
        methods:{
            toDetail(){
                window.location.href = "/#/transferdetail"
            }
        }
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
  	#TransferHome{
        position: relative;
        height: 812px;
        background-color: #ebebeb;
    }
    .nav{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        margin-bottom: 5px;
        width: 100%;
        .rem(padding,0,20);
        .rem(font-size,12);
        .rem(height,25);
        .rem(line-height,25);
        background-color: #fff;
        box-sizing: border-box;
    }
    .nav-list{
        .nav-item{
            color:#c9c9c9;
            float: left;
            margin-right: 10px;
        }
        .active{
            color: #000;
            .rem(font-size,14);
            font-weight: 500;
            border-bottom: 2px solid #df9dff;
            box-sizing: border-box;
        }
    }
    .van-icon-add{
        .rem(margin-top,5px);
    }
    
    .add-box{
        display: none;
        position: absolute;
        .rem(top,20px);
        .rem(right,25px);
        width: 0px;
        border-top: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #4e4e4e;
        border-left: 5px solid transparent;
    }
    .write-box{
        display: none;
        position: absolute;
        .rem(top,28px);
        right: 0.218rem;
        .rem(font-size,12);
        .rem(width,70px);
        .rem(height,25px);
        .rem(line-height,25px);
        text-align: center;
        color: #fff;
        background-color: #4e4e4e;
        border-radius: 5px;
    }
    #add:hover .add-box{
        display: block;
    }
    #add:hover .write-box{
        display: block;
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
        .follow{
            .rem(width,60px);
            .rem(height,30px);
            .rem(line-height,30px);
            text-align: center;
            color: #df9dff;
            border:1px solid #df9dff;
            border-radius: 15px;
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
    .item-bottom{
        display: flex;
        justify-content: space-between;
        color: #a1a1a2;
        .rem(font-size,12);
        .rem(height,15px);
        .rem(line-height,15px);
        .bottom-right{
            .give-like{
                float: left;
                .rem(margin-right,10px);

            }
            .share{
                float: left;
            }
        }
    }
</style>