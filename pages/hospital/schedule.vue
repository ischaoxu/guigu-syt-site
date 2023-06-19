<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!--左侧导航 #start -->
    <div class="nav left-nav">
      <div class="nav-item selected">
        <span
          class="v-link selected dark"
          :onclick="'javascript:window.location=\'/hosp/' + hoscode + '\''"
          >预约挂号
        </span>
      </div>
      <div class="nav-item">
        <span
          class="v-link clickable dark"
          :onclick="
            'javascript:window.location=\'/hosp/detail/' + hoscode + '\''
          "
        >
          医院详情
        </span>
      </div>
      <div class="nav-item">
        <span
          class="v-link clickable dark"
          :onclick="
            'javascript:window.location=\'/hosp/notice/' + hoscode + '\''
          "
        >
          预约须知
        </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark"> 停诊信息 </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark"> 查询/取消 </span>
      </div>
    </div>
    <!-- 左侧导航 #end -->
    <!-- 右侧内容 #start -->
    <div class="page-container">
      <div class="hospital-source-list">
        <div class="header-wrapper" style="justify-content: normal">
          <span class="v-link clickable" @click="show()">{{
            info.hosname
          }}</span>
          <div class="split"></div>
          <div>{{ info.bigname }}</div>
        </div>
        <div class="title mt20">{{ info.depname }}</div>
        <!-- 号源列表 #start -->
        <div class="mt60">
          <div class="title-wrapper">{{ info.workDateString }}</div>
          <div class="calendar-list-wrapper">
            <div
              :class="'calendar-item ' + item.curClass"
              style="width: 150px"
              v-for="(item, index) in bookingScheduleList"
              :key="item.index"
              @click="selectDate(item, index)"
            >
              <div class="date-wrapper">
                <span>{{ item.workDateMd }}</span
                ><span class="week">{{ item.dayOfWeek }}</span>
              </div>
              <div class="status-wrapper" v-if="item.status == 0">
                {{
                  item.availableNumber == -1
                    ? '无号'
                    : item.availableNumber == 0
                    ? '约满'
                    : '有号'
                }}
              </div>
              <div class="status-wrapper" v-if="item.status == 1">即将放号</div>
              <div class="status-wrapper" v-if="item.status == -1">
                停止挂号
              </div>
            </div>
          </div>
        </div>
        <!-- 即将放号 #start-->
        <div class="countdown-wrapper mt60" v-if="!tabShow">
          <div class="countdonw-title">
             {{ time }}
            <span class="v-link selected">{{ info.releaseTime }} </span>放号
          </div>
          <div class="countdown-text">
            倒 计 时
            <div>
              <span class="number">{{ timeString }}</span>
            </div>
          </div>
        </div>
        <!-- 即将放号 #end-->
        <!-- 号源列表 #end -->
        <!-- 上午号源 #start -->
        <div class="mt60" v-if="tabShow">
          <div class="">
            <div class="list-title">
              <div class="block"></div>
              上午号源
            </div>
            <div v-for="item in scheduleList" :key="item.index">
              <div class="list-item" v-if="item.workTime == 0">
                <div class="item-wrapper">
                  <div class="title-wrapper">
                    <div class="title">{{ item.title }}</div>
                    <div class="split"></div>
                    <div class="name">{{ item.docname }}</div>
                  </div>
                  <div class="special-wrapper">{{ item.skill }}</div>
                </div>
                <div class="right-wrapper">
                  <div class="fee">￥{{ item.amount }}</div>
                  <div class="button-wrapper">
                    <div
                      class="v-button"
                      @click="booking(item.param.id, item.availableNumber)"
                      :style="
                        item.availableNumber == 0 || status == -1
                          ? 'background-color: #7f828b;'
                          : ''
                      "
                    >
                      <span
                        >剩余<span class="number">{{
                          item.availableNumber
                        }}</span></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 上午号源 #end -->
        <!-- 下午号源 #start -->
        <div class="mt60" v-if="tabShow">
          <div class="">
            <div class="list-title">
              <div class="block"></div>
              下午号源
            </div>
            <div v-for="item in scheduleList" :key="item.index">
              <div class="list-item" v-if="item.workTime == 1">
                <div class="item-wrapper">
                  <div class="title-wrapper">
                    <div class="title">{{ item.title }}</div>
                    <div class="split"></div>
                    <div class="name">{{ item.docname }}</div>
                  </div>
                  <div class="special-wrapper">{{ item.skill }}</div>
                </div>
                <div class="right-wrapper">
                  <div class="fee">￥{{ item.amount }}</div>
                  <div class="button-wrapper">
                    <div
                      class="v-button"
                      @click="booking(item.param.id, item.availableNumber)"
                      :style="
                        item.availableNumber == 0 || status == -1
                          ? 'background-color: #7f828b;'
                          : ''
                      "
                    >
                      <span
                        >剩余<span class="number">{{
                          item.availableNumber
                        }}</span></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 下午号源 #end -->
      </div>
    </div>
    <!-- 右侧内容 #end -->
  </div>
  <!-- footer -->
</template>
<script>
import '~/assets/css/hospital_personal.css'
import '~/assets/css/hospital.css'

