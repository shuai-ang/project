// pages/article/article.js
var {articles} = require('../../data/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var articles = [
    //   {
    //     avatar: '/images/avatar/7.jpg',
    //     date: '2020-04-23',
    //     title: '我是文章标题1',
    //     image: '/images/article/a1.jpg',
    //     desc: '我是描述1',
    //     star: '20',
    //     view: '30'
    //   },
    //   {
    //     avatar: '/images/avatar/7.jpg',
    //     date: '2020-04-23',
    //     title: '我是文章标题2',
    //     image: '/images/article/a2.jpg',
    //     desc: '我是描述2',
    //     star: '20',
    //     view: '30'
    //   }
    // ]

    this.setData({articles: articles})
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
    // console.log('article onPullDownRefresh...')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('article onReachBottom...')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.log('article onShareAppMessage...')
  },
  tapArticleDetail: function(ev){
    var articleId = ev.currentTarget.dataset.articleId;
    wx.navigateTo({
      url: '/pages/article/article-detail/article-detail?articleId=' + articleId,
    })
  }
})