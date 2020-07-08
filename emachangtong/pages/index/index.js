//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    sId:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    province:'省',
    show:false,
    carNum:'',
    phoneNum:'',
    checkInputNum:'',
    checkNum:'1234',
    time: '获取验证码', //倒计时 
    currentTime: 300,//限制300s
    isClick:false,//获取验证码按钮，默认允许点击
    errMsg:'请您先绑定车牌号,以便享受挪车服务',
    provinceArr:['京','津','渝','沪','冀','晋','辽','吉',
    '黑','苏','浙','皖','闵','赣','鲁','豫',
    '鄂','湘','粤','琼','川','贵','云','陕',
    '甘','青','蒙','贵','宁','新','藏','使',
    '领','警','学','港','澳',]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    
    var sId = options.sId;
    this.setData({sId:sId});
    
    
    
    
    
    /*
    if (options.scene) {
      console.log("has scene");
      var scene = decodeURIComponent(options.scene);
      console.log("scene is ", scene);
      var arrPara = scene.split("&");
      var arr = [];
      for (var i in arrPara) {
        arr = arrPara[i].split("=");
        wx.setStorageSync(arr[0],arr[1]);
        console.log("setStorageSync:",arr[0],"=",arr[1]);
      }
    } else {
      console.log("no scene");
    }
    */
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onUnload:function(){
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindMotto:function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  tapProvince:function(){
    if(this.data.show){
      this.setData({show:false});
    }else{
      this.setData({show:true});
    }
  },
  tapHide:function(){
    this.setData({show:false});
  },
  tapProvinceItem:function(e){
    var province1 = e.currentTarget.dataset.text;
    this.setData({province:province1});
    this.setData({show:false});
  },
  bindCarInput:function(e){
    var val = e.detail.value;
    
  },
  /**车牌号输入框失去焦点时 */
  bindCarBlur:function(e){
    var val = e.detail.value;
    let reg = /^[A-Z][0-9A-Z]{5}$/;
    const carReg = reg.test(val);
    if(!carReg){
      this.setData({errMsg:'请输入正确的车牌号!'});
      return;
    }else{
      this.setData({errMsg:'请输入手机号!',carNum:val});
    }
  },
  /**手机号输入时 */
  bindPhoneInput:function(e){
    var val = e.detail.value;
    
  },
  /**手机号输入框失去焦点时 */
  bindPhoneBlur:function(e){
    var val = e.detail.value;
    //console.log(val)
    let reg = /^[1][356789][0-9]{9}$/;
    const phoneReg = reg.test(val);
    if(!phoneReg){
      this.setData({errMsg:'请输入正确的手机号!'});
      return;
    }else{
      this.setData({errMsg:'请输入验证码!',phoneNum:val});
    }
    //console.log(this.data)
  },
  /**点击获取验证码 */
  tapCheck:function(){
    let _this = this;
    let reg = /^[1][356789][0-9]{9}$/;
    const phoneReg = reg.test(_this.data.phoneNum);
    if(!phoneReg){
      _this.setData({errMsg:'请输入正确的手机号!'});
      return;
    }else{
      _this.setData({isClick: true});
      // 300s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
      var currentTime = _this.data.currentTime;
      var  interval = setInterval(function(){
        currentTime --;//减
        _this.setData({
          time: currentTime + '秒后获取'
        })
        if (currentTime <= 0) {
          clearInterval(interval);
          _this.setData({
            time: '获取验证码',
            currentTime: 300,
            isClick: false
          })
        }
      },1000);
      
      
      wx.request({
        url: 'http://39.96.72.38:8080/simpsonx-0.0.1-SNAPSHOT(1.8)/simpsonx/sendSms',
        method:'GET',
        data:{
          phoneNumber:_this.data.phoneNum
        },
        success:function(res){
          var result = res.data;
          console.log(result)
          _this.setData({checkNum:result});
        }
      })
      
    }
  },
  bindCheckBlur:function(e){
    var checkInputNum = e.detail.value;
    if(checkInputNum !== this.data.checkNum){
      this.setData({errMsg:'请输入正确的验证码!',checkInputNum:checkInputNum});
      return;
    }else{
      this.setData({errMsg:'点击立即开启!',checkInputNum:checkInputNum});
    }
  },
  tapStart:function(){
    let _this = this;
    var province = this.data.province;
    let reg1 = /^[A-Z][0-9A-Z]{5}$/;
    const carReg = reg1.test(this.data.carNum);
    let reg2 = /^[1][356789][0-9]{9}$/;
    const phoneReg = reg2.test(this.data.phoneNum);
    var checkInputNum = this.data.checkInputNum/1;
    var checkNum = this.data.checkNum/1;
    if(province == '省'){
      this.setData({errMsg:'请选择省份!'});
      return;
    }else{
      this.setData({errMsg:''});
    }
    /**验证车牌号 */
    if(!carReg){
      this.setData({errMsg:'请输入正确的车牌号!'});
      return;
    }
    /**验证手机号 */
    if(!phoneReg){
      this.setData({errMsg:'请输入正确的手机号!'});
      return;
    }
    /**验证验证码 */
    if(checkInputNum !== checkNum){
      this.setData({errMsg:'请输入正确的验证码!'});
      return;
    }
    if(province !== '省' && carReg && phoneReg && checkInputNum == checkNum){
      wx.showModal({
        title: '提示',
        content: '是否绑定手机号:'+this.data.phoneNum+',车牌号:'+province+this.data.carNum,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            let license = encodeURI(province + _this.data.carNum);
            let sId = _this.data.sId;
            console.log(license)
            wx.request({
              url: 'http://39.96.72.38:8080/simpsonx-0.0.1-SNAPSHOT(1.8)/simpsonx/update',
              method:'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              scriptCharset: 'utf-8',
              data:{
                sId:sId,
                phoneNumber:_this.data.phoneNum,
                license: license
              },
              success:function(res){
                var result = res.data;
                console.log(result);
                if(result == 'success'){
                  wx.redirectTo({
                    url: '/pages/success/success',
                  })
                }
              },
              fail:function(){
                wx.showToast({
                  title: '网络请求错误',
                  icon:'none',
                  duration:2000,
                  mask:true
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})
