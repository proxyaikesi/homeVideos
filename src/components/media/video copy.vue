<template>
    <div class="video-container">
        <video style="height: 100%;" ref="videoRef" preload="metadata" :loop="isLooping" @contextmenu.prevent
            @click="togglePlay">
            <source type="video/mp4" :src="mp4Url" />
        </video>

    </div>
</template>
<script>
import { ref, reactive, watch, onMounted, computed, onUnmounted, onBeforeUnmount, inject, nextTick } from 'vue';

export default ({
    // props: ['mp4Url', 'isplay', 'inNum'],

    props: {
        mp4Url: String,
        isplay: Number,
        inNum: Number,
        isPlaying: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const isMuted = inject('isMuted')
        const isLooping = inject('isLooping');
        const isShow = ref(false)
        const isActive = ref(false);
        const bar_cont = ref(null)
        const videoRef = ref(null);
        const videoController = inject('videoController');
        const updateProgress = () => {
            // 在这里更新进度
        };

        // 组件挂载时添加事件监听
        onMounted(() => {
            // document.addEventListener('keydown', handleSpacebar);
            videoRef.value.addEventListener('ended', () => {
                emit('pause'); // 发射暂停事件
            });
            emit('videoMounted', videoRef.value, props.inNum);
        });
        // watch(() => props.isplay, (newVal, nowVal) => {
        //     if (newVal >= 0) {
        //         if (props.isplay == props.inNum) {
        //             videoRef.value.play();
        //             emit('play');
        //         } else {
        //             videoRef.value.pause();

        //         }
        //     }
        // });
       // 简化的 watch 代码
       watch(() => props.isplay, (newVal) => {
            if (newVal >= 0 && newVal === props.inNum) {
                videoRef.value.play();
                emit('play');
            } else {
                videoRef.value.pause();
            }
        });

        const togglePlay = () => {
            if (videoRef.value.paused) {
                videoRef.value.play(); // 播放视频
                emit('play');
            } else {
                videoRef.value.pause(); // 暂停视频
                emit('pause');
            }
        };




        let hideTimeout;
        const speeds = ref(['0.75x', '1x', '1.25x', '1.5x', '1.75x', '2x', '3x']);
        const optionsVisible = ref(false); // 控制播放速度选项的显示
        const toggleMute = () => {
            isMuted.value = !isMuted.value;
        };
        const toggleloop = () => {
            isLooping.value = !isLooping.value;
        };
        // 显示播放速度选项
        // 鼠标输入显示选项
        const showOptions = () => {
            optionsVisible.value = true;

        };
        // 隐藏播放速度选项
        // 鼠标离开隐藏选项
        const hideOptions = () => {
            hideOptionsWithDelay()
        };
        // 鼠标输入保持选项可见
        const keepOptionsVisible = () => {
            optionsVisible.value = true;
            // if (hideTimeout) {

            clearTimeout(hideTimeout); // 当鼠标移入选项框时，清除延迟
            // }
        };
        // 鼠标离开隐藏选项WithDelay
        const hideOptionsWithDelay = () => {
            hideTimeout = setTimeout(() => {
                optionsVisible.value = false;
            }, 300); // 延迟300毫秒后隐藏选项框
        };
        // 设置播放速度的函数
        const setPlaybackSpeed = (speed) => {
            // 这里应该有代码来改变视频播放器的播放速度
            videoRef.value.playbackRate = parseFloat(speed)
        };

        // function toggleSwitch() {
        //     isActive.value = !isActive.value;
        // }
        // const toggleVideo = () => {
        //     if (videoRef.value.paused) {
        //         videoRef.value.play();
        //         isPlaying.value = true;
        //     } else {
        //         videoRef.value.pause();
        //         isPlaying.value = false;
        //     }
        // };



        // 组件卸载时移除事件监听
        onUnmounted(() => {
            // document.removeEventListener('keydown', handleSpacebar);
            // if (videoRef.value.readyState >= 1) {
            //     emitDuration();
            // }
            console.log('写在啦啦啦啦啦啦啦啦啦啦啦啦');
        });
        //空格键播放暂停
        function handleSpacebar(event) {
            if (event.code === 'Space' && props.isplay == props.inNum) {
                toggleVideo()
            }
        }
        // 它用于监听 state.currentTime 的变化
        // watch(() => state.currentTime, (newTime) => {
        //     state.progressBarWidth = (newTime / state.duration) * 100;

        // });
        // 获取video总时间
        // function setDuration() {
        //     videoRef.value && (state.duration = videoRef.value.duration)
        // }

        const emitDuration = () => {
            // const duration = video.value.duration;
            // emit('durationChange', duration);
        };
        // 更新视频播放的当前时间 当视频正在播放时 state.currentTime
        // function updateProgress() {
        //     // videoRef.value && (state.currentTime = videoRef.value.currentTime);
        // }

        // function handleMouseDown(event) {
        //     event.preventDefault();
        //     const bar = event.currentTarget; // 1822px
        //     const clickX = event.offsetX;
        //     const newTime = (clickX / bar.offsetWidth) * state.duration;
        //     state.currentTime = newTime
        //     videoRef.value.currentTime = newTime;
        // }


        // const formattedCurrentTime = computed(() => formatTime(state.currentTime));// 当前时间
        // const formattedDuration = computed(() => formatTime(state.duration));// 总时间
        function formatTime(time) {
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }
        return {
            videoRef,
            // state,
            // stopDrag,
            // setDuration,
            isShow,
            // startDrag,
            // onDrag,
            formatTime,
            // formattedCurrentTime,
            // formattedDuration,
            bar_cont,
            // isPlaying,
            // handleMouseDown,
            // toggleVideo,
            updateProgress,
            isActive,
            speeds,
            optionsVisible,
            showOptions,
            hideOptions,
            setPlaybackSpeed,
            hideTimeout,
            keepOptionsVisible,
            hideOptionsWithDelay,
            isMuted, toggleMute, isLooping, toggleloop,
            emitDuration,
            videoController,
            togglePlay,
        };

    }
});
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
            opacity: .7;
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
