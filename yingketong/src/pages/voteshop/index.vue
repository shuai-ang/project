<!-- 投票购票模板 -->

<template>
    <div id="VoteShop">
        <div class="nav">
            <span>选择礼物</span>
        </div>
        <div class="main">
            <div class="gift">
                <div class="gift-item" v-for="(gift,index) in giftlist" :key="index" @click="showPrice(index)">
                    <div class="gift-img">
                        <img :src="gift.giftImg" alt="">
                    </div>
                    <div class="type">
                        <i class="iconfont icon-duihaoxuanzhong" v-show="gift.showIcon"></i><span>{{gift.type}}</span>
                    </div>
                    <div class="gift-price">
                        <span>{{gift.price}}元</span>
                    </div>
                </div>
                <!-- <div class="gift-item">
                    <div class="gift-img">
                        <img src="../../assets/images/green.png" alt="">
                    </div>
                    <div class="type">
                        <i class="iconfont icon-duihaoxuanzhong"></i><span>绿钻</span>
                    </div>
                    <div class="gift-price">
                        <span>3元</span>
                    </div>
                </div>
                <div class="gift-item">
                    <div class="gift-img">
                        <img src="../../assets/images/purple.png" alt="">
                    </div>
                    <div class="type">
                        <i class="iconfont icon-duihaoxuanzhong"></i><span>紫钻</span>
                    </div>
                    <div class="gift-price">
                        <span>5元</span>
                    </div>
                </div>
                <div class="gift-item">
                    <div class="gift-img">
                        <img src="../../assets/images/pink.png" alt="">
                    </div>
                    <div class="type">
                        <i class="iconfont icon-duihaoxuanzhong"></i><span>粉钻</span>
                    </div>
                    <div class="gift-price">
                        <span>10元</span>
                    </div>
                </div>
                <div class="gift-item">
                    <div class="gift-img">
                        <img src="../../assets/images/yellow.png" alt="">
                    </div>
                    <div class="type">
                        <i class="iconfont icon-duihaoxuanzhong"></i><span>黄钻</span>
                    </div>
                    <div class="gift-price">
                        <span>20元</span>
                    </div>
                </div>
                <div class="gift-item">
                    <div class="gift-img">
                        <img src="../../assets/images/black.png" alt="">
                    </div>
                    <div class="type">
                        <i class="iconfont icon-duihaoxuanzhong"></i><span>黑钻</span>
                    </div>
                    <div class="gift-price">
                        <span>50元</span>
                    </div>
                </div> -->
            </div>
            <div class="num">
                <div class="num-left">
                    <div class="num-ticket" v-if="showTicket">
                        <span>{{ticketMsg}}</span>
                    </div>
                    <div class="num-text" v-else>
                        <div><span>票数:  礼物票数 X 数量</span></div>
                        <div><span>总价:  礼物金额 X 数量</span></div>
                    </div>
                </div>
                <div class="num-right">
                    <span>数量:</span><span class="minus" @click="minusNum">-</span>
                    <input type="number" v-model="digit" class="shop-num" maxlength="3">
                    <span class="add" @click="addNum">+</span>
                </div>
            </div>
        </div>
        <div class="bottom" @click="payGift">
            <span>微信支付</span>
        </div>
    </div>
