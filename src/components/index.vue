<template>
  <div class="h1" @click="one">点我
    <input type="text">
    <router-link to="/register" active-class="active">皮蛋编程</router-link>
  </div>
  <div class="fullPage" ref="fullPageaa">
    <div class="fullPageContainer" ref="fullPageContainer" @mousewheel="mouseWheelHandle"
      @DOMMouseScroll="mouseWheelHandle">
        <Video v-for="(item, index) in videolist.newArr" :inNum="index + 1" :isplay="fullpage.current"
          :mp4Url="item.file_name">
        

        </Video>
 


    </div>
  </div>
</template>
  
<script>
import { RouterView } from 'vue-router';
import { videoPlay } from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'
import Video from './video.vue'
import { onBeforeMount, getCurrentInstance, ref, reactive, onUpdated, onMounted, nextTick, } from "vue";

import axios from 'axios'
export default ({
  components: {
    videoPlay,
    Video,
    RouterView
  },
  setup() {
    let videolist = reactive({
      arrList: [],  // 所有视频信息
      newArr: [], // 默认5条累加
      everyTime: 5
    })
    onBeforeMount(() => {
      fnList()

    });
    function fnList() {
      axios.get('http://localhost:3000/getVideo').then((el) => {
        videolist.arrList = el.data.item.sort(()=> 0.5 - Math.random())
        console.log( videolist.arrList);
      
        addList(5)
      })
    }
    function addList(nums) {
      let num = 0

      if (videolist.arrList.length > 5) {
        console.log('ssssss啊实打实的');
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
    const one = () => {
      videolist.everyTime += 5
      addList()
    }

    const next = () => { // 往下切换
      let len = videolist.newArr.length; // 页面的个数
      if (fullpage.current + 1 <= len) { // 如果当前页面编号+1 小于总个数，则可以执行向下滑动
        fullpage.current += 1; // 页面+1
        console.log('页数', fullpage.current);
        move(fullpage.current); // 执行切换

      }
    }
    const pre = () => {// 往上切换
      if (fullpage.current - 1 > 0) { // 如果当前页面编号-1 大于0，则可以执行向下滑动
        fullpage.current -= 1;// 页面+1
        console.log('页数', fullpage.current);
        move(fullpage.current);// 执行切换
      }
    }
    const move = (index) => {
      fullpage.isScrolling = true; // 为了防止滚动多页，需要通过一个变量来控制是否滚动
      directToMove(index); //执行滚动
      setTimeout(() => {  //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
        fullpage.isScrolling = false;
      }, 1000);
    }
    const directToMove = (index) => {
      let height = fullPageaa.value.clientHeight; //获取屏幕的宽度c
      // let scrollPage = this.$refs["fullPageContainer"]; // 获取执行tarnsform的元素
      let scrollPage = fullPageContainer.value // 获取执行tarnsform的元素
      let scrollHeight; // 计算滚动的告诉，是往上滚还往下滚
      scrollHeight = -(index - 1) * height + "px";
      scrollPage.style.transform = `translateY(${scrollHeight})`;
      fullpage.current = index;
    }
    const mouseWheelHandle = (event) => { // 监听鼠标监听
      // 添加冒泡阻止
      let evt = event || window.event;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
      }
      if (fullpage.isScrolling) { // 判断是否可以滚动
        return false;
      }
      let e = event.originalEvent || event;
      fullpage.deltaY = e.deltaY || e.detail; // Firefox使用detail
      if (fullpage.deltaY > 0) {
        next();
      } else if (fullpage.deltaY < 0) {
        pre();
      }
    }




    return {
      fullpage, mouseWheelHandle, videolist,
      directToMove, directToMove, move, pre, one, next, fullPageContainer, fullPageaa
    }
  },
})

</script>
  
<style  lang="scss">

.h1 {
  color: #fff;
  position: absolute;
  z-index: 9999;
}

.fullPage {
  height: 830px; //一定要设置，保证占满
  overflow: hidden; //一定要设置，多余的先隐藏ss
  font-size: 0;

  // background: red;
}

.fullPageContainer {
  width: 100%;
  height: 830px; //一定要设置，保证占满

  transition: all linear 0.3s;
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
  