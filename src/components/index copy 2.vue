<template>
  <div class="box">
    <videoPlay   v-bind="options"  :poster="poster">


    </videoPlay>
    <div @click="boxbtn">点击关灯</div>

  </div>
</template>
  
<script>
import { videoPlay } from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'
import { getCurrentInstance, ref, reactive, onUpdated, onMounted, nextTick, } from "vue";

import axios from 'axios'
export default ({
  components: {
    videoPlay,
  },

  props: ['video_url','poster'],
  setup(props) {

    const boxbtn = function (ev) {
      // options.volume = 0.9
      // var divs = document.querySelectorAll('.video-player')[0]
      // divs.classList.add('is-lightoff')
      console.log('divssss', ev);
    }
    const aplayVideo = ref(null);

    onMounted(() => {
      console.log(aplayVideo)
    })



    const options = reactive({
      width: '800px', //播放器高度
      height: '450px', //播放器高度
      color: "#409eff", //主题色
      title: '', //视频名称
      src: 'http://localhost:3000/video/1692789823716_4cbce2c133e2965ca09de8c8961245fc.MP4.MP4',
      muted: false, //静音
      webFullScreen: false,
      speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速s
      autoPlay: false, //自动播s放
      loop: false, //循环播放
      mirror: false, //镜像画面
      ligthOff: false,  //关灯模式
      volume: 0.3, //默认音量大小ds
      control: true, //是否显示控制器 is-lightoff
      poster:props.poster
    })
    return { options, boxbtn, aplayVideo, onMounted, props}
  },
})

</script>
  
<style  lang="scss">
.box {
  width: 600px;
  height: 800px;
  margin: 0 auto;
}

.video-player {
  // width: 100% !important;
  // height: 100% !important;
  display: block !important;
}
</style>
  