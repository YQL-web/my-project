<template>
  <div class="content content2">
    <div class="left-box">
      <div class="show2">
        <section class="school-data">
          <a class="return-to-area" href="#/">返回</a>
          <p class="school-name">{{field_info.field_name}}</p>
          <p>累计采集人数</p>
          <p class="school-people digital">{{field_info.field_collect_count}}</p>
        </section>
        <section class="school-gym-data">
          <!--v-show='pos_info_total_pages>1&&pos_info_current_page>1?true:false'-->
          <div class="prev-box" @click="prevPage()" v-show="false">
            <i></i>
          </div>
          <div class="info-box">
            <ul id="gymInfo">
              <li class="school-cell-show" :class="item.active?'school-active':''" v-for="(item,index) in field_info.pos_info_list" @click="getInfo(item,index)">
                <div class="cell-show-title">
                  <p class="cell-show-titleName">{{item.device_name}}采集设备</p>
                  <p class="cell-show-more" :class="item.diviceStatusClass">{{item.device_status_desc}}</p>
                </div>
                <div class="cell-show-data">
                  <div class="cell-all-data">
                    <p class="cell-all-data-title">本设备录入人数</p>
                    <p class="cell-all-data-number digital">{{item.device_collect_count}}</p>
                  </div>
                  <div class="cell-today-data">
                    <p class="cell-all-data-title">今日录入人数</p>
                    <p class="cell-all-data-number digital">{{item.device_today_collect_count}}</p>
                  </div>
                  <div class="device-wrong-persent">
                    <p class="cell-all-data-title">本设备误识率</p>
                    <p class="cell-all-data-number digital">{{item.mistake_recognize_rate}}%</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--pos_info_current_page<pos_info_total_pages&&pos_info_total_pages>1?true:false-->
          <div class="next-box" @click="nextPage()" v-show="false">
            <i></i>
          </div>
        </section>
      </div>
    </div>
    <div class="right-box">
      <div class="date-box">
        <p class="date"></p>
        <p class="time"></p>
      </div>
      <div class="right-box-container">
        <div class="effect-box">
          <i class="effect-box-cell effect01">
            <span></span>
          </i>
          <i class="effect-box-cell effect02">
            <span></span>
          </i>
          <i class="effect-box-cell effect03">
            <span></span>
          </i>
        </div>
        <div class="container-show2">
          <div class="map-box">
            <div class="device-state">
              <div class="device-state-true">
                <i></i>
                <p>已开通设备</p>
              </div>
              <div class="device-state-false">
                <i></i>
                <p>未开通设备</p>
              </div>
            </div>
            <div class="school-gym-area">
              <div class="venue-model-inner">
                <!--@click="showData(model,index)"-->
                <div class="model" v-for="(model,index) in models" :class="(model.active?'model-active':'')" :style="model.styleObj"></div>

                <div class="gym-data-show" :style="position">
                  <div class="message-show">
                    <div class="message-show-cell gym-name">
                      <p><span>{{gym_name}}</span>采集设备</p>
                    </div>
                    <div class="message-show-cell customer-message">
                      <p>最新录入信息</p>
                      <p class="customer-name">{{lastInfo.collect_name}}</p>
                      <p class="customer-phone">{{lastInfo.collect_mobile}}</p>
                    </div>
                  </div>
                  <div class="gym-message-bgd">
                    <i class="gym-active"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="recognition-persent">
              <div class="recognition-persent-bgd">
                <p class="digital">81.2%</p>
                <!--<p class="digital">{{field_info.recognize_rate}}</p>-->
                <i></i>
                <div class="circle-box">
                  <div class="circle-box-cell left">
                    <div class="circle"></div>
                  </div>
                  <div class="circle-box-cell right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
              <p class="recognition-persent-title">静脉采集系统总体识别率[ % ]<span></span></p>
            </div>
          </div>
          <div class="all-data-box">
            <div class="all-devices">
              <p class="all-devices-number digital">{{field_info.field_pos_count}}</p>
              <div>
                <p class="totol-number-devices">本点位现有设备总数</p>
                <p class="totol-number-devicesE">TOTOL NUMBER OF DEVICES</p>
              </div>
            </div>
            <div class="all-input-number">
              <div class="today-input-people">
                <p class="today-input-title">今日设备使用次数</p>
                <p class="today-input-data digital">{{device_use_count.today}}</p>
              </div>
              <div class="account-input-people">
                <p class="account-input-title">累计设备使用次数</p>
                <p class="account-input-data digital">{{device_use_count.total}}</p>
              </div>
            </div>
            <div class="wrong-box" v-show="deviceStatus">
              <i class="outline-icon"></i>
              <div class="wrong-tips">
                <p class="wrong-tips-title">TK2805设备出现故障,故障问题可能是:</p>
                <p class="worng-reason-list"><span>·主板错误</span><span>·主板错误</span></p>
              </div>
            </div>
            <div class="area-footer">
              <p>{{field_info.field_name}}采集点位分布情况</p>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {bus} from '../bus.js'
