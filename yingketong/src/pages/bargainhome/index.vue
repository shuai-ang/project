<!-- 砍价首页模板 -->

<template>
    <div id="BargainHome">
        <div class="title">
            <img src="../../assets/images/bargainhometitle.png" alt="">
        </div>
        
        <div class="main">
            <div class="nav-img">
                <img src="../../assets/images/bargainhomenav.png" alt="">
            </div>
            <div class="product-floor">
                <div class="product-item" @click="addAddress">
                    <div class="product-detail">
                        <div class="shop-text">
                            <span>已送出</span><span class="shop-num">3892</span><span>件</span>
                        </div>
                        <div class="product-name">
                            <span>折叠自行车</span>
                        </div>
                        <div class="product-img">
                            <img src="../../assets/images/bargainproduct1.jpg" alt="">
                        </div>
                        <van-button color="#9d04d6" class="vote vote-left" block size="normal" round>点击免费拿</van-button>
                    </div>
                    <div class="mode-left"></div>
                </div>
                <div class="product-item" @click="addAddress">
                    <div class="product-detail">
                        <div class="shop-text">
                            <span>已送出</span><span class="shop-num">4695</span><span>件</span>
                        </div>
                        <div class="product-name">
                            <span>男士真皮手表</span>
                        </div>
                        <div class="product-img">
                            <img src="../../assets/images/bargainproduct2.jpg" alt="">
                        </div>
                        <van-button color="#9d04d6" class="vote vote-right" block size="normal" round>点击免费拿</van-button>
                    </div>
                    <div class="mode-right"></div>
                </div>
            </div>
            <div class="product-floor">
                <div class="product-item" @click="addAddress">
                    <div class="product-detail">
                        <div class="shop-text">
                            <span>已送出</span><span class="shop-num">3892</span><span>件</span>
                        </div>
                        <div class="product-name">
                            <span>折叠自行车</span>
                        </div>
                        <div class="product-img">
                            <img src="../../assets/images/bargainproduct1.jpg" alt="">
                        </div>
                        <van-button color="#9d04d6" class="vote vote-left" block size="normal" round>点击免费拿</van-button>
                    </div>
                    <div class="mode-left"></div>
                </div>
                <div class="product-item" @click="addAddress">
                    <div class="product-detail">
                        <div class="shop-text">
                            <span>已送出</span><span class="shop-num">4695</span><span>件</span>
                        </div>
                        <div class="product-name">
                            <span>男士真皮手表</span>
                        </div>
                        <div class="product-img">
                            <img src="../../assets/images/bargainproduct2.jpg" alt="">
                        </div>
                        <van-button color="#9d04d6" class="vote vote-right" block size="normal" round>点击免费拿</van-button>
                    </div>
                    <div class="mode-right"></div>
                </div>
            </div>
            <div class="product-floor">
                <div class="product-item" @click="addAddress">
                    <div class="product-detail">
                        <div class="shop-text">
                            <span>已送出</span><span class="shop-num">3892</span><span>件</span>
                        </div>
                        <div class="product-name">
                            <span>折叠自行车</span>
                        </div>
                        <div class="product-img">
                            <img src="../../assets/images/bargainproduct1.jpg" alt="">
                        </div>
                        <van-button color="#9d04d6" class="vote vote-left" block size="normal" round>点击免费拿</van-button>
                    </div>
                    <div class="mode-left"></div>
                </div>
                <div class="product-item" @click="addAddress">
                    <div class="product-detail">
                        <div class="shop-text">
                            <span>已送出</span><span class="shop-num">4695</span><span>件</span>
                        </div>
                        <div class="product-name">
                            <span>男士真皮手表</span>
                        </div>
                        <div class="product-img">
                            <img src="../../assets/images/bargainproduct2.jpg" alt="">
                        </div>
                        <van-button color="#9d04d6" class="vote vote-right" block size="normal" round>点击免费拿</van-button>
                    </div>
                    <div class="mode-right"></div>
                </div>
            </div>
        </div>
        <!-- 底部弹出层：添加收货地址选项 -->
        <van-popup
          v-model="show"
          
          position="bottom"
          :style="{ height: '90%' }"
        >
            <div class="address">
                <div class="choose-address">
                    <span>选择收货地址</span>
                    <van-icon name="cross" size="20" @click="cancel"/>
                </div>
                <!-- 没有地址数据时,点击添加收货地址 -->
                <div class="add-address" @click="showAddress" v-if="address">
                    <span>添加新的收货地址</span>
                    <van-icon name="arrow" color="#ececec"/>
                </div>
                <!-- 有地址数据时 -->
                <div class="address-list" v-else>
                    <div class="address-item">
                        <van-icon name="location" color="#938af9" size="24"/>
                        <div class="address-detail">
                            <div class="user-name">
                                <span>张三</span><span class="user-tel">18337400000</span>
                            </div>
                            <div class="address-text">
                                <span>河南省</span><span>许昌市</span><span>魏都区</span><span>帝豪路颖泽花园快递柜</span>
                            </div>
                        </div>
                        <van-icon name="success" id="right" color="#ff0000" size="24"/>
                    </div>
                    <div class="add-address" @click="showAddress">
                        <span>添加新的收货地址</span>
                        <van-icon name="arrow" color="#ececec"/>
                    </div>
                    <div class="bargain-list">
                        <div class="bargain-img">
                            <img src="../../assets/images/bargainproduct2.jpg" alt="">
                            <div class="bargain-detail">
                                <span>已选"均码""黑色"</span>
                            </div>
                        </div>
                        <div class="size">
                            <h3>尺码</h3>
                            <ul class="size-num">
                                <li class="item active">均码</li>
                            </ul>
                        </div>
                        <div class="color">
                            <h3>颜色分类</h3>
                            <ul class="color-item">
                                <li class="item">金色</li>
                                <li class="item">白色</li>
                                <li class="item active">黑色</li>
                                <li class="item">蓝色</li>
                            </ul>
                        </div>
                    </div>
                    <van-button color="#e3a1ff" id="start" block size="normal" round to="bargainshare">立即兑换</van-button>
                    
                </div>

            </div>
        </van-popup>
        <!-- 中间弹出层：添加收货地址 -->
        <van-popup
          v-model="showAdd"
          :style="{ height: '50%' }"
        >
            <div class="show-address">
                <div class="addresslist">
                    <span>添加收货地址</span>
                    <van-icon name="cross" color="#ccc" @click="addCancel"/>
                </div>
                <van-form @submit="onSubmit">
                    <van-cell-group>
                        <van-field 
                            v-model="username" 
                            label="收货人" 
                            name="username" 
                            placeholder="收货人姓名"
                            autocomplete="off"
                        />
                        <van-field 
                            v-model="tel"
                            name="tel"
                            type="tel"
                            label="手机号"
                            placeholder="收货人手机号"
                            autocomplete="off"
                        />
                        
                        <van-field
                            readonly
                            clickable
                            name="area"
                            :value="value"
                            label="地区"
                            placeholder="点击选择省市区"
                            @click="showArea = true"
                        />
                        <van-field
                            v-model="address"
                            name="address"
                            rows="2"
                            autosize
                            label="详细地址"
                            type="textarea"
                            placeholder="如街道、门牌号、小区、乡镇村等"
                        />
                    </van-cell-group>
                    <div style="margin: 16px;background-color: #df9dff;">
                        <van-button block type="info" native-type="submit">
                          保存
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
        <!-- 底部弹出层：area组件 -->
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
    </div>
