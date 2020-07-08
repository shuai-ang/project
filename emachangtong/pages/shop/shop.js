// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    telNumber:'',
    address:'',
    cartNum:1,
    cartPrice:'19.90',
    totalPrice:'19.90',
    servicePrice:'9.90',
    preferentPrice:'9.90',
    shopPrice:'19.90',
    sum:'19.90',
    unitPrice:19.9,//挪车贴单价
    minusPrice:9.9//优惠单价
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
  tapAddress:function(){
    /*
    wx.navigateTo({
      url: '/pages/shop/address/address',
    })
    */
   let _this = this;
   wx.chooseAddress({
      success:function(res){
        console.log(res)
        var user = res;
        var userName = user.userName;
        var telNumber = user.telNumber;
        var provinceName = user.provinceName;
        var cityName = user.cityName;
        var countyName = user.countyName;
        var detailInfo = user.detailInfo;
        var postalCode = user.postalCode;
        var address = provinceName + cityName + countyName + detailInfo;
        _this.setData({
          userName:userName,
          telNumber:telNumber,
          address:address
        })
      }
    })
  },
  tapPlus:function(){
    var cartNum = this.data.cartNum;
    var cartPrice = this.data.cartPrice/1;
    var totalPrice = this.data.totalPrice/1;
    var servicePrice = this.data.servicePrice/1;
    var preferentPrice = this.data.preferentPrice/1;
    var shopPrice = this.data.shopPrice/1;
    var sum = this.data.sum/1;
    var unitPrice = this.data.unitPrice;
    var minusPrice = this.data.minusPrice;
    if(cartNum < 10){
      cartNum ++;
      cartPrice = (unitPrice * cartNum).toFixed(2);
      totalPrice = (unitPrice * cartNum).toFixed(2);
      servicePrice = (minusPrice * cartNum).toFixed(2);
      preferentPrice = (minusPrice * cartNum).toFixed(2);
      shopPrice = (unitPrice * cartNum).toFixed(2);
      sum = (unitPrice * cartNum).toFixed(2);
      this.setData({
        cartNum:cartNum,
        cartPrice:cartPrice,
        totalPrice:totalPrice,
        servicePrice:servicePrice,
        preferentPrice:preferentPrice,
        shopPrice:shopPrice,
        sum:sum
      })
    }else{
      return;
    }
  },
  tapMinus:function(){
    var cartNum = this.data.cartNum;
    var cartPrice = this.data.cartPrice/1;
    var totalPrice = this.data.totalPrice/1;
    var servicePrice = this.data.servicePrice/1;
    var preferentPrice = this.data.preferentPrice/1;
    var shopPrice = this.data.shopPrice/1;
    var sum = this.data.sum/1;
    var unitPrice = this.data.unitPrice;
    var minusPrice = this.data.minusPrice;
    if(cartNum > 1){
      cartNum --;
      cartPrice = (unitPrice * cartNum).toFixed(2);
      totalPrice = (unitPrice * cartNum).toFixed(2);
      servicePrice = (minusPrice * cartNum).toFixed(2);
      preferentPrice = (minusPrice * cartNum).toFixed(2);
      shopPrice = (unitPrice * cartNum).toFixed(2);
      sum = (unitPrice * cartNum).toFixed(2);
      this.setData({
        cartNum:cartNum,
        cartPrice:cartPrice,
        totalPrice:totalPrice,
        servicePrice:servicePrice,
        preferentPrice:preferentPrice,
        shopPrice:shopPrice,
        sum:sum
      })
    }else if(cartNum <= 1){
      return;
    }
  },
  tapGetCart:function(){
    if(this.data.address == ''){
      wx.showToast({
        title: '请先选取地址',
        duration:2000
      })
    }
    if(this.data.address){
      console.log('address');
    }
  }
})