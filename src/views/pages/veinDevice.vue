<template>
  <div class="content content1" @click="changeAreaList()">
    <div class="left-box">
      <div class="show1">
        <section class="area-show">
          <p class="area-show-title">区域点位分布</p>
          <div class="area-show-choose">
            <p>{{totalInfo.default_name}}</p>
            <div class="area-list-box" v-show="toggleArea" @click="stopProgation($event)">
              <ul class="area-list-choose" >
                <li v-for = 'item in areaList':class="(item.active?'area-choose-active':'')" @click="changeAreaInfo(item)">{{item.area_name}}</li>
              </ul>
            </div>
          </div>
          <i class="choose-btn" @click="changeArea($event)"></i>
        </section>
        <section class="area-all-data">
          <p class="all-data-title">{{totalInfo.default_name}}省录入人数</p>
          <i></i>
          <p class="all-data-number digital">{{field_info.area_collect_count}}</p>
        </section>
        <section class="area-cell-data">
          <div class="prev-box" @click="prevPage()" v-show="field_info_current_page>1&&field_info_total_pages>1?true:false">
            <i></i>
          </div>
          <div class="info-box">
            <ul id="fieidInfo">
              <li class="area-cell-show" v-for="item in field_info.field_info_list">
                <div class="cell-show-title">
                  <p class="cell-show-titleName">{{item.field_name}}</p>
                  <p class="cell-show-more" @click="getFieldOption(item,field_info.area_id)"><a href="#/schooldata">more+</a></p>
                </div>
                <div class="cell-show-data">
                  <div class="cell-all-data">
                    <p class="cell-all-data-title">总录入人数</p>
                    <p class="cell-all-data-number digital">{{item.field_collect_count}}</p>
                  </div>
                  <div class="cell-today-data">
                    <p class="cell-all-data-title">今日录入人数</p>
                    <p class="cell-all-data-number digital">{{item.field_today_collect_count}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="next-box" @click="nextPage()" v-show="field_info_current_page<field_info_total_pages&&field_info_total_pages>1?true:false">
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
        <div class="container-show1">
          <div class="map-box">
            <div class="chinaMap">
              <div class="chinaMap-cell-box">
                <div class="virtual-area" v-for="(item,index) in virtualBoxs" :style="item.classObj" @click = "randomFlash(index,item)"></div>
                <div class="flash-box" :style="flashStyle"></div>
              </div>
            </div>
            <div class="recognition-persent">
              <div class="recognition-persent-bgd">
                <!--<p class="digital">{{totalInfo.recognize_rate}}</p>-->
                <p class="digital">81.2%</p>
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
              <p class="all-devices-number digital">{{totalInfo.total_pos_count}}</p>
              <div>
                <p class="totol-number-devices">全国设备总数</p>
                <p class="totol-number-devicesE">TOTOL NUMBER OF DEVICES</p>
              </div>
            </div>
            <div class="all-input-number">
              <div class="today-input-people">
                <p class="today-input-title">今日录入人数</p>
                <p class="today-input-data digital">{{totalInfo.today_collect}}</p>
              </div>
              <div class="account-input-people">
                <p class="account-input-title">累计录入人数</p>
                <p class="account-input-data digital">{{totalInfo.total_collect}}</p>
              </div>
            </div>
            <div class="area-device">
              <div class="field-list-box">
                <ul class="area-device-list">
                  <li class="area-device-cell" v-for="item in totalInfo.pos_statistics_info">
                    <i class="outline-icon"></i>
                    <p class="area-device-title">{{item.area_name}}</p>
                    <p class="area-device-condition">{{item.online_count}}台录入设备在线</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="area-footer">
              <p>全国录入点位分布情况</p>
              <i></i>
            </div>
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
    data() {
      return {
        toggleArea:false,//区域选择框v-show属性
        virtualBoxs:[
          {
            "classObj":{
              width:"35%",
              height: "25%",
              top: "22%",
              left: "2%",
              transform: "rotate(-36deg)"
            }
          },
          {
            "classObj":{
              width:"34%",
              height: "10%",
              top: "29%",
              left: "46%",
              transform: "rotate(-31deg)"
            }
          },
          {
            "classObj":{
              width:"13%",
              height: "10%",
              top: "14%",
              left: "81%",
              transform: "rotate(20deg)"
            }
          },
          {
            "classObj":{
              width:"13%",
              height: "6%",
              top: "24%",
              left: "80%",
              transform: "rotate(21deg)"
            }
          },
          {
            "classObj":{
              width:"22%",
              height: "7%",
              top: "42%",
              left: "36%",
              transform: "rotate(39deg)"
            }
          },
          {
            "classObj":{
              width:"18%",
              height: "15%",
              top: "43%",
              left: "29%",
              transform: "rotate(0deg)"
            }
          },
          {
            "classObj":{
              width:"35%",
              height: "15%",
              top: "50%",
              left: "6%",
              transform: "rotate(32deg)"
            }
          },
          {
            "classObj":{
              width:"15%",
              height: "14%",
              top: "58%",
              left: "42%",
              transform: "rotate(0deg)"
            }
          },
          {
            "classObj":{
              width:"14%",
              height: "8%",
              top: "48%",
              left: "53%",
              transform: "rotate(90deg)"
            }
          },
          {
            "classObj":{
              width:"12%",
              height: "6%",
              top: "43%",
              left: "60%",
              transform: "rotate(90deg)"
            }
          },
          {
            "classObj":{
              width:"13%",
              height: "7%",
              top: "37%",
              left: "66%",
              transform: "rotate(107deg)"
            }
          },
          {
            "classObj":{
              width:"10%",
              height: "7%",
              top: "31%",
              left: "77%",
              transform: "rotate(-34deg)"
            }
          },
          {
            "classObj":{
              width:"12%",
              height: "7%",
              top: "44%",
              left: "71%",
              transform: "rotate(-34deg)"
            }
          },
          {
            "classObj":{
              width:"9%",
              height: "7%",
              top: "52%",
              left: "64%",
              transform: "rotate(0deg)"
            }
          },
          {
            "classObj":{
              width:"10%",
              height: "6%",
              top: "60%",
              left: "64%",
              transform: "rotate(14deg)"
            }
          },
          {
            "classObj":{
              width:"4%",
              height: "11%",
              top: "51%",
              left: "78%",
              transform: "rotate(-40deg)"
            }
          },
          {
            "classObj":{
              width:"6%",
              height: "11%",
              top: "54%",
              left: "73%",
              transform: "rotate(-40deg)"
            }
          },
          {
            "classObj":{
              width:"5%",
              height: "9%",
              top: "60%",
              left: "58%",
              transform: "rotate(31deg)"
            }
          },
          {
            "classObj":{
              width:"12%",
              height: "19%",
              top: "70%",
              left: "40%",
              transform: "rotate(-65deg)"
            }
          },
          {
            "classObj":{
              width:"10%",
              height: "8%",
              top: "70%",
              left: "52%",
              transform: "rotate(-20deg)"
            }
          },
          {
            "classObj":{
              width:"11%",
              height: "9%",
              top: "77%",
              left: "56%",
              transform: "rotate(-35deg)"
            }
          },
          {
            "classObj":{
              width:"7%",
              height: "13%",
              top: "65%",
              left: "63%",
              transform: "rotate(-35deg)"
            }
          },
          {
            "classObj":{
              width:"6%",
              height: "7%",
              top: "89%",
              left: "61%",
              transform: "rotate(0deg)"
            }
          },
          {
            "classObj":{
              width:"14%",
              height: "6%",
              top: "77%",
              left: "63%",
              transform: "rotate(-35deg)"
            }
          },
          {
            "classObj":{
              width:"5%",
              height: "12%",
              top: "65%",
              left: "71%",
              transform: "rotate(25deg)"
            }
          },
          {
            "classObj":{
              width:"6%",
              height: "8%",
              top: "62%",
              left: "79%",
              transform: "rotate(35deg)"
            }
          },
          {
            "classObj":{
              width:"5%",
              height: "10%",
              top: "69%",
              left: "76%",
              transform: "rotate(25deg)"
            }
          }
        ],//地图上虚拟盒子布局
        flashObj:{
          "classObj" : {
            0:{
              "width":"3%",
              "height":"4%"
            },
            1:{
              "width":"4%",
              "height":"5%"
            },
            2:{
              "width":"5%",
              "height":"6%"
            },
            3:{
              "width":"8%",
              "height":"10%"
            }
          },
          "colorObj" : {
            0:"#c5606f",
            1:"#7fc9ff",
            2:"#c5b755",
            3:"#c58055"
          }
        },//闪烁点属性配置json
        _index:-1,//闪烁点默认索引,
        flashStyle:{},//闪烁点style对象
        field_info:{
          field_info_list:[
            {
              schoolName:"电子科技大学",
              allData:50964,
              todayData:2532
            },
            {
              schoolName:"四川航空航天职业技术学院",
              allData:20132,
              todayData:1236
            },
            {
              schoolName:"暂无数据",
              allData:20132,
              todayData:2532
            },
          ],
        },
        totalInfo:{
          total_collect:0,
          today_collect:0,
          recognize_rate:0,
          pos_statistics_info:[
            {
              area_id:1,
              area_name:'四川',
              online_count:4
            }
          ]
        },//总计信息
        areaList:[
          {
            area_id:100,
            area_name:'重庆',
            active:true
          }
        ],//地区信息
        field_info_current_page:1,
        field_info_total_pages:0
      }
    },
    methods:{
      /**
       *闪烁点随鼠标移动出现
       */
      randomFlash(index,_this){
        if(this._index == index) return false;
        else{
          this.virtualBoxs.forEach(function(item){
            item.classObj["z-index"] = 0;
          })
          _this.classObj["z-index"] = 8;
          var classObject = { };
          var key;
          var defaultJson = this.flashObj;
          function randomClass(){
            var randomNum = parseInt(Math.random()*4);
            var randomNumber = parseInt(Math.random()*4);
            for(var i in defaultJson["classObj"]){
              if(i == randomNum){
                key = i;
                classObject[key]= defaultJson["classObj"][i]
              }
            }
            for(var i in defaultJson["colorObj"]){
              if(i == randomNum){
                classObject[key]["background"]= defaultJson["colorObj"][i]
              }
            }
          }
          randomClass();
          if(parseInt(_this.classObj.width)-parseInt(classObject[key]["width"].split("%")[0])<=4||parseInt(_this.classObj.height)-parseInt(classObject[key]["height"].split("%")[0])<=4){
            randomClass();
          }
          let left = parseInt(_this.classObj.width)/2+parseInt(_this.classObj.left)-3+"%";
          let top = parseInt(_this.classObj.height)/2+parseInt(_this.classObj.top)-2+"%";
          classObject[key]["left"] = left;
          classObject[key]["top"] = top;
          this.flashStyle = classObject[key];
          document.getElementsByClassName("flash-box")[0].style.left = classObject[key].left;
          document.getElementsByClassName("flash-box")[0].style.top = classObject[key].top;
          document.getElementsByClassName("flash-box")[0].style.background = classObject[key].background;
          this.$data['_index'] = index;
        }
      },
      /**
       * 切换区域选择框
       */
      changeArea(e){
        e.stopPropagation();
        this.toggleArea = !this.toggleArea;
      },
      changeAreaList(){
        this.toggleArea = false;
      },
      stopProgation(e){
        e.stopPropagation();
      },
      /**
       * 查询总计信息
       */
      getTotalInfo(){
        api.getTotalInfo().then((res)=>{
          if(res&&res.status == 200&&res.data.retcode ==="000000"){
            let data = res.data.data;
            this.totalInfo.total_collect = data.total_collect_count;
            this.totalInfo.today_collect = data.today_collect_count;
            this.totalInfo.total_pos_count = data.total_pos_count;

            this.totalInfo.recognize_rate = data.success_recognize_rate*100;
            this.totalInfo.recognize_rate = this.totalInfo.recognize_rate.toFixed(1)
            this.totalInfo.pos_statistics_info = [ ];
            data.pos_statistics_info.forEach(item=>{
              this.totalInfo.pos_statistics_info.push(item)
            })
            this.totalInfo.default_id = this.totalInfo.pos_statistics_info[0].area_id;
            this.totalInfo.default_name = this.totalInfo.pos_statistics_info[0].area_name;
          }
        }).then(()=>{
          this.getAreaInfo();
        });
      },
      /**
       *查询区域列表
       */
      getAreaList(){
        api.getAreaList().then((res)=>{
          if(res&&res.status == 200&&res.data.retcode ==="000000"){
            let data = res.data.data;
            this.areaList = [ ];
            data.area_list.forEach(item=>{
              item.active = item.area_id == this.totalInfo.default_id?true:false;
              this.areaList.push(item)
            })
          }
        })
      },
      /**
       * 根据区域id查找区域下的信息
       */
      getAreaInfo(areaId){
        let area_id = typeof areaId ==="number"?areaId:this.totalInfo.default_id;
        api.getAreaInfo({'area_id':area_id}).then((res)=>{
          if(res&&res.status == 200&&res.data.retcode ==="000000"){
            var result = res.data.data[1];
            this.field_info.area_collect_count = result.area_collect_count;
            this.field_info.today_collect_count = result.today_collect_count;
            this.field_info.field_info_list = [ ];
            result.field_info_list.forEach(item=>{
              this.field_info.field_info_list.push(item)
            })
            this.field_info.area_id = this.totalInfo.default_id;
            let length = this.field_info.field_info_list.length;
            if(length>0){
              if(length%3==0)
                this.field_info_total_pages = parseInt(length/3)
              else
                this.field_info_total_pages = parseInt(length/3)+1
            }
          }
        })
      },
      /**
       * 点击区域切换显示区域下地区列表
       * param;ref  当前区域对象
       */
      changeAreaInfo(ref){
        this.toggleArea = false;
        if(this.totalInfo.default_id == ref.area_id) return false;
        let areaId = this.totalInfo.default_id = ref.area_id;
        this.totalInfo.default_name = ref.area_name;
        this.areaList.forEach(item=>{
          item.active = false;
        })
        ref.active = true;
        this.getAreaInfo(areaId)
      },
      /**
       * 点击更多获取当前区域id,地区id,广播到二级页面
       * param:item 地区对象
       * param:area_id 区域id
       */
      getFieldOption(item,area_id){
        this.getFieldOption = {
          "area_id" : area_id,
          "field_id" : item.field_id,
          "field_name":item.field_name,
          "field_pos_count":item.field_pos_count,
          "field_collect_count":item.field_collect_count
        }
      },
      /**
       * 点击next按钮切换至下一页
       */
      nextPage(){
        if(this.field_info_current_page == this.field_info_total_pages) return false;
        var top = -163*this.field_info_current_page+"%";
        this.field_info_current_page = this.field_info_current_page+1;
        var dom = document.getElementById("fieidInfo")
        dom.style.marginTop = top;
      },
      /**
       * 点击prev按钮切换至上一页
       */
      prevPage(){
        if(this.field_info_current_page==1) return false;
        var dom = document.getElementById("fieidInfo")
        var top = parseInt(dom.style.marginTop.split("%")[0])+163+"%";
        dom.style.marginTop = top;
        this.field_info_current_page = this.field_info_current_page-1;
      }
    },
    mounted:function(){
      this.getTotalInfo();
      this.getAreaList();
      this.intervalId = setInterval(()=>{
        this.getTotalInfo();
        this.getAreaList();
      },5000)
    },
    beforeDestroy(){
      clearInterval(this.intervalId)
    },
      destroyed() {
      bus.$emit('fieldOption', this.getFieldOption)
    }
  }
</script>
