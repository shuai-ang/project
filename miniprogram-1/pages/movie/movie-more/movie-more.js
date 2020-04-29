
var { getMovieList } = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:'',
    totalCount:0,
    totalData:[],
    isEnd:false
  },
  handleMovieList: function (data) {
    if(data.length == 0){
      this.data.isEnd = true;
      wx.showToast({
        title: '我是有底线的',
      })
      wx.hideNavigationBarLoading();
      return;
    }
    this.data.totalCount = this.data.totalCount + data.length;
    this.data.totalData = this.data.totalData.concat(data)
    this.setData({ movies: this.data.totalData })
    wx.hideNavigationBarLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      var type = options.type;
      var baseUrl = app.GLOBAL_DATA.baseUrl;
      var requestUrl = '';

      var navigationBarTitle = '';
      if (type == 'inTheaters'){
        requestUrl = baseUrl + 'in_theaters';
        navigationBarTitle = '正在热映'
      } else if (type == 'comingSoon'){
        requestUrl = baseUrl + 'coming_soon';
        navigationBarTitle = '即将上映'
      }else if(type == 'top250'){
        requestUrl = baseUrl + 'top250';
        navigationBarTitle = '豆瓣Top250'
      }

      //保存请求地址
      this.setData({requestUrl:requestUrl})

      wx.showNavigationBarLoading()
      //设置当前页面标题
      wx.setNavigationBarTitle({
        title: navigationBarTitle
      })

      getMovieList(requestUrl,this.handleMovieList)
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
    // var _this = this;
    wx.showNavigationBarLoading();
    getMovieList(this.data.requestUrl, this.handleMovieList)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isEnd){
      wx.showToast({
        title: '我是有底线的',
      })
      return;
    }
    wx.showNavigationBarLoading();
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount +"&count=20"
    getMovieList(nextUrl, this.handleMovieList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})