</template>
<!-- 逻辑 -->
<script>
    import Vue from 'vue';
    import { Icon,Button,Popup,Form,Field,CellGroup,Toast } from 'vant';

    Vue.use(Icon);
    Vue.use(Button);
    Vue.use(Popup);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(CellGroup);
    Vue.use(Toast);
    export default{
        name:'VoteShop',
        data(){
            return {
                showTicket:false,
                ticketMsg:'',
                digit:'1',
                giftIndex:null,
                giftlist:[
                    {
                        giftImg:require('../../assets/images/blue.png'),
                        type:'蓝钻',
                        price:'1',
                        showIcon:false
                    },
                    {
                        giftImg:require('../../assets/images/green.png'),
                        type:'绿钻',
                        price:'3',
                        showIcon:false
                    },
                    {
                        giftImg:require('../../assets/images/purple.png'),
                        type:'紫钻',
                        price:'5',
                        showIcon:false
                    },
                    {
                        giftImg:require('../../assets/images/pink.png'),
                        type:'粉钻',
                        price:'10',
                        showIcon:false
                    },
                    {
                        giftImg:require('../../assets/images/yellow.png'),
                        type:'黄钻',
                        price:'20',
                        showIcon:false
                    },
                    {
                        giftImg:require('../../assets/images/black.png'),
                        type:'黑钻',
                        price:'50',
                        showIcon:false
                    }
                ]
            }
        },
        methods:{
            showPrice(index){
                console.log(index)
                this.giftIndex = index;
                if(index >= 0){
                    for(var i=0;i<this.giftlist.length;i++){
                        this.giftlist[i].showIcon = false;
                    }
                    this.giftlist[index].showIcon = true;
                    this.showTicket = true;
                    if(index == 0){
                        this.ticketMsg = '单价1元,抵10票!'
                    }else if(index == 1){
                        this.ticketMsg = '单价3元,抵35票!'
                    }else if(index == 2){
                        this.ticketMsg = '单价5元,抵60票!'
                    }else if(index == 3){
                        this.ticketMsg = '单价10元,抵115票!'
                    }else if(index == 4){
                        this.ticketMsg = '单价20元,抵230票!'
                    }else if(index == 5){
                        this.ticketMsg = '单价50元,抵550票!'
                    }
                }else{
                    return null
                }
                
                
            },
            addNum(){
                var inputVal = this.digit - 0;
                console.log(inputVal)
                this.digit = inputVal + 1 + '';
            },
            minusNum(){
                var inputVal = this.digit - 0;
                console.log(inputVal)
                if(inputVal > 1){
                    this.digit = inputVal - 1 + '';
                }else if(inputVal <= 1){
                    return;
                }
            },
            payGift(){
                var index = this.giftIndex;
                var num = this.digit;//购买礼物数量
                console.log(index)
                if(index == null){
                    Toast('请选择礼物');
                    return
                }else{
                    //1.计算礼物抵的总票数 = 单个抵的票数*数量
                    //2.计算礼物的总价 = 单价*数量
                    var tickets = 0;
                    var prices = 0;
                    if(index == 0){
                        tickets = num*10;
                        prices = num*(this.giftlist[index].price - 0)
                    }else if(index == 1){
                        tickets = num*35;
                        prices = num*(this.giftlist[index].price - 0)
                    }else if(index == 2){
                        tickets = num*60;
                        prices = num*(this.giftlist[index].price - 0)
                    }else if(index == 3){
                        tickets = num*115;
                        prices = num*(this.giftlist[index].price - 0)
                    }else if(index == 4){
                        tickets = num*230;
                        prices = num*(this.giftlist[index].price - 0)
                    }else if(index == 5){
                        tickets = num*550;
                        prices = num*(this.giftlist[index].price - 0)
                    }
                    console.log('tickets..',tickets)
                    console.log('prices..',prices)
                }
            }
        }
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
  	#VoteShop{
        position: relative;
        height: auto;
    }
    .nav{
        width: 100%;
        .rem(height,50px);
        .rem(line-height,50px);
        color: #000;
        text-align: center;
    }
    .main{
        width: 100%;
        .rem(height,400px);
        .rem(padding,0,10);
        box-sizing: border-box;
        .gift{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            .rem(height,300px);
            .gift-item{
                .rem(width,85px);
                .rem(height,150px);
                color: #000;
                text-align: center;
                .gift-img{
                    .rem(width,85px);
                    .rem(height,100px);
                    img{
                        .rem(width,85px);
                        .rem(height,100px);
                    }
                }
                .type{
                    .iconfont{

                        color: #82d842;
                    }
                }
            }
        }
        .num{
            overflow: hidden;
            width: 100%;
            color: #cdcdcd;
            .rem(font-size,12px);
            .num-left{
                float: left;
                .num-ticket{
                    .rem(margin-top,10px);
                }
            }
            .num-right{
                float: right;
                .rem(margin-top,5px);
                .rem(margin-right,5px);
                .minus{
                    display: inline-block;
                    .rem(width,23px);
                    .rem(height,25px);
                    .rem(line-height,25px);
                    .rem(margin-left,10px);
                    text-align: center;
                    border:1px solid #cdcdcd;
                    box-sizing: border-box;
                }
                .shop-num{
                    .rem(width,28px);
                    .rem(height,25px);
                    .rem(line-height,25px);
                    text-align: center;

                    border:1px solid #cdcdcd;
                    border-left: none;
                    border-right: none;
                    box-sizing: border-box;
                }
                .add{
                    display: inline-block;
                    .rem(width,23px);
                    .rem(height,25px);
                    .rem(line-height,25px);
                    text-align: center;
                    border:1px solid #cdcdcd;
                    box-sizing: border-box;
                }
            }
        }
    }
    .bottom{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        .rem(height,30px);
        .rem(line-height,30px);
        .rem(font-size,14px);
        color: #fff;
        background-color: #82d842;
        border-radius: 18px;
    }
</style>