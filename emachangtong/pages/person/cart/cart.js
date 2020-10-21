// pages/person/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      carNum:"豫KD5188",
      phoneNum:"183******85"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var phoneNum = "13900005566";
      var reg = /^(\d{3})\d{6}(\d{2})$/;
      var phoneNum1 = phoneNum.replace(reg,'$1******$2');
      console.log(phoneNum1)
      this.setData({phoneNum:phoneNum1});
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
  tapCartItem:function(){
    wx.redirectTo({
      url: '/pages/person/cart/cart-detail/cart-detail',
    })
  }
})