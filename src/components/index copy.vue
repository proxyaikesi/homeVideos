
  <!-- <div class="h1" @click="one">点我
    <input type="text">
    <router-link to="/register" active-class="active">皮蛋编程</router-link>
  </div> -->
      <!-- <button class="main_h" @click="callChildMethod">调用子组件方法</button> -->
<template>
  <div class="box">


    <div class="fullPage" ref="fullPageaa">
      <div class="fullPageContainer" ref="fullPageContainer" @wheel="mouseWheelHandle">
        <Video @play="handlePlay(index)" :isPlaying="videolist.currentVideoIndex === index" ref="child"  @pause="handlePause(index)"
          v-for="(item, index) in videolist.arrList" class="btn" :inNum="index" :isplay="videolist.currentVideoIndex"
          :mp4Url="item.file_name">
        </Video>

      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Video from './video.vue'
import { onBeforeMount, getCurrentInstance, ref, reactive, onUpdated, onMounted, nextTick, defineComponent, watch } from "vue";
import axios from 'axios'
export default ({
  components: {
    Video,
    RouterView
  },
  setup() {
    const child = ref(null);
    let videolist = reactive({
      arrList: [],  // 所有视频信息
      newArr: [], // 默认5条累加
      everyTime: 5,
      currentVideoIndex: 0
    })
    const childRef = ref(null);
    const callChildMethod = () => {

      // console.log('sssssss', child.value[videolist.currentVideoIndex].isplayer = false);

    };

    onBeforeMount(() => {
      fnList()
    });
    function handlePlay(index) {
      // console.log(index, '撒啊啊啊啊啊啊啊啊');
      if (videolist.currentVideoIndex !== index) {
        videolist.currentVideoIndex = index;
        // 暂停其他视频
        videolist.arrList.forEach((item, idx) => {
          if (idx !== index && item.ref && item.ref.pause) {
            item.ref.pause();
          }
        });
      }

    }
    function fnList() {
      axios.get('http://localhost:3000/getVideo').then((el) => {
        videolist.arrList = el.data.item.sort(() => 0.5 - Math.random())
        // console.log(videolist.arrList);

        addList(5)
      })
    }
    function addList(nums) {
      let num = 0
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
    // watch(child.value[videolist.currentVideoIndex].isplayer, (newValue, oldValue) => {
    //   // newValue ? videoRef.value.play() : videoRef.value.pause();
    //   console.log(newValue, oldValue);
    // })


    function scrollDown() {

      videolist.currentVideoIndex = (videolist.currentVideoIndex + 1) % videolist.arrList.length;
      // console.log(videolist.currentVideoIndex, '下面',child.value[videolist.currentVideoIndex].someMethod());
      // console.log(videolist.currentVideoIndex, '下面',child.value[videolist.currentVideoIndex].isplay);
      // console.log(child.value[videolist.currentVideoIndex].handleSpacebar());
      directToMove(videolist.currentVideoIndex)
    }
    function scrollUp() {
      videolist.currentVideoIndex = (videolist.currentVideoIndex - 1 + videolist.arrList.length) % videolist.arrList.length;
      // console.log(videolist.currentVideoIndex, '上面');
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
      fullpage, mouseWheelHandle, videolist, childRef, handlePlay, child, callChildMethod,
      fullPageContainer, fullPageaa, scrollDown, scrollUp, directToMove
    }
  },
})

</script>

<style scoped lang="scss">
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
  flex-direction: column;
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
  background: url('../../public/wallpaper.png');
}

// .fullPage {
//   height: 100vh; //一定要设置，保证占满
//   overflow: hidden; //一定要设置，多余的先隐藏ss
//   background: url('../../public/wallpaper.png');
// }
.fullPage {
  position: absolute;
  left: 0;
  top: calc(0% + 0px);
  width: 100%;
  height: calc(100% - 0px);
  overflow: visible;
  padding-left: 0;
  padding-right: 68px;
  min-height: 455px;
}

.fullPageContainer {
  width: 100%;
  display: flex;

  flex-direction: column;
  height: 90vh;

  // background:'./public/wallpaper.png' ;
  background: #4947470a;
  border-radius: 10px;
  // background: url("./static/images/logo.png");
  transition: all linear 0.2s;
  flex-direction: column;
  align-items: center;
}

.btn {}

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