</template>
<!-- 逻辑 -->
<script>
    import Vue from 'vue';
    import  arealist  from '../../assets/js/area.js';
    import { Icon,Button,Popup,Form,Field,CellGroup,Area } from 'vant';

    Vue.use(Icon);
    Vue.use(Button);
    Vue.use(Popup);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(CellGroup);
    Vue.use(Area);
    export default{
        name:'BargainHome',
        data(){
            return {
                show:false,//是否显示底部弹出层：收货地址
                showAdd:false,//是否显示中间弹出层：添加收货地址
                username:'',
                tel:'',
                address:'',//地址信息
                value: '',
                showArea: false,//是否显示底部地区选择
                areaList: arealist,
            }
        },
        methods:{
            addAddress(){
                this.show = true;
            },
            cancel(){
                this.show = false;
            },
            showAddress(){
                this.show = false;
                this.showAdd = true;
            },
            addCancel(){
                this.showAdd = false;
            },
            onConfirm(values) {
                console.log("onConfirm",values)
                this.value = values.map((item) => item.name).join('/');
                this.showArea = false;
            },
            onSubmit(value){
                console.log(value)
            }
        }
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
  	#BargainHome{
        /*position: relative;*/
        width: 100%;
        height: auto;
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
        .rem(margin-top,-190px);
        .rem(padding-top,20px);
        width: 80%;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        background-color: #da79ff;
        border: 2px solid #fff;
        border-radius: 2px;
        .nav-img{
            position: absolute;
            .rem(top,-20px);
            .rem(left,-10px);
            width: 105%;
            .rem(height,50px);
            z-index: 999;
            img{
                width: 110%;
                .rem(height,50px);
            }
        }
    }
    .product-floor{
        display: flex;
        width: 100%;
        .rem(height,200px);
        .rem(margin-bottom,10px);
        background-color: #fff;
    }
    .product-item{
        position: relative;
        width: 50%;
        height: 100%;
        .rem(padding,20,10);
        text-align: center;
        box-sizing: border-box;
        background-color: #e8abff;
        perspective: 500px;
    }
    .product-detail{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #f7e2ff;
        border-radius: 5px;
        z-index: 99;
    }
    .shop-text{
        .rem(width,80px);
        .rem(height,20px);
        .rem(line-height,20px);
        margin-left: auto;
        margin-right: auto;
        .rem(font-size,10px);
        color: #000;
        background-color: #f5d8ff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .shop-num{
            color: #ff0000;
        }
    }
    .product-name{
        .rem(width,80px);
        .rem(height,30px);
        .rem(line-height,30px);
        margin-left: auto;
        margin-right: auto;
        .rem(font-size,12px);
        font-weight: 800;
        color: #000;
        overflow: hidden;
    }
    .product-img{
        .rem(width,80px);
        .rem(height,80px);
        margin-left: auto;
        margin-right: auto;
        img{
            .rem(width,80px);
            .rem(height,80px);
        }
    }
    .vote{
        position: absolute;
        .rem(top,135px);
        .rem(width,90px);
        .rem(height,30px);
        padding: 0 10px;
        .rem(font-size,12px);
    }
    .vote-left{
        .rem(left,5px);
    }
    .vote-right{
        .rem(right,5px);
    }
    .mode-left{
        position: absolute;
        .rem(width,125px);
        .rem(height,100px);
        left: 0;
        bottom: 0;
        transform-origin: center bottom;
        transform:rotateX(89deg);
        background-color: #f7e2ff;
    }
    .mode-right{
        position: absolute;
        .rem(width,125px);
        .rem(height,100px);
        right: 0;
        bottom: 0;
        transform-origin: center bottom;
        transform:rotateX(89deg);
        background-color: #f7e2ff;
    }
    .address{
        color: #000;
    }
    .choose-address{
        .rem(height,40px);
        .rem(line-height,40px);
        .rem(padding,0,20);
        text-align: center;
        .van-icon{
            float: right;
            .rem(margin-top,10px);
        }
    }
    .add-address{
        text-align: left;
        .rem(height,50px);
        .rem(line-height,50px);
        .rem(padding,0,20);
        font-size: 14px;
        border-top: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
        .van-icon{
            float: right;
            .rem(margin-top,18px);
        }
    }
    .van-popup{
        border-radius: 5px;
    }
    .show-address{
        width: 300px;
        .addresslist{
            .rem(height,40px);
            .rem(line-height,40px);
            text-align: center;
            color: #000;
            .van-icon{
                float: right;
                .rem(margin-top,5px);
                .rem(margin-right,5px);
            }
        }
    }
    .van-button--info {
        color: #fff;
        background-color: #df9dff;
        border: 1px solid #df9dff;
    }
    .address-item{
        .rem(padding,10,15);
        .rem(height,50px);
        border-top: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
        .van-icon{
            float: left;
            .rem(margin-top,10px);
            .rem(margin-right,5px);
        }
        #right{
            float: right;
        }
        .address-detail{
            float: left;
            .rem(width,200px);
            .user-name{
                font-size: 16px;
                .user-tel{
                    font-size: 10px;
                    margin-left: 5px;
                }
            }
            .address-text{
                font-size: 12px;
                span{
                    margin-right: 5px;
                }
            }
        }
    }
    .bargain-list{
        .rem(padding,15,20);
        .bargain-img{
            overflow: hidden;
            img{
                float: left;
               .rem(width,90px);
               .rem(height,90px);
            }
            .bargain-detail{
                float: left;
                .rem(margin-top,60px);
                .rem(font-size,12px);
                color: #cfcfcf;
            }
        }
        .size{
            overflow: hidden;
            .rem(margin,5,0);
        }
        .color{
            overflow: hidden;
        }
        h3{
            font-weight: 800;
            .rem(margin,5,0);
            .rem(font-size,12px);
        }
        .item{
            float: left;
            .rem(font-size,12px);
            text-align: center;
            .rem(margin-right,10px);
            .rem(width,40px);
            .rem(height,25px);
            .rem(line-height,25px);
            color: #fff;
            background-color: #dddddd;
            border-radius: 2px;
        }
        .active{
            background-color: #e3a1ff;
        }
        #start{
            .rem(width,300px);
            .rem(height,100px);
            .rem(line-height,100px);
            color: #fff;
            text-align: center;
            background-color: #e3a1ff;
            .rem(margin-top,30px);
            margin-left: auto;
            margin-right: auto;
        }
    }
    #start{
        .rem(width,200px);
        .rem(height,30px);
        .rem(line-height,30px);
        color: #fff;
        text-align: center;
        background-color: #e3a1ff;
        .rem(margin-top,5px);
        .rem(margin-bottom,5px);
        margin-left: auto;
        margin-right: auto;
    }
</style>