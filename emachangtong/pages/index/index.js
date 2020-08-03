//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    sId:'',
    motto: 'Hello World',
    province:'省',
    show:false,
    carNum:'',
    phoneNum:'',
    checkInputNum:'',
    checkNum:'',
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
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
  onShow:function(){
    wx.showToast({
      title: '数据加载中...',
      icon:'loading',
    })
  },
  onLoad: function (options) {
    wx.hideToast({
      title: '数据加载中...',
      icon:'loading',
    })
    var sId = options.sId;
    this.setData({sId:sId});
    if(sId){
      wx.request({                                                                                                                              
        url: 'https://www.simpsonit.cn:443/simpsonx-0.0.1-SNAPSHOT(1.8)/simpsonx/findUser',
        method:'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data:{
          sId:sId
        },
        success:function(res){
          var result = res.data;
          console.log(result)
          var license = decodeURI(result.license);
          var phoneNumber = result.phoneNumber;
          if(phoneNumber){
            wx.redirectTo({
              url: '/pages/phone/phone?phoneNumber='+phoneNumber+'&license='+license,
            })
          }else{
            return;
          }
        }
      })
    }
    
    
    
    
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
  },
  onUnload:function(){
    
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
      wx.showToast({
        title: '请输入正确的车牌号!',
        icon:'none',
        duration:2000
      })
      return;
    }else{
      this.setData({carNum:val});
    }
  },
  /**手机号输入时 */
  bindPhoneInput:function(e){
    var val = e.detail.value;
    
  },
  /**手机号输入框失去焦点时 */
  bindPhoneBlur:function(e){
    var val = e.detail.value;
    console.log(val)
    let reg = /^[1][356789][0-9]{9}$/;
    const phoneReg = reg.test(val);
    
    this.setData({phoneNum:val});
    
    //console.log(this.data)
  },
  /**点击获取验证码 */
  tapCheck:function(){
    clearTimeout(delay);
    let _this = this;
    
    let delay = setTimeout(function(){
      let reg = /^[1][356789][0-9]{9}$/;
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
      url: 'https://www.simpsonit.cn:443/simpsonx-0.0.1-SNAPSHOT(1.8)/simpsonx/sendSms',
      method:'GET',
      data:{
        phoneNumber:_this.data.phoneNum
      },
      success:function(res){
        var result = res.data;
        console.log(result)
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
  bindCheckBlur:function(e){
    var checkInputNum = e.detail.value;
    if(checkInputNum !== this.data.checkNum){
      this.setData({checkInputNum:checkInputNum});
      return;
    }else{
      this.setData({checkInputNum:checkInputNum});
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
      wx.showToast({
        title: '请选择车牌所在的省份!',
        icon:'none',
        duration:2000
      })
      return;
    }
    /**验证车牌号 */
    if(!carReg){
      wx.showToast({
        title: '请输入正确的车牌号!',
        icon:'none',
        duration:2000
      })
      return;
    }
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
    if(checkInputNum !== checkNum){
      wx.showToast({
        title: '请输入正确的验证码!',
        icon:'none',
        duration:2000
      })
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
              url: 'https://www.simpsonit.cn:443/simpsonx-0.0.1-SNAPSHOT(1.8)/simpsonx/update',
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
  }
})