import hospitalApi from '~/api/hospital'

export default {
  data() {
    return {
      hoscode: null, //医院编号
      depcode: null, //科室编号
      workDate: null, //选择的日期

      info: {}, //医院基本信息
      bookingScheduleList: [], //可预约排班日期列表
      scheduleList: [], //指定日期的排班数据列表

      activeIndex: 0, //选中的日期，默认第一个选中
      tabShow: true, //true显示挂号列表；false显示即将放号
      timeString: null, //倒计时字符串
      time: '今天',
      timer: null, //计时器

      status: 0, // 当天预约状态
    }
  },

  mounted() {
    //医院编号
    this.hoscode = this.$route.query.hoscode
    //科室编号
    this.depcode = this.$route.query.depcode

    //获取可预约排班日期列表
    this.getBookingScheduleRule()
  },

  methods: {
    //获取可预约排班日期列表
    getBookingScheduleRule() {
      hospitalApi
        .getBookingScheduleRule(this.hoscode, this.depcode)
        .then((response) => {
          //可预约排班日期列表
          this.bookingScheduleList = response.data.bookingScheduleList
          //其他数据
          this.info = response.data.info

          //选择的日期默认为当前日期（列表中的第一个数据的日期）
          this.workDate = this.bookingScheduleList[0].workDate

          //样式
          this.dealClass()

          //预约状态
          this.status = this.bookingScheduleList[0].status

          //获取指定日期的排班数据
          this.getScheduleList()
        })
    },

    //指定日期的排班数据
    getScheduleList() {
      console.log(this.workDate)
      hospitalApi
        .getScheduleList(this.hoscode, this.depcode, this.workDate)
        .then((response) => {
          this.scheduleList = response.data

          //样式
          this.dealClass()
        })
    },

    //选择一个日期
    selectDate(item, index) {


      this.workDate = item.workDate
      this.activeIndex = index
      this.status = item.status

      //清理定时
      if (this.timer != null) clearInterval(this.timer)

     
      // 是否即将放号：
      if(item.status == 1) {
        //显示倒计时
        this.tabShow = false
        // 放号时间
        let releaseTime = new Date(this.getCurDate() + ' ' + this.info.releaseTime).getTime()
        let nowTime = new Date().getTime();
        this.countDown(releaseTime, nowTime)

        this.dealClass();
      } else {
        //显示排班列表
        this.tabShow = true
        //显示排班数据
        this.getScheduleList()
      }
    },

    countDown(releaseTime, nowTime) {
      //计算倒计时时长
      let secondes = 0;
      if(releaseTime > nowTime) {
        this.time = '今天'
        //当前时间到放号时间的时长
        secondes = Math.floor((releaseTime - nowTime) / 1000);
      } else {
        this.time = '明天'
        //计算明天放号时间
        let releaseDate = new Date(releaseTime)
        releaseTime = new Date(releaseDate.setDate(releaseDate.getDate() + 1)).getTime()
        //当前时间到明天放号时间的时长
        secondes = Math.floor((releaseTime - nowTime) / 1000);
      }

      //定时任务
      this.timer = setInterval(() => {
        secondes = secondes - 1
        if(secondes < 0) {
          clearInterval(this.timer);
          this.tabShow = true //隐藏倒计时
          this.getBookingScheduleRule() //重新获取日期列表
        }
        this.timeString = this.convertTimeString(secondes)
      }, 1000);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      })
    },

    booking(scheduleId, availableNumber) {
      if (availableNumber == 0 || this.status == -1) {
        this.$message.error('不能预约')
      } else {
        window.location.href = '/hospital/booking?scheduleId=' + scheduleId
      }
    },

    //跳转到医院页面
    show() {
      window.location.href = '/hospital/' + this.hoscode
    },

    //处理样式
    dealClass() {
      for (let i = 0; i < this.bookingScheduleList.length; i++) {
        // depNumber: -1无号; 0约满; >0有号
        let curClass =
          this.bookingScheduleList[i].availableNumber == -1
            ? 'gray small-space'
            : this.bookingScheduleList[i].availableNumber == 0
            ? 'gray small-space'
            : 'small small-space'
        curClass += i == this.activeIndex ? ' selected' : ''
        this.bookingScheduleList[i].curClass = curClass
      }
    },

    //获取今天的字符串
    getCurDate() {
      let datetime = new Date()
      let year = datetime.getFullYear()
      let month =
        datetime.getMonth() + 1 < 10
          ? '0' + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1
      let date =
        datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      return year + '-' + month + '-' + date
    },

    //计算倒计时时间字符串
    convertTimeString(allseconds) {
      if (allseconds <= 0) return '00:00:00'
      // 计算天数
      let days = Math.floor(allseconds / (60 * 60 * 24))
      // 小时
      let hours = Math.floor((allseconds - days * 60 * 60 * 24) / (60 * 60))
      // 分钟
      let minutes = Math.floor(
        (allseconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60
      )
      // 秒
      let seconds =
        allseconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60

      //拼接时间
      let timString = ''
      if (days > 0) {
        timString = days + '天:'
      }
      return (timString += hours + ' 时 ' + minutes + ' 分 ' + seconds + ' 秒 ')
    },
  },
}
</script>