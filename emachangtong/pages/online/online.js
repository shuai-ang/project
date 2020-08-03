// pages/online/online.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sId:'',
    isKeyboard: !1,//是否显示键盘,默认不显示
    isNumberKB: !1,//是否是数字键盘
    tapNum: !1,//是否可以点击数字
    tapHong:!1,
    disableKey: "1234567890学港澳",
    keyboardNumber: "1234567890ABCDEFGHJKLMNOPQRSTUVWXYZ学港澳",
    keyboard1: "京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新使领警学港澳台",
    inputPlates: {
      index0: "",
      index1: "",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      index6: "",
      index7: "新能源"
    },
    inputOnFocusIndex: "",
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sId = options.sId;
    this.setData({sId:sId});
    if(sId){
      wx.request({                                                                                                                              
        url: 'https://www.simpsonit.cn:443/simpsonx-0.0.1-SNAPSHOT(1.9)/simpsonx/findUser',
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
            wx.reLaunch({
              url: '/pages/phone/phone?phoneNumber='+phoneNumber+'&license='+license,
            })
          }else{
            return;
          }
        }
      })
    }
  },
  //切换车牌
  changeplate:function(){
    var that = this;
    that.setData({
      inputPlates: {
        index0: "",
        index1: "",
        index2: "",
        index3: "",
        index4: "",
        index5: "",
        index6: "",
        index7: ""
      },
    })
  },
 
  inputClick:function(t){
    var that = this;
    console.log('输入框:', t)
    that.setData({
      inputOnFocusIndex : t.target.dataset.id,
      isKeyboard: !0
    })
    "0" == this.data.inputOnFocusIndex ? that.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? that.setData({
      tapNum: !1,
      isNumberKB: !0,
    }) : that.setData({
      tapNum: !0,
      isNumberKB: !0,
    });
 
  },
  //新能源输入框点击事件
  lastInputClick:function(e){
    var that = this;
    console.log(e)
    var id = e.target.dataset.id;
    that.setData({
      inputOnFocusIndex : id,
      isKeyboard: !0,
      tapNum: !0,
      isNumberKB: !0,
      "inputPlates.index7":'',
      flag:false
    })
  },
  //键盘点击事件
  tapKeyboard: function (t) {
    t.target.dataset.index;
    var a = t.target.dataset.val;
    console.log('键盘:',a)
    switch (this.data.inputOnFocusIndex) {
      case "0":
        this.setData({
          "inputPlates.index0": a,
          inputOnFocusIndex: "1",
          
        });
        break;
 
      case "1":
        this.setData({
          "inputPlates.index1": a,
          inputOnFocusIndex: "2"
        });
        break;
 
      case "2":
        this.setData({
          "inputPlates.index2": a,
          inputOnFocusIndex: "3"
        });
        break;
 
      case "3":
        this.setData({
          "inputPlates.index3": a,
          inputOnFocusIndex: "4"
        });
        break;
 
      case "4":
        this.setData({
          "inputPlates.index4": a,
          inputOnFocusIndex: "5"
        });
        break;
 
      case "5":
        this.setData({
          "inputPlates.index5": a,
          inputOnFocusIndex: "6"
        });
        break;
 
      case "6":
        this.setData({
          "inputPlates.index6": a,
          inputOnFocusIndex: "6"
        });
        //break;
      /*
      case "7":
        this.setData({
          "inputPlates.index7": a,
          inputOnFocusIndex: "7",
          flag:false
        });
      */
    }
    if(this.data.inputOnFocusIndex == "7"){
      this.setData({
        "inputPlates.index7": a,
        inputOnFocusIndex: "7",
        flag:false
      });
    }
    this.checkedSubmitButtonEnabled();
  },
  //点击下一步
  tapNext:function(){
    var sId = this.data.sId;
    var inputArr = this.data.inputPlates;
    var num0 = inputArr.index0;
    var num1 = inputArr.index1;
    var num2 = inputArr.index2;
    var num3 = inputArr.index3;
    var num4 = inputArr.index4;
    var num5 = inputArr.index5;
    var num6 = inputArr.index6;
    var num7 = inputArr.index7;
    console.log(num7)
    if(num7 == "新能源"){
      num7 = 0;
    }
    console.log("next",num7)
    var license = null;
    if(num0 && num1 && num2 && num3 && num4 && num5 && num6 && num7){
      license = num0 + num1 + num2 + num3 + num4 + num5 + num6 + num7;
      console.log('num7...',license)
    }else if(num0 && num1 && num2 && num3 && num4 && num5 && num6){
      license = num0 + num1 + num2 + num3 + num4 + num5 + num6;
      console.log(license)
    }else{
      wx.showToast({
        title: '请输入正确的车牌号!',
        icon:'none',
        duration:2000
      })
    }
    if(license){
      wx.navigateTo({
        url: '/pages/online/bindphone/bindphone?sId='+sId+'&license='+license,
      })
    }
  },

  //键盘关闭/删除按钮点击事件
  tapSpecBtn: function (t) {
    var a = this, e = t.target.dataset.index;
    if (0 == e) {
      switch (parseInt(this.data.inputOnFocusIndex)) {
        case 0:
          this.setData({
            "inputPlates.index0": "",
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "0"
          });
          break;
 
        case 1:
          this.setData({
            "inputPlates.index1": "",
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "0"
          });
          break;
 
        case 2:
          this.setData({
            "inputPlates.index2": "",
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "1"
          });
          break;
 
        case 3:
          this.setData({
            "inputPlates.index3": "",
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "2"
          });
          break;
 
        case 4:
          this.setData({
            "inputPlates.index4": "",
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "3"
          });
          break;
 
        case 5:
          this.setData({
            "inputPlates.index5": "",
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "4"
          });
          break;
 
        case 6:
          this.setData({
            "inputPlates.index6": "",
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "5"
          });
          break;
 
        case 7:
          this.setData({
            "inputPlates.index7": "新能源",
            flag:true,
            inputOnFocusIndex: "6"
          });
      }
      this.checkedSubmitButtonEnabled();
    } else 1 == e && a.setData({
      isKeyboard: !1,
      isNumberKB: !1,
      inputOnFocusIndex: ""
    });
  },
  //键盘切换
  checkedKeyboard: function () {
    var t = this;
    "0" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !0,
    }) : this.data.inputOnFocusIndex.length > 0 && t.setData({
      tapNum: !0,
      isNumberKB: !0,
    });
  },
 
  checkedSubmitButtonEnabled: function () {
    this.checkedKeyboard();
    var t = !0;//true
    for (var a in this.data.inputPlates) if ("index7" != a && this.data.inputPlates[a].length < 1) {
      t = !1;//false
      break;
    }
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
  /**车牌号输入框失去焦点时 */
  bindCarBlur:function(e){
    var val = e.detail.value;
    let reg = /^[A-Z][0-9A-Z]{5}$/;
    const carReg = reg.test(val);
    if(!carReg){
      /*this.setData({errMsg:'请输入正确的车牌号!'});*/
      wx.showToast({
        title: '请输入正确的车牌号!',
        icon:'none',
        duration:2000
      })
      return;
    }else{
      this.setData({errMsg:'请输入手机号!',carNum:val});
    }
  },

})