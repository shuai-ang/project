// pages/online/erweimatest/erweimatest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthSavePhoto:false,
    photoUrl:'https://www.simpsonit.cn:443/simpsonx-0.0.1-SNAPSHOT(1.9)/testimg/sId1.png'
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
  tapShop:function(){
    wx.redirectTo({
      url: '/pages/shop/shop',
    })
  },
  // 保存图片到手机
  
  onSaveToPhone() {
    this.getSetting().then((res) => {
      // 判断用户是否授权了保存到本地的权限
      if (!res.authSetting['scope.writePhotosAlbum']) {
        this.authorize().then(() => {
          this.savedownloadFile(this.data.photoUrl)
          this.setData({
            isAuthSavePhoto: false
          })
        }).catch(() => {
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none',
            duration: 1500
          })
          this.setData({
            isAuthSavePhoto: true
          })
        })
      } else {
        console.log("onSaveToPhone...")
        this.savedownloadFile(this.data.photoUrl)
      }
    })
  },
  //打开设置，引导用户授权
  onOpenSetting() {
    wx.openSetting({
      success:(res) => {
        console.log(res.authSetting)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.showToast({
            title: '您未授权',
            icon: 'none',
            duration: 1500
          })
          this.setData({// 拒绝授权
            isAuthSavePhoto: true
          })

        } else {// 接受授权
          this.setData({
            isAuthSavePhoto: false
          })
          this.onSaveToPhone() // 接受授权后保存图片

        }

      }
    })
   
  },
  // 获取用户已经授予了哪些权限
  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          resolve(res)
        }
      })
    })
  },
  // 发起首次授权请求
  authorize() {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success: () => {
          resolve()
        },
        fail: res => { //这里是用户拒绝授权后的回调
          console.log('拒绝授权')
          reject()
        }
      })
    })
  },
  savedownloadFile(img) {
    this.downLoadFile(img).then((res) => {
      return this.saveImageToPhotosAlbum(res.tempFilePath)//临时文件路径 (本地路径)
    }).then(() => {      
    })
  },
  //单文件下载(下载文件资源到本地)，客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。
  downLoadFile(img) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: img,
        success: (res) => {
          console.log('downloadfile', res)
          resolve(res)
        }
      })
    })
  },
  // 保存图片到系统相册
  saveImageToPhotosAlbum(saveUrl) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: saveUrl,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            duration: 1000,
          })
          resolve()
        }
      })
    })
  },
  // 弹出模态框提示用户是否要去设置页授权
  showModal(){
    wx.showModal({
      title: '检测到您没有打开保存到相册的权限，是否前往设置打开？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          this.onOpenSetting() // 打开设置页面          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})