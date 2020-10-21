<!-- 模板 -->
<template>
    <div id="PersonInfo">
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
                <van-button color="#c753ff" class="action-item" block size="large">个人信息</van-button>
            </div> -->
        <!--floor 信息展示部分 -->
        <div class="floor">
            <div class="floor-title">
                <div class="title-item line"></div>
                <div class="title-item">个人信息</div>
                <div class="title-item line"></div>
            </div>
            <van-form @submit="onSubmit" v-if="showInfo">
                <van-cell-group>
                    <van-field 
                        v-model="username"
                        label="姓名" 
                        name="username" 
                        placeholder="请输入姓名"
                        required
                        autocomplete="off"
                    />
                    <van-field 
                        v-model="phonenum"
                        name="tel"
                        required
                        type="tel"
                        label="手机号"
                        placeholder="请输入手机号"
                    />
                    <van-field
                        v-model="sms"
                        name="sms"
                        center
                        clearable
                        label="短信验证码"
                        placeholder="请输入验证码"
                    >
                        <template #button>
                            <van-button size="small" type="primary" native-type="button" @click="getCheckNum">发送验证码</van-button>
                        </template>
                    </van-field>
                    <van-field
                        v-model="address"
                        name="address"
                        required
                        rows="2"
                        autosize
                        label="地址"
                        type="textarea"
                        placeholder="请输入地址"
                    />
                    <van-field
                        
                        v-model="assessment"
                        name="assessment"
                        rows="3"
                        autosize
                        label="自我评价"
                        type="textarea"
                        maxlength="50"
                        show-word-limit
                    />
                    <van-field name="uploader" label="上传照片" required>
                        <template #input>
                            <van-uploader 
                                v-model="uploader"
                                :after-read="afterRead"
                                :accept="'image/*'"
                                multiple :max-count="1"
                                :max-size="5 * 1024 * 1024" @oversize="onOversize"
                            />
                        </template>
                    </van-field>
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                      提交
                    </van-button>
                </div>
            </van-form>
            <div v-else>
                <div class="person-info">
                    <div class="person-img">
                        <img :src="personImg" alt="">
                    </div>
                    <div class="person-detail">
                        <div class="person-name">
                            <!-- <span>{{personNum}}号</span><span>{{personName}}</span> -->
                            <!-- <span>36号</span><span>欧阳盆栽</span> -->
                            <p class="person-num">{{personNum}}号</p>
                            <p class="name-text">{{personName}}</p>
                            <img src="../../assets/images/num0.png" class="name-img">
                        </div>
                        <div class="person-ticket">
                            <span>当前{{personTicket}}票</span>
                        </div>
                    </div>
                    <div class="buttons">
                        <van-button color="#c753ff" class="button-item left-btn" block size="small" @click="voteTicket">{{voted}}</van-button>
                        <van-button color="#c753ff" class="button-item right-btn" block size="small" to="voteshop">礼物打赏</van-button>
                    </div>
                </div>
                <!-- <van-button color="#c753ff" class="button-item" block size="large" @click="voteTicket">{{voted}}</van-button>
                <van-button color="#c753ff" class="button-item" block size="large" to="voteshop">打赏</van-button> -->
                <div class="advertise">
                    <div class="advertise-list">
                        <div class="advertise-top">
                            <div class="top-item">
                                <img src="../../assets/images/advertise1.jpg" alt="">
                            </div>
                            <div class="top-item">
                                <img src="../../assets/images/advertise1.jpg" alt="">
                            </div>
                            <div class="top-item">
                                <img src="../../assets/images/advertise1.jpg" alt="">
                            </div>
                            <div class="top-item">
                                <img src="../../assets/images/advertise1.jpg" alt="">
                            </div>
                        </div>
                        <div class="advertise-bottom">
                            <img src="../../assets/images/advertise1.jpg" alt="">
                        </div>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-brief activity-item">
                        <div class="activity-title">
                            <img src="../../assets/images/font1.png" alt="">
                        </div>
                        <div class="brief">
                            <div class="brief-line"></div>
                            <span>许昌报业传媒集团、曹魏古城综合开发建设指挥部联合许昌市摄影家协会，面向全市摄影爱好者，征集与荷花及曹魏古城有关的摄影作品!点击右下方“我要报名”，立即参与活动吧!即日起-- 8月6日18: 00结束</span>
                        </div>
                    </div>
                    <div class="activity-unit activity-item">
                        <div class="activity-title">
                            <img src="../../assets/images/font2.png" alt="">
                        </div>
                        <div class="unit-list">
                            <div class="unit-line"></div>
                            <div class="unit-item">
                                <span class="large">主办单位:</span><span>许昌市文化广电和旅游局、许昌报业传媒集团、魏都区委宣传部</span>
                            </div>
                            <div class="unit-item">
                                <span class="large">承办单位:</span><span>许昌晨报、曹魏古城综合开发建设指挥部</span>
                            </div>
                            <div class="unit-item">
                                <span class="large">协办单位:</span><span>魏都区文化广电和旅游局、魏都区供销社、许昌市文化投资有限责任公司、河南团熹文化传播有限公司</span>
                            </div>
                            <div class="unit-item">
                                <span class="large">活动冠名:</span><span>许昌市万州置业有限公司</span>
                            </div>
                            <div class="unit-item">
                                <span class="large">协力赞助:</span><span>雅迪电动车湖滨路店</span>
                            </div>
                            <div class="unit-item">
                                <span class="large">大赛唯一指定饮料:</span><span>银梅可乐</span>
                            </div>
                            <div class="unit-item">
                                <span class="large">特别鸣谢:</span><span>能率厨电、三菱重工空调、许昌华夏眼科医院、金太阳婚恋</span>
                            </div>
                            <div class="unit-item">
                                <span class="large">技术支持:</span><span>河南辛普森互联网科技</span>
                            </div>
                        </div>

                    </div>
                    <div class="prize activity-item">
                        <div class="activity-title">
                            <img src="../../assets/images/font3.png" alt="">
                        </div>
                        <div class="prize-list">
                            <div class="prize-line"></div>
                            <div class="prize-item">
                                <div class="prize-name">
                                    <span>一等奖1名:(总排名第1名即可获得)</span>
                                </div>
                                <div><span>由承办方提供的500元现金</span></div>
                                <div><span>由福聚堂提供价值800元的莲花烙葫芦一个</span></div>
                            </div>
                            <div class="prize-item">
                                <div class="prize-name">
                                    <span>二等奖2名:(总排名第2-3名即可获得)</span>
                                </div>
                                <div><span>由承办方提供的400元现金</span></div>
                                <div><span>由福聚堂提供价值800元的莲花烙葫芦一个</span></div>
                            </div>
                            <div class="prize-item">
                                <div class="prize-name">
                                    <span>三等奖3名:(总排名第4-6名即可获得)</span>
                                </div>
                                <div><span>由承办方提供的300元现金</span></div>
                                <div><span>由福聚堂提供价值800元的莲花烙葫芦一个</span></div>
                            </div>
                            <div class="prize-item">
                                <div class="prize-name">
                                    <span>四等奖4名:(总排名第7-10名即可获得)</span>
                                </div>
                                <div><span>由承办方提供的100元现金</span></div>
                                <div><span>由福聚堂提供价值800元的莲花烙葫芦一个</span></div>
                            </div>
                            <div class="prize-item">
                                <div class="prize-name">
                                    <span>五等奖30名:(总排名第11-40名即可获得)</span>
                                </div>
                                <div><span>由丞相府提供价值90元城乡夜游门门票3张</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="attention activity-item">
                        <div class="activity-title">
                            <img src="../../assets/images/font4.png" alt="">
                        </div>
                        <div class="attention-list">
                            <div class="attention-line"></div>
                            <div class="attention-item">1、每个微信号每天只能给3个选手加油!</div>
                            <div class="attention-item">2、此平台只限制许昌地区用户参与</div>
                            <div class="attention-item">3、 系统有自动检测功能，发现异常将自动进入监控名单并体制增长!</div>
                            <div class="attention-item">4、对违规行为系统将自动进行永久封号!</div>
                            <div class="attention-item">(凡参加活动者即默认以上规则)</div>
                        </div>
                    </div>
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
    import { Search,Icon,Button,Form,Field,Uploader,Toast,CellGroup } from 'vant';

    Vue.use(Search);
    Vue.use(Icon);
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(Uploader);
    Vue.use(Toast);
    Vue.use(CellGroup);
    export default{
        name:'PersonInfo',
        data(){
            return {
                showInfo:true,
                lists:['本活动票数统计为用户分享链接后的拉粉数量,敬请期待新的活动。','10月1号将开展中秋节欢乐活动。'],
                username: '',
                phonenum:'',
                sms:'',
                checkNum:'',
                address:'',
                assessment:'',
                uploader: [],
                imageData:[],
                imgUrl:'',
                personImg:'',
                personNum:'',
                personName:'',
                personTicket:0,
                voted:'为TA投票'
            }
        },
        created(){
            
        },
        mounted(){
            var params = this.getParams();
            console.log('params..',params)
            if(params){
                
                var key = params.split('=')[0];
                var value = params.split('=')[1];
                
                if(key == 'id'){
                    let id = value;
                    this.getPlayerInfo(id);
                }
            }else if(params == null){
                console.log('null..')
                this.getOpidPlayerInfo();
            }
            
        },
        methods: {
            getParams(){
                var url = window.location.href;
                console.log(url);
                if(url.indexOf('id') >=0){
                    var params = url.split('?')[1];
                
                    return params;//id='+id
                }else{
                    return null;
                }
                
            },
            //通过openid获取用户详情
            getOpidPlayerInfo(){
                var openid = window.localStorage.getItem('openId');
                console.log('personCreated..',openid)
                var _this = this;
                axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/user_massage/findop?openid='+openid)
                .then(function (result) {
                    console.log(result);
                    if(result.data == ''){
                        return;
                    }else{
                        var person = result.data;
                        _this.showInfo = false;
                        _this.personImg = person.head_img;
                        _this.personNum = person.user_number;
                        // _this.personName = decodeURI(person.user_name);
                        _this.personName = person.user_name;
                        _this.personTicket = person.number_ov;
                    }
                })
                .catch(function (error) {
                  console.log(error);
                })
            },
            //通过编号获取用户详情
            getPlayerInfo(id){
                var _this = this;
                axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/user_massage/findId?user_number='+id)
                .then(function (result) {
                    console.log(result);
                    if(result && (result.data != '')){
                        var person = result.data;
                        _this.showInfo = false;
                        _this.personImg = person.head_img;
                        _this.personNum = person.user_number;
                        _this.personName = person.user_name;
                        _this.personTicket = person.number_ov;
                    }
                })
                .catch(function (error) {
                    
                    console.log(error);
                })
            },
            //获取验证码
            getCheckNum(){
                
                var phonenum = this.phonenum;
                let reg = /^[1][2356789][0-9]{9}$/;
                const phoneReg = reg.test(phonenum);
                let _this = this;
                if(!phoneReg){
                    Toast("请输入正确的手机号!")
                }else{
                    console.log("phonenum..",phonenum)
                    axios.get('https://www.simpsonit.cn:443/yktgt-1.0.1/user_massage/sendSms?user_phone='+phonenum)
                    .then(function (result) {
                        console.log(result);
                        _this.checkNum = result.data;
                        Toast("验证码已发送")
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }
            },
            onSubmit(values) {
                console.log('submit', values);
                var openid = window.localStorage.getItem('openId');
                //var username = encodeURI(values.username);
                var username = values.username;
                var phonenum = values.tel;
                //var telnum = phonenum - 0;
                console.log(phonenum)
                //验证码
                var sms = values.sms - 0;
                console.log('sms..',sms)
                var checkNum = this.checkNum;
                //var address = encodeURI(values.address);
                var address = values.address;
                //var assessment = encodeURI(values.assessment);
                var assessment = values.assessment;
                var uploader = values.uploader;
                var imgUrl = this.imgUrl;
                if(sms != checkNum){
                    Toast("请输入正确的验证码!")
                }
                if(imgUrl == ''){
                    Toast("照片上传无效!")
                }
                
                if((username != '') && (phonenum != '') && (sms == checkNum) && (address != '') && (imgUrl != '')){
                    
                    console.log('imgUrl',imgUrl);
                    var url = 'https://www.simpsonit.cn:443/yktgt-1.0.1/user_massage/save';
                    var activityId = 1;
                    // axios.post(url, {
                    //     openid:openid,
                    //     user_name: username,
                    //     user_phone: phonenum,
                    //     profile:address,
                    //     zwpj:assessment,
                    //     head_img:imgUrl
                    // },
                    // {
                    //     header: {
                    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    //     },
                    // })
                    axios({
                        method: 'post',
                        url: url,
                        params: {
                            v_m_id:activityId,
                            openid:openid,
                            user_name: username,
                            user_phone: phonenum,
                            h_address:address,
                            s_evaluation:assessment,
                            head_img:imgUrl
                        },
                        // header: {
                        //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        // }
                    })
                    .then(function (response) {
                        console.log(response);
                        window.location.href = './#/emptypage';
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
                }else{
                    return;
                }
                
            },
            afterRead(file,detail) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
                // console.log(detail);
                // if(file.content && file){
                //     Toast("图片有内容"+file.content.length)
                // }
                if(file){
                    //Toast("进入file..")
                    this.uploadImgFun(file.content,file.file.name);
                }
            },
            beforeRead (file) {
                if ((file.type !== 'image/jpeg') && (file.type !== 'image/png')) {
                    Toast('请上传 jpg/png 格式图片');
                    return false;
                }
                // let isLt1M = file.size / 1024 / 1024 <= 1
                // if (!isLt1M) {
                //      Toast('图片大小1M以内');
                //      return false
                // }
                // return true;
            },
            onOversize(file) {
                console.log(file);
                Toast('文件大小不能超过 5MB');
            },
            uploadImgFun(content,name){
                var _this = this;
                // 创建表单数据格式，以表单的数据传递，对该表单进行添加参数
                let formData = new FormData();
                  // formData.append("参数名1", "参数值1");
                  // formData.append("参数名2", "参数值2");
                  // formData.append("参数名3", "参数值3");
                console.log(name)
                formData.append("file", this.dataURLtoFileFun(content, name));
                  // 注意需要在调用接口的时候修改请求头为"multipart/form-data"，以表单的格式上传
                axios.post('https://www.simpsonit.cn:443/yktgt-1.0.1/wechat/photoUpload',formData, {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                }).then(res => {
                    // 上传到服务器成功的操作...
                        console.log(res.data)
                        var imgUrl = res.data;
                        //Toast("上传到服务器"+imgUrl);
                        var object = {};
                        let key = 'url';
                        object[key] = imgUrl;
                        //_this.uploader.push(object);
                        _this.imgUrl = imgUrl;
                });
            },
            // bae64转文件对象
            dataURLtoFileFun (dataurl, filename) {
              // 将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
              let arr = dataurl.split(",");
              let mime = arr[0].match(/:(.*?);/)[1];
              console.log(arr[1].length+'');
              //Toast(arr[1].length+'');
              let bstr = atob(arr[1]);
              let n = bstr.length;
              let u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              return new File([u8arr], filename, { type: mime });
            },
            //投票逻辑处理
            voteTicket(){
                var voted = this.voted;
                var voteopid = window.localStorage.getItem('openId');
                console.log('voteopid',voteopid)
                var personNum = this.personNum;
                console.log('personNum..',personNum)
                var activityId = 1;
                var _this = this;
                var url = 'https://www.simpsonit.cn:443/yktgt-1.0.1/user_massage/vote';
                if(voted == '为TA投票'){
                    axios({
                        method: 'get',
                        url: url,
                        params: {
                            m_id:activityId,
                            voteopid:voteopid,
                            user_number:personNum
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        var info = response.data.tishi;
                        //通过返回的信息处理逻辑
                        if(info == "zijitoupiao"){//1.自己给自己投票时,不允许
                            Toast("不能给自己投票");
                            return;
                        }else if(info == "success"){//2.投票成功时
                            _this.voted = '已投票';
                            _this.getPlayerInfo(personNum);
                        }else if(info == "useup"){//3.当每天的票数用完时
                            Toast("今天的票数已用完")
                        }else if(info == "jinriyitougaixuanshou"){//4.今日已投过该选手
                            Toast("今日已投过该选手")
                            _this.voted = '已投票';
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }else if(voted == '已投票'){
                    return
                }
                
            }
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
    #PersonInfo{
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
        .rem(margin-bottom,50px);
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
        
    }
    .van-button--info {
        color: #fff;
        background-color: #c753ff;
        border: 1px solid #c753ff;
    }
    .van-cell-group {
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
    }
    .person-info{
        position: relative;
        margin-left: auto;
        margin-right: auto;
        .rem(width,220px);
        .rem(height,210px);
        border-radius: 5px;
        overflow: hidden;
        background-color: #fff;
        .person-img{
            width: 100%;
            .rem(height,170px);
            img{
                width: 100%;
                .rem(height,170px);
            }
        }
        .person-detail{
            position: absolute;
            top:0;
            display: flex;
            justify-content: space-between;
            width: 100%;
            color: #fff;
            font-size: 14px;
            .person-name{
                position: relative;
                .rem(width,40px);
                .rem(height,55px);
                .rem(margin-left,10px);
                .rem(font-size,10px);
                text-align: center;
                .person-num{
                    position: absolute;
                    .rem(top,6px);
                    .rem(width,40px);
                    .rem(height,20px);
                }
                .name-text{
                    position: absolute;
                    .rem(top,22px);
                    .rem(width,40px);
                    .rem(height,20px);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: clip;
                }
                .name-img{
                    width: 100%;
                    height: 100%;
                }
            }
            .person-ticket{
                .rem(width,80px);
                .rem(height,20px);
                .rem(line-height,20px);
                .rem(font-size,10px);
                text-align: center;
                border-radius: 5px;
                background-color: rgba(0,0,0,0.5);
            }
        }
        .buttons{
            width: 100%;
            .rem(height,20px);
            .button-item{
                .rem(margin-top,7px);
                .rem(width,80px);
                .rem(height,25px);
                .rem(line-height,25px);
                .rem(font-size,12px);
                border-radius: 5px;
            }
            .left-btn{
                float: left;
                .rem(margin-left,10px);
            }
            .right-btn{
                float: right;
                .rem(margin-right,10px);
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
    .advertise{
        .rem(margin-top,35px);
        width: 100%;
        .rem(height,200px);
        box-sizing: border-box;

        .advertise-list{
            .advertise-top{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .rem(height,130px);
                .top-item{
                    .rem(width,130px);
                    .rem(height,60px);
                    img{
                        .rem(width,130px);
                        .rem(height,60px);
                    }
                }
            }
            .advertise-bottom{
                width: 100%;
                .rem(height,50px);
                img{
                    width: 100%;
                    .rem(height,50px);
                }
            }
        }
    }
    .activity{
        width: 100%;
        .rem(padding,0,30);
        .rem(margin-top,20px);
        color: #000;
        .rem(font-size,10px);
        box-sizing: border-box;
        border:2px solid #5847ff;
        .activity-item{
            .rem(margin-bottom,30px);
            .activity-title{
                .rem(width,80px);
                .rem(height,23px);
                margin-left: auto;
                margin-right: auto;
                .rem(margin-bottom,20px);
                img{
                    .rem(width,80px);
                    .rem(height,23px);
                }
            }
            .large{
                .rem(font-size,12px);
                font-weight: 600;
            }
            span{
                .rem(font-size,10px);
            }
            
        }
        .activity-brief{
            .rem(margin-top,-16px);
            .activity-title{
                .rem(padding,4,8);
                background-color: #5847ff;
            }
            .brief{
                position: relative;
                .brief-line{
                    opacity: 1;
                    position: absolute;
                    .rem(top,2px);
                    .rem(left,-10px);
                    .rem(width,2px);
                    .rem(height,65px);
                    background: linear-gradient(to bottom, #85fff5, #d8a5fe);
                }
            }
        }
    }
    .unit-list{
        position: relative;
        .unit-line{
            position: absolute;
            .rem(top,2px);
            .rem(left,-10px);
            .rem(width,2px);
            .rem(height,190px);
            background: linear-gradient(to bottom, #85fff5, #d8a5fe);
        }
    }
    .prize-list{
        position: relative;
        .prize-line{
            position: absolute;
            .rem(top,2px);
            .rem(left,-10px);
            .rem(width,2px);
            .rem(height,300px);
            background: linear-gradient(to bottom, #85fff5, #d8a5fe);
        }
    }
    .attention-list{
        position: relative;
        .attention-line{
            position: absolute;
            .rem(top,2px);
            .rem(left,-10px);
            .rem(width,2px);
            .rem(height,80px);
            background: linear-gradient(to bottom, #85fff5, #d8a5fe);
        }
    }
    .unit-item{
        span{
            .rem(font-size,12px);
        }
    }
    .prize-item{
        .prize-name{
            .rem(margin-right,6px);
            span{
                .rem(font-size,14px);
                font-weight: 600;
            }
        }
        span{
            .rem(font-size,12px);
        }
    }
    
</style>