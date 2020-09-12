import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'
import activitydec from 'pages/activitydec/store'
import charts from 'pages/charts/store'
import personinfo from 'pages/personinfo/store'
import getactivity from 'pages/getactivity/store'
import voteshop from 'pages/voteshop/store'
//砍价部分
import bargainhome from 'pages/bargainhome/store'
import bargainshare from 'pages/bargainshare/store'

//转阅部分
import transferhome from 'pages/transferhome/store'
import transferdetail from 'pages/transferdetail/store'

//空白页处理
import emptypage from 'pages/emptypage/store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        home:home,
        activitydec:activitydec,
        charts:charts,
        personinfo:personinfo,
        getactivity:getactivity,
        voteshop:voteshop,
        bargainhome:bargainhome,
        bargainshare:bargainshare,
        transferhome:transferhome,
        transferdetail:transferdetail,
        emptypage:emptypage
    }
})