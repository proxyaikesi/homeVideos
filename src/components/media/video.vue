<template>
  <div class="video-container">
    <video
      style="height: 90vh"
      ref="videoRef"
      preload="metadata"
      :loop="Looping"
      @contextmenu.prevent
      @click="togglePlay"
      :muted="muted"
    >
      <source type="video/mp4" :src="mp4Url" />
    </video>
  </div>
</template>
<script>
import { ref, watch, onMounted } from "vue";
export default {
  props: {
    mp4Url: String,
    isplay: Number,
    inNum: Number,
    muted: Boolean,
    Looping: Boolean,
  },
  setup(props, { emit }) {
    const videoRef = ref(null);

    // 组件挂载时添加事件监听
    onMounted(() => {
      // document.addEventListener('keydown', handleSpacebar);
      videoRef.value.addEventListener("ended", () => {
        emit("pause"); // 发射暂停事件
      });
      emit("videoMounted", videoRef.value, props.inNum);
    });

    watch(
      () => props.isplay,
      (newVal) => {
        if (newVal >= 0 && newVal === props.inNum) {
          videoRef.value.play();
          emit("play");
        } else {
          videoRef.value.pause();
        }
      }
    );
    const togglePlay = () => {
      if (videoRef.value.paused) {
        videoRef.value.play(); // 播放视频
        emit("play");
      } else {
        videoRef.value.pause(); // 暂停视频
        emit("pause");
      }
    };
    return {
      videoRef,
      togglePlay,
    };
  },
};
</script>

<style scoped lang="scss">
.video-container {
  position: relative;
  height: 100%;
  width: 95%;

  .speed-options {
    list-style: none;
    height: auto;
    width: 57px;
    right: 46px;
    position: absolute;
    border-radius: 12px;
    padding: 20px 0 0;
    display: block;
    background: #343540;
    bottom: 50px;

    .speed-option {
      width: 100%;
      text-align: center;
      opacity: 0.7;
      cursor: pointer;
      margin-bottom: 16px;
      line-height: 18px;
      color: #5e686b;
      font-size: 14px;
      font-weight: 600px;
    }
  }
}
</style>