import api from '../../api/api.js'
export default{
  data(){
    return{
      field_info:{
        pos_info_list:[]
      },//地区详细信息数组
      pos_info_current_page:1,//当前数据页数
      pos_info_total_pages:0,//总页数
      device_use_count:{},//采集点使用次数数据
      position:{
        left:'-12%',
        top:'8.5%'
      },//采集点面板初始化位置,
      gym_name:"体育馆",
      deviceStatus:false,//错误面板控制属性
      lastInfo:{
        collect_name:"王大锤",
        collect_mobile:"15696324512"
      },//体育馆面板初始化信息
      defaultIndex:0,//体育馆默认选中位置
      models:[
        {
          active:false,
          styleObj:{
            left:"13%",top:"50%",zIndex:40
          }
        },
        {
          active:false,
          styleObj:{
            left:"18%",top:"44.5%",zIndex:39
          }
        },
        {
          active:false,
            styleObj:{
          left:"23%",top:"39%",zIndex:38
        }
        },
        {
          active:false,
            styleObj:{
          left:"28%",top:"33%",zIndex:36
        }
        },
        {
          active:false,
            styleObj:{
          left:"23.5%",top:"49%",zIndex:41
        }
        },
        {
          active:false,
            styleObj:{
          left:"34%",top:"37.5%",zIndex:41
        }
        },
        {
          active:false,
            styleObj:{
          left:"35%",top:"67.5%",zIndex:40
        }
        },
        {
          active:false,
            styleObj:{
          left:"41%",top:"72%",zIndex:40
        }
        },
        {
          active:false,
            styleObj:{
          left:"46%",top:"66%",zIndex:39
        }
        },
        {
          active:false,
            styleObj:{
          left:"51%",top:"60%",zIndex:38
        }
        },
        {
          active:false,
            styleObj:{
          left:"56%",top:"54.5%",zIndex:37
        }
        },
        {
          active:false,
            styleObj:{
          left:"50%",top:"50%",zIndex:36
        }
        },
        {
          active:false,
            styleObj:{
          left:"50%",top:"27%",zIndex:36,width:"13.5%",height: "21%"
        }
        },
        {
          active:false,
            styleObj:{
          left:"59%",top:"10%",zIndex:40
        }
        },
        {
          active:false,
            styleObj:{
          left:"65%",top:"14.5%",zIndex:41
        }
        },
        {
          active:false,
            styleObj:{
          left:"71%",top:"19%",zIndex:42
        }
        },
        {
          active:false,
            styleObj:{
          left:"77%",top:"23.5%",zIndex:43
        }
        },
        {
          active:false,
          styleObj:{
          left:"72%",top:"30%",zIndex:44
          }
        }
      ]//体育馆点初始化属性,
    }
  },
  methods:{
    /**
     *点击体育馆model动态获取显示面板的位置
     * @param _this
     * @param e
     */
    showData(_this,index){
      if(!_this.active) return false;
      this.position.left =  parseInt(_this.styleObj.left.split("%")[0])-25+"%";
      this.position.top =  parseInt(_this.styleObj.top.split("%")[0])-41.5+"%";
      if(index==12){
        this.position.left =  "27%";
        this.position.top =  "-13.5%";
      }
      this.field_info.pos_info_list.forEach(function(item){
        item.active = false;
      })
      this.defaultIndex = index;
      this.field_info.pos_info_list[index].active = true;
      this.device_use_count.today = this.field_info.pos_info_list[index].device_today_recognize_count;
      this.device_use_count.total = this.field_info.pos_info_list[index].device_recognize_count;
      this.deviceStatus = this.field_info.pos_info_list[index].diviceStatus?false:true;
      let device_id = this.field_info.pos_info_list[index].device_id;
      this.getLastInfo(device_id);
      var page = (index+1)%3==0?parseInt((index+1)/3):parseInt((index+1)/3)+1;
      var dom = document.getElementById("gymInfo")
      let height = document.getElementsByClassName("school-cell-show")[0].offsetHeight*3.15
      if(page==this.pos_info_current_page)
          return false;
      else if(page>this.pos_info_current_page){
        var top = dom.style.marginTop?-height*(page-this.pos_info_current_page)+parseInt(dom.style.marginTop.split("px")[0])+"px":-height*(page-this.pos_info_current_page)+"px";
        dom.style.marginTop = top;
        this.pos_info_current_page = page;
      }
      else if(page<this.pos_info_current_page){
        var top = parseInt(dom.style.marginTop.split("px")[0])+height*(this.pos_info_current_page-page)+"px";
        dom.style.marginTop = top;
        this.pos_info_current_page = page;
      }
    },
    /**
     * 点击左侧体育馆面板切换相应的展示数据
     * @param _this
     */
    getInfo(_this,index){
      this.field_info.pos_info_list.forEach(function(item){
        item.active = false;
      })
      _this.active = true;
      this.gym_name = _this.device_name;
      this.device_use_count.today = _this.device_today_recognize_count;
      this.device_use_count.total = _this.device_recognize_count;
      this.position.left =  parseInt(this.models[index].styleObj.left.split("%")[0])-25+"%";
      this.position.top =  parseInt(this.models[index].styleObj.top.split("%")[0])-41.5+"%";
      if(index==12){
        this.position.left =  "27%";
        this.position.top =  "-13.5%";
      }
      this.deviceStatus = _this.diviceStatus?false:true;
      this.defaultIndex = index;
      let device_id = _this.device_id;
      this.getLastInfo(device_id);
    },
    /**
     * 点击next按钮切换至下一页
     */
    nextPage(){
      if(this.pos_info_current_page ==this.pos_info_total_pages) return false;
      let height = document.getElementsByClassName("school-cell-show")[0].offsetHeight*3.15
      var top = -height*this.pos_info_current_page+"px";
      this.pos_info_current_page = this.pos_info_current_page+1;
      var dom = document.getElementById("gymInfo")
      dom.style.marginTop = top;
    },
    /**
     * 点击prev按钮切换至上一页
     */
    prevPage(){
      if(this.pos_info_current_page==1) return false;
      var dom = document.getElementById("gymInfo")
      let height = document.getElementsByClassName("school-cell-show")[0].offsetHeight*3.15
      var top = parseInt(dom.style.marginTop.split("px")[0])+height+"px";
      dom.style.marginTop = top;
      this.pos_info_current_page = this.pos_info_current_page-1;
    },
    getAreaInfo(area_id,field_id){
      api.getFieldInfo(area_id,field_id).then(res=>{
        if(res&&res.status == 200&&res.data.retcode ==="000000"){
          var result = res.data.data;
          this.field_info.pos_info_list= [ ];
          result.pos_info_list.forEach(item=>{
            item.active = false;
            if(item.device_status_desc=="在线"){
              item.diviceStatus = true;
              item.diviceStatusClass=" ";
            }else if(item.device_status_desc=="离线"){
              item.diviceStatus = true;
              item.diviceStatusClass="offline"
            }else{
              item.diviceStatus = false;
              item.diviceStatusClass="outline"
            }
            item.mistake_recognize_rate =  item.mistake_recognize_rate.toFixed(2);
            this.field_info.pos_info_list.push(item)
          })
          this.field_info.recognize_rate = result.success_recognize_rate*100;
          this.field_info.recognize_rate = this.field_info.recognize_rate.toFixed(1);
          this.device_use_count.today = this.field_info.pos_info_list[0].device_today_recognize_count;
          this.device_use_count.total = this.field_info.pos_info_list[0].device_recognize_count;
          var length = this.field_info.pos_info_list.length;
          if(length>0){
            if(length%3==0)
              this.pos_info_total_pages = parseInt(length/3)
            else
              this.pos_info_total_pages = parseInt(length/3)+1
          }
          this.models.forEach((item,index)=>{
            if(index<length){
              item.active = true;
            }
          })
          this.field_info.pos_info_list[this.defaultIndex].active = true;
          this.position.left =  parseInt(this.models[this.defaultIndex].styleObj.left.split("%")[0])-25+"%";
          this.position.top =  parseInt(this.models[this.defaultIndex].styleObj.top.split("%")[0])-41.5+"%";
          if(this.defaultIndex==12){
            this.position.left =  "27%";
            this.position.top =  "-13.5%";
          }
          this.deviceStatus = this.field_info.pos_info_list[this.defaultIndex].diviceStatus?false:true;
        }
      }).then(()=>{
        let device_id = this.field_info.pos_info_list[this.defaultIndex].device_id;
//        this.getLastInfo(device_id);
        this.rollScreen();
      })
    },
    /**
     * 根据设备id等信息得到最后一个录入信息
     */
    getLastInfo(device_id){
      let area_id = this.field_info.area_id;
      let field_id =this.field_info.field_id;
      device_id = device_id?device_id:this.field_info.pos_info_list[0].device_id;
      api.getLastCollectInfo(area_id,field_id,device_id).then(res=>{
        if(res&&res.status == 200&&res.data.retcode ==="000000"){
          var result = res.data.data;
          this.lastInfo.collect_name = result.last_collect_info.collect_name;
          this.lastInfo.collect_mobile = result.last_collect_info.collect_mobile;
        }
      })
    },
    rollScreen(){
      let length = document.getElementsByClassName("school-cell-show").length;
      if(length>=1){
        let lastDom = document.getElementsByClassName("school-cell-show")[length-1];
        let height = document.getElementsByClassName("school-cell-show")[0].offsetHeight*1.05;
        let dom = document.getElementById("gymInfo");
        if(lastDom.className.indexOf("school-active")>=0){
          dom.style.marginTop = "0px";
          document.getElementsByClassName("school-cell-show")[0].click();
        }
        else{
          let arr = document.getElementsByClassName("school-cell-show");
          let activeIndex = 0;
          for(let i=0;i<length;i++){
            if(arr[i].className.indexOf("school-active")>=0){
              activeIndex = i;
            }
          }
          let top = dom.style.marginTop?dom.style.marginTop.split("px")[0]:0;
          dom.style.marginTop = top-height+"px";
          document.getElementsByClassName("school-cell-show")[activeIndex+1].click();
        }
      }
    }
  },
  created() {
    //获取一级页面发来的广播，接受区域id,地区id等信息查询获得详细信息
    bus.$on("fieldOption",(res)=>{
      this.field_info.field_name = res.field_name;
      this.field_info.field_pos_count = res.field_pos_count;
      this.field_info.field_collect_count = res.field_collect_count;
      this.field_info.area_id = res.area_id;
      this.field_info.field_id = res.field_id;
      this.getAreaInfo(res.area_id,res.field_id);
    })
  },
  mounted(){
    this.intervalId = setInterval(()=>{
      let area_id =  this.field_info.area_id;
      let field_id = this.field_info.field_id;
      this.getAreaInfo(area_id,field_id)
    },5000)
},
  beforeDestroy(){
    clearInterval(this.intervalId);
    bus.$off("fieldOption");
  }
}
</script>
