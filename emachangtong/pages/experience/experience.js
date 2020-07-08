// pages/experience/experience.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
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
      /*
      wx.request({
        url: 'http://39.96.72.38:8080/simpsonx-0.0.1-SNAPSHOT(1.2)/simpsonx/sendSms?phoneNumber='+_this.data.phoneNum,
        method:'GET',
        data:{
          phoneNumber:_this.data.phoneNum
        },
        success:function(res){
          var result = res.data;
          _this.setData({checkNum:result});
        }
      })
      */
    }
  },
  bindCheckInput:function(e){
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
    var checkInputNum = this.data.checkInputNum;
    var checkNum = this.data.checkNum;
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
            let license = province + _this.data.carNum;
            let sId = 2;
            console.log(license)
            wx.request({
              url: 'http://39.96.72.38:8080/simpsonx-0.0.1-SNAPSHOT(1.4)/simpsonx/update',
              method:'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
              },
              data:{
                sId:sId,
                phoneNumber:_this.data.phoneNum,
                license: license
              },
              success:function(res){
                var result = res.data;
                console.log(result)
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