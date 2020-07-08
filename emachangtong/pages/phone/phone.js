// pages/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:'',
    license:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var phoneNumber = options.phoneNumber;
    var license = options.license;
    this.setData({phoneNumber:phoneNumber,license:license});
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
  tapCall:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber,
      success:function(){
        console.log('正在呼叫')
      },
      fail:function(){
        console.log('取消呼叫')
      }
    })
  }
})