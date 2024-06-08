<template>
  <div class="box">
    <div class="fullPage" ref="fullPageaa">
      <div class="fullPageContainer" ref="fullPageContainer" @wheel="mouseWheelHandle">
        <Video v-for="(item, index) in videolist.arrList" :inNum="index" :isplay="videolist.currentVideoIndex"
          :mp4Url="item.file_name" @videoMounted="handleVideoMounted(index, $event)" @play="handlePlay"
          @pause="handlePause" :isPlaying="isPlaying">

        </Video>
      </div>
      <MediaController :currentVideoIndex="videolist.currentVideoIndex" :videoRefs="videoRefs" :isPlaying="isPlaying"
        @play="handlePlay" @pause="handlePause" ></MediaController>
    </div>
  </div>
</template>

<script>
import Video from './media/video.vue'
import MediaController from './media/videoController.vue'
import { onBeforeMount, ref, reactive, provide, onMounted, nextTick, onBeforeUpdate } from "vue";
import axios from 'axios'
export default ({
  components: {
    Video,
    MediaController,

  },

  setup() {
    const isLooping = ref(false);
    const MediaController = ref(null)
    let videolist = reactive({
      arrList: [],  // 所有视频信息
      newArr: [], // 默认5条累加
      everyTime: 5,
      currentVideoIndex: ref(0)
    })
    const isPlaying = ref(false);
    const videoRefs = ref([]);
    function handleVideoMounted(index, videoRef) {
      videoRefs.value[index] = videoRef;

    }
    provide('videoRefs', videoRefs); // 提供 videoRefs
    const handlePlay = () => {
      isPlaying.value = true;
    };
    const handlePause = () => {
      isPlaying.value = false;

    };
 

    const videoState = reactive({
      currentTime: 0,
      duration: 0,
      progressBarWidth: 0,
    });
    const isMuted = ref(false);
    provide('isMuted', isMuted);
    provide('isLooping', isLooping);


    onBeforeMount(() => {
      fnList()
    });

    function fnList() {
      axios.get('http://localhost:3000/getVideo').then((el) => {
        console.log(el.data.item[0].author.user);
        videolist.arrList = el.data.item.sort(() => 0.5 - Math.random())
        console.log(videolist.arrList);

        addList(5)
      })
    }
    function addList(nums) {

      if (videolist.arrList.length > 5) {
        // console.log('ssssss啊实打实的');
        videolist.newArr = videolist.arrList.slice(0, videolist.everyTime)
      }

    }
    const fullPageContainer = ref()
    const fullPageaa = ref()
    const fullpage = reactive({
      current: 1, // 当前的页面编号
      isScrolling: false, // 是否在滚动,是为了防止滚动多页，需要通过一个变量来控制是否滚动S
      deltaY: 0 //返回鼠标滚轮的垂直滚动量，保存的鼠标滚动事件的deleteY,用来判断是往下还是往上滚
    })
    let scrolling = false;
    const mouseWheelHandle = (event) => { // 监听鼠标监听
      // 添加冒泡阻止
      if (!scrolling) {
        if (event.deltaY > 0) {
          // 向下滚动
          // console.log('向下滚动', event.deltaY);
          scrollDown();
        } else {
          // 向上滚动
          // console.log('向上滚动', event.deltaY);
          scrollUp();
        }
        scrolling = true; // 设置为正在滚动中
        setTimeout(() => {
          scrolling = false; // 1秒后设置为非滚动状态，防止连续滚动
        }, 1000);
      }

    }
    function scrollDown() {

      videolist.currentVideoIndex = (videolist.currentVideoIndex + 1) % videolist.arrList.length;
      directToMove(videolist.currentVideoIndex)
    }
    function scrollUp() {
      videolist.currentVideoIndex = (videolist.currentVideoIndex - 1 + videolist.arrList.length) % videolist.arrList.length;
      directToMove(videolist.currentVideoIndex)
    }
    function directToMove(index) {
      const height = fullPageaa.value.clientHeight;
      const scrollPage = fullPageContainer.value;
      const scrollHeight = -(index * height) + 'px';
      scrollPage.style.transform = `translateY(${scrollHeight})`;
      fullpage.current = index;
    }
    return {
      fullpage, mouseWheelHandle, videolist,
      fullPageContainer, fullPageaa, isMuted, isLooping, videoState,
      videoRefs,
      handleVideoMounted,
      isPlaying,
      handlePlay,
      handlePause,
      MediaController,
    }
  },
})

</script>

<style scoped lang="scss">
.Controller {
  width: 95%;
  height: 90px;
}

.h1 {
  color: #fff;
  position: absolute;
  z-index: 9999;
}

.main_h {
  position: relative;
  font-size: 50px;
  color: #fff;
  z-index: 9999;
}

.box {
  height: 90vh;
  top: 70px;
  position: relative;
  overflow: hidden;
  background: url('../../public/wallpaper.png');
}

.fullPage {
  position: absolute;
  width: 100%;
  height: calc(90vh - -1px);
}

.fullPageContainer {
  width: 100%;
  display: flex;
  height: calc(90vh - -1px);
  transition: all linear 0.2s;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
}


.section1 .secction1-content {
  color: #fff;
  text-align: center;
  position: absolute;
  top: 40%;
  right: 0;
  left: 0;
}

.secction1-content h1 {
  font-size: 40px;
  padding-bottom: 30px;
}

.secction1-content p {
  font-size: 20px;
}
</style>