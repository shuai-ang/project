<!-- 模板 -->
<template>
    <div id="GetActivity">
        <van-form @submit="onSubmit">
          <van-field
            v-model="title"
            name="title"
            rows="1"
            label-width="100%"
            label-class="title-label"
            label="活动主题"
            type="text"
            placeholder="请输入投票主题"
          />
          <van-field
            v-model="detail"
            name="detail"
            rows="3"
            label-width="100%"
            autosize
            label="活动详情"
            type="textarea"
            maxlength="300"
            placeholder="请简单介绍活动详情"
            show-word-limit
          />
          <!-- <van-cell-group>
              <van-field  v-for="(item, index) in inputList" :key="index"
                  :label="'选手'+(index+1)"
                  v-model="query['data'+index]"
                  :name="'people'+(index+1)"
                  placeholder="请输入参赛选手" 
              />
          </van-cell-group>
          <div class="add" @click="addInput">
              <span>+</span><span>增加选项</span>
          </div> -->
          
            <van-field
              v-model="startime"
              name="startime"
              label="活动开始时间"
              type="text"
              @click="getStartime"
            />
            <van-field
              v-model="endtime"
              name="endtime"
              label="活动结束时间"
              type="text"
              @click="getEndtime"
            />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
        <van-popup
          v-model="show"
          
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              title="选择完整时间"
              visible-item-count="4"
              @confirm="getTime"
              :min-date="minDate"
              :max-date="maxDate"
          />
        </van-popup>
    </div>
</template>
<!-- 逻辑 -->
<script>
    import axios from 'axios';
    import Vue from 'vue';
    import { Search,Icon,Button,Form,Field,Uploader,Toast,CellGroup,DatetimePicker,Popup } from 'vant';

    Vue.use(Search);
    Vue.use(Icon);
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(Uploader);
    Vue.use(Toast);
    Vue.use(CellGroup);
    Vue.use(DatetimePicker);
    Vue.use(Popup);
    export default{
        name:'GetActivity',
        data(){
            return {
                title: '',
                detail: '',
                query: {},
                inputList: [1],
                startime:'',
                endtime:'',
                show:false,
                num:null,
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
            }
        },
        methods: {
            onSubmit(values) {
                console.log('submit', values);
                var title = values.title;
                var detail = values.detail;
                var startime = values.startime;
                var endtime = values.endtime;
                if((title != '') && (detail != '') && (startime != '') && (endtime != '')){
                    var url = 'http://www.simpsonit.cn:80/businesspromotion-0.0.7-SNAPSHOT/vote_massages/saveto';
                    // axios.post(url, {
                    //     theme: title,
                    //     notice: detail,
                    //     activity_s_time:startime,
                    //     activity_e_time:endtime,
                    // })
                    axios({
                        method: 'post',
                        url: url,
                        params: {
                            theme: title,
                            notice: detail,
                            activity_s_time:startime,
                            activity_e_time:endtime,
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        window.location.href = './#/emptypage';
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
                }else{
                    return;
                }
            },
            addInput(){
                this.inputList.push(1);
            },
            getStartime(){
                this.show = true;
                this.num = 1;
                
            },
            getEndtime(){
                this.show = true;
                this.num = 2;
            },
            getTime(value){
                console.log(value)
                var date = new Date(value);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const hour = date.getHours();
                    const minute = date.getMinutes();
                    const second = date.getSeconds();
                    const formatMonth = month < 10 ? `0${month}` : month;
                    const formatDay = day < 10 ? `0${day}` : day;
                    const formatHour = hour < 10 ? `0${hour}` : hour;
                    const formatMinute = minute < 10 ? `0${minute}` : minute;
                    const formatSecond = second < 10 ? `0${second}` : second;
                var datetime = year + '-' + formatMonth + '-' + formatDay + ' ' + formatHour + ':' + formatMinute + ':' + formatSecond;
                console.log(datetime)
                if(this.num == 1){
                    this.startime = datetime;
                }else if(this.num == 2){
                    this.endtime = datetime;
                }
                this.show = false;
            }
        },
        
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
    #GetActivity{
        position: relative;
        background-color: #fff;
        height: 100%;
        
    }
    .van-cell{
        flex-wrap: wrap;
    }
    .title-label{
        margin-bottom: 15px !important;
    }
    .add{
        .rem(height,70px);
        .rem(line-height,70px);
        text-align: center;
        color: #000;
    }
</style>