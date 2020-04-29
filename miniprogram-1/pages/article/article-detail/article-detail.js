// pages/article/article-detail/article-detail.js
var { articles } = require('../../../data/db.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.articleId;
    var article = articles[articleId];
    // console.log(article)
    //处理收藏
    var isCollected = true;

    //获取文章收藏状态
    var article_collections = wx.getStorageSync('article_collections');
    if (article_collections){
      isCollected = !!article_collections[articleId]
    }else{
      var data = {};
      data[articleId] = false;
      wx.setStorageSync('article_collections', data)
    }

    this.setData({...article,isCollected:isCollected})
    //处理音乐
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function(){
      this.setData({ isPlaying: true })
    }.bind(this))
    backgroundAudioManager.onPause(function () {
      this.setData({ isPlaying: false })
    }.bind(this))
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
  /**
   * 处理点击收藏
   */
  tapCollection:function(){
    // wx.setStorageSync('key1', 'aaa')
    // var data = wx.getStorageSync('key1')
    // console.log(data)
    var article_collections = wx.getStorageSync('article_collections');
    var currentCollection = article_collections[this.data.articleId];
    article_collections[this.data.articleId] = !currentCollection;
    wx.setStorageSync('article_collections', article_collections);

    this.setData({ isCollected: !currentCollection},function(){
      wx.showToast({
        title: currentCollection ? "取消成功" : "收藏成功",
        image: "../../../images/article/a1.jpg",
        duration: 2000
      })
    })
  },
  /**
   * 处理点击分享
   */
  tapShare:function(){
    var arr = ["分享到QQ","分享朋友圈","分享微博"];
    wx.showActionSheet({
      itemList:arr,
      itemColor:'green',
      success(res){
        wx.showToast({
          title: arr[res.tapIndex]+"成功",
          image: "../../../images/article/a1.jpg",
          duration: 2000
        })
      }
    })
  },
  tapMusic:function(){
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    if(this.data.isPlaying){
      backgroundAudioManager.pause();
      // this.setData({ isPlaying: false })
    }else{
      // backgroundAudioManager.src = "http://music.163.com/song/media/outer/url?id=1436709403.mp3";
      // backgroundAudioManager.title = "夏天的风";
      // backgroundAudioManager.singer = '火羊瞌睡了';
      // backgroundAudioManager.coverImgUrl = "http://p1.music.126.net/rFUKVdOjqxgwAT6Zi6qv7A==/109951164906689206.jpg?param=130y130";

      backgroundAudioManager.src = this.data.music.src;
      backgroundAudioManager.title = this.data.music.title;
      backgroundAudioManager.singer = this.data.music.singer;
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl;
      // this.setData({isPlaying: true})
    }
    
  }
})