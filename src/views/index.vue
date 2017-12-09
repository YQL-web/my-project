<template>
  <div id="container">
    <div class="header">
      <p class="header-title">智帮静脉设备综合数据</p>
      <i class="header-left"></i>
      <i class="header-right"></i>
    </div>
    <div class="main">
      <router-view></router-view>
      <div class="bar-box">
        <span class="bar-box-cell bar01"></span>
        <span class="bar-box-cell bar02"></span>
        <span class="bar-box-cell bar03"></span>
        <span class="bar-box-cell bar04"></span>
        <span class="bar-box-cell bar05"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{

      }
    },
    methods:{
      /**
       **根据宽度按比例初始化网页高度，并初始化rem的值
       **/
      autoHeight(){
        document.body.style.height = document.body.clientWidth*0.5625+"px";
        document.getElementsByTagName("html")[0].style.fontSize = document.body.clientWidth/38.5+"px";
      },
      /**
       **获取时间
       **/
      getNowDate(){
        var date=new Date();
        var year=date.getFullYear(); //获取当前年份
        var mon=date.getMonth()+1; //获取当前月份
        var day=date.getDate(); //获取当前日期
        var weekend=date.getDay(); //获取当前星期几
        var h=date.getHours(); //获取小时
        var m=date.getMinutes(); //获取分钟
        var s=date.getSeconds(); //获取秒
        h = h<10?"0"+h:h;
        m = m<10?"0"+m:m;
        s = s<10?"0"+s:s;
        document.getElementsByClassName("date")[0].innerHTML = year+"年"+mon+"月"+day+"日";
        document.getElementsByClassName("time")[0].innerHTML = h+"："+m+"："+s;
      }
    },
    mounted:function(){
      this.autoHeight();
      window.onresize =()=>{
        this.autoHeight();
      }
      var _this = this;
      setInterval(function(){_this.getNowDate()},1000)
    }
  }

</script>
