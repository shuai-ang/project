// pages/online/online.js
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
    console.log(this.data)
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
    console.log(e)
    this.setData({province:province1});
    this.setData({show:false});
  },

})