// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
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
  tapOrder:function(){
    wx.navigateTo({
      url: '/pages/person/order/order',
    })
  },
  tapCart:function(){
    wx.navigateTo({
      url: '/pages/person/cart/cart',
    })
  },
  tapCallLog:function(){
    wx.navigateTo({
      url: '/pages/person/call-log/call-log',
    })
  },
  tapHelp:function(){
    wx.navigateTo({
      url: '/pages/person/help/help',
    })
  },
  tapSolute:function(){
    wx.navigateTo({
      url: '/pages/person/solute/solute',
    })
  }
})