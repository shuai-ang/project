Page({
  data: {
    sId:'',
    show:false,
    phoneNum:'',
    checkInputNum:'',
    checkNum:'',
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
    isClick:false,//获取验证码按钮，默认允许点击
    errMsg:'请您先绑定手机号,以便享受挪车服务',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
    
  },
  onLoad: function (options) {
    var sId = options.sId;
    var license = options.license;
    this.setData({sId:sId,license:license});
    
  },
  onUnload:function(){
    
  },
  
  /**手机号输入时 */
  bindPhoneInput:function(e){
    var val = e.detail.value;
  
    this.setData({phoneNum:val});
  },
  /**手机号输入框失去焦点时 */
  bindPhoneBlur:function(e){
    
  },
  /**点击获取验证码 */
  tapCheck:function(){
    clearTimeout(delay);
    let _this = this;
    
    let delay = setTimeout(function(){
      let reg = /^[1][2356789][0-9]{9}$/;
      console.log(_this.data.phoneNum)
      const phoneReg = reg.test(_this.data.phoneNum);
      console.log(phoneReg)
      if(!phoneReg){
        console.log('tapCheck')
        wx.showToast({
          title: '请输入正确的手机号!',
          icon:'none',
          duration:2000
        })
        return;
      }else{
        _this.setData({isClick: true});
        _this.postRequest();
      }
    },250)
    
  },
  //发送请求并跳转指定页面
  postRequest:function(){
    let _this = this;
    wx.request({
      url: 'https://www.simpsonit.cn:443/simpsonx-0.0.1-SNAPSHOT(1.9)/simpsonx/sendSms',
      method:'GET',
      data:{
        phoneNumber:_this.data.phoneNum
      },
      success:function(res){
        var result = res.data;
        //console.log(result)
        //如果有验证码，显示发送成功
        if(result){
          wx.showToast({
            title: '发送成功',
            icon:'none',
            duration:2000
          })
          _this.setData({checkNum:result});
          // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
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
                currentTime: 60,
                isClick: false
              })
            }
          },1000);
        }else{
          wx.showToast({
            title: '发送失败',
            icon:'none',
            duration:2000
          })
          _this.setData({
            time: '获取验证码',
            currentTime: 60,
            isClick: false
          })
        }
        
      },
      fail:function(){
        wx.showToast({
          title: '发送失败',
          icon:'none',
          duration:2000
        })
        _this.setData({
          time: '获取验证码',
          currentTime: 60,
          isClick: false
        })
      }
    })
    
  },
  bindCheckInput:function(e){
    var checkInputNum = e.detail.value;
    
    if(checkInputNum !== this.data.checkNum){
      this.setData({checkInputNum:checkInputNum});
      return;
    }else{
      this.setData({checkInputNum:checkInputNum});
    }
  },
  tapStart:function(){
    clearTimeout(delay);
    let _this = this;
    let reg2 = /^[1][2356789][0-9]{9}$/;
    const phoneReg = reg2.test(this.data.phoneNum);
    var checkInputNum = this.data.checkInputNum/1;
    var checkNum = this.data.checkNum/1;
    let delay = setTimeout(function(){
      /**验证手机号 */
      if(!phoneReg){
        wx.showToast({
          title: '请输入正确的手机号!',
          icon:'none',
          duration:2000
        })
        return;
      }
      /**验证验证码 */
      if(checkInputNum !== checkNum || checkNum == 0){
        wx.showToast({
          title: '请输入正确的验证码!',
          icon:'none',
          duration:2000
        })
        return;
      }
      
      if(phoneReg && checkInputNum == checkNum && checkNum != 0){
        wx.showModal({
          title: '提示',
          content: '是否绑定手机号:'+_this.data.phoneNum+',车牌号:'+_this.data.license,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              let license = encodeURI(_this.data.license);
              let sId = _this.data.sId;
              console.log(license)
              wx.request({
                url: 'https://www.simpsonit.cn:443/simpsonx-0.0.1-SNAPSHOT(1.9)/simpsonx/update',
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
                  }else if(result == 'overtime'){
                    wx.showToast({
                      title: '验证码已失效',
                      icon:'none',
                      duration:2000,
                      mask:true
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
    },200);
    
  }
})