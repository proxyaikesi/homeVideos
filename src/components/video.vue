<template>
    <div class="video-container">
        <video style="height: 90vh;" ref="videoRef" @click="toggleVideo" preload="metadata" :loop="isLooping"
            @timeupdate="updateProgress" @contextmenu.prevent :muted="isMuted" @loadedmetadata="setDuration">
            <source type="video/mp4" :src="mp4Url" />
        </video>
        <div class="control-box">
            <div class="control">
                <div class="progress-box" @mouseover="isShow = true" @mouseleave="isShow = false">
                    <div ref="bar_cont" class="progress-bar-container" :class="{ active: isShow }"
                        @mousedown="handleMouseDown">
                        <div class="progress-bar" :style="{ width: state.progressBarWidth + '%' }"
                            :class="{ active: isShow }"></div>
                        <div class="progress-thumb" :style="{ left: state.progressBarWidth + '%' }"
                            @mousedown="startDrag" :class="{ active: isShow, }">
                        </div>
                    </div>
                </div>
                <div class="left-grid">
                    <div class="play-cont">
                        <span class="play-icon">
                            <div class="play-icon" :class="{ 'pause-icon': isPlaying }"></div>
                        </span>
                    </div>
                    <div class="player-time">
                        <span>{{ formattedCurrentTime }}</span>
                        <span> / </span>
                        <span>{{ formattedDuration }}</span>
                    </div>
                </div>
                <div class="right-grid">
                    <!-- <span>{{ inNum }}</span> -->
                    <div class="clear-screen" @click="toggleSwitch">
                        <div class="toggle-switch" :class="{ active: isActive }"></div>
                        &nbsp;清屏
                    </div>
                    <div class="clear-screen" @click="toggleloop">
                        <div class="toggle-switch" :class="{ active: isLooping }"></div>
                        &nbsp;循环播放
                    </div>
                    <div class="double-speed">
                        <div class="speed-label" @mouseenter="showOptions" @mouseleave="hideOptions">倍速</div>
                    </div>
                    <div class="muted" @click="toggleMute">
                        <div class="muted-icon" :class="{ active: isMuted }"></div>
                    </div>
                </div>
            </div>
        </div>
        <ul class="speed-options" v-show="optionsVisible" @mouseenter="keepOptionsVisible"
            @mouseleave="hideOptionsWithDelay">
            <li class="speed-option" v-for="speed in speeds" :key="speed" @click="setPlaybackSpeed(speed)">
                {{ speed }}
            </li>
        </ul>
    </div>
</template>
<script>
import { ref, reactive, watch, onMounted, computed, onUnmounted, onBeforeUnmount, inject } from 'vue';

export default ({
    // props: ['mp4Url', 'isplay', 'inNum'],
    props: {
        mp4Url: String,
        isplay: Number,
        inNum: Number
    },
    setup(props) {
        const isMuted = inject('isMuted')
        const isLooping = inject('isLooping');
        const isShow = ref(false)
        const isActive = ref(false);
        const bar_cont = ref(null)
        const videoRef = ref(null);
        const isPlaying = ref(false); // 使用ref创建响应式数据
        const state = reactive({
            currentTime: 0, // 当前时间
            duration: 0,    // 总时间
            progressBarWidth: 0, // 进度条宽度
        });
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
        watch(() => props.isplay, (newVal, nowVal) => {
            if (newVal >= 0) {
                if (props.isplay == props.inNum) {
                    isPlaying.value = true
                    videoRef.value.play();
                } else {
                    videoRef.value.pause();
                    isPlaying.value = false

                }
            }
        });
        function toggleSwitch() {
            isActive.value = !isActive.value;
        }
        const toggleVideo = () => {
            if (videoRef.value.paused) {
                videoRef.value.play();
                isPlaying.value = true;
            } else {
                videoRef.value.pause();
                isPlaying.value = false;
            }
        };

        // 组件挂载时添加事件监听
        onMounted(() => {
            document.addEventListener('keydown', handleSpacebar);
            videoRef.value.addEventListener('ended', () => {
                isPlaying.value = false;
            });
            // 监听视频结束事件
           

           
          
        });

        // 组件卸载时移除事件监听
        onUnmounted(() => {
            document.removeEventListener('keydown', handleSpacebar);
        });
        //空格键播放暂停
        function handleSpacebar(event) {
            if (event.code === 'Space' && props.isplay == props.inNum) {
                toggleVideo()
            }
        }
        // 它用于监听 state.currentTime 的变化
        watch(() => state.currentTime, (newTime) => {
            state.progressBarWidth = (newTime / state.duration) * 100;

        });
        // 获取video总时间
        function setDuration() {
            videoRef.value && (state.duration = videoRef.value.duration)
        }
        // 更新视频播放的当前时间 当视频正在播放时 state.currentTime
        function updateProgress() {
            videoRef.value && (state.currentTime = videoRef.value.currentTime);
        }

        function handleMouseDown(event) {
            event.preventDefault();
            const bar = event.currentTarget; // 1822px
            const clickX = event.offsetX;
            const newTime = (clickX / bar.offsetWidth) * state.duration;
            state.currentTime = newTime
            videoRef.value.currentTime = newTime;
        }

        const onDrag = (event) => {
            const barRect = bar_cont.value.getBoundingClientRect();
            const clickX = event.clientX - barRect.left;
            isShow.value = true
            const newTime = (clickX / bar_cont.value.offsetWidth) * state.duration;
            videoRef.value.currentTime = newTime;
            state.currentTime = newTime
        };
        const startDrag = (event) => {
            event.stopPropagation(); // 阻止事件冒泡
            event.preventDefault(); // 阻止默认行为
            
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        };
        const stopDrag = (event) => {
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            event.stopPropagation();
            toggleVideo()
            // isShow.value = false
            setTimeout(() => {
                isShow.value = false
            }, 100);
        };
        const formattedCurrentTime = computed(() => formatTime(state.currentTime));// 当前时间
        const formattedDuration = computed(() => formatTime(state.duration));// 总时间
        function formatTime(time) {
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }
        return {
            videoRef,
            state,
            stopDrag,
            setDuration,
            isShow,
            startDrag,
            onDrag,
            formatTime,
            formattedCurrentTime,
            formattedDuration,
            bar_cont,
            isPlaying,
            handleMouseDown,
            toggleVideo,
            updateProgress,
            isActive,
            toggleSwitch,
            speeds,
            optionsVisible,
            showOptions,
            hideOptions,
            setPlaybackSpeed,
            hideTimeout,
            keepOptionsVisible,
            hideOptionsWithDelay,
            isMuted, toggleMute, isLooping, toggleloop
        };

    }
});
</script>

<style scoped lang="scss">
.video-container {
    flex-direction: column;
    display: flex;
    position: relative;
    height: 100%;
    width: 95%;

    .control-box {
        position: absolute;
        bottom: 0px;
        overflow: hidden;
        width: 100%;
        padding-top: 20px;
        height: 50px;

        .control {

            width: 100%;

            height: 50px;
            background-image: linear-gradient(#3332323d 0%, rgba(0, 0, -9, 0.6) 100%);

            .progress-box {
                width: 100%;
                height: 13px;
                display: flex;
                justify-content: center;
                align-items: center;

                .progress-bar-container.active {
                    height: 6px;
                    background: #cfcfcf;
                    font-size: 30px;
                    width: 100% !important;
                    transform-origin: center;
                }

                .progress-bar-container {
                    width: 100%;
                    height: 2px;
                    margin-bottom: 8px;
                    background-color: #5e686b;
                    cursor: pointer;
                    border-radius: 3px;
                    transform-origin: center;


                    .progress-bar {
                        height: 100%;
                        border-radius: 3px;
                        background-color: #b3baba;
                        position: relative;
                        transition: width 0.5s ease;
                    }

                    .progress-bar.active {
                        background-color: transparent;
                    }

                    .progress-thumb {
                        position: absolute;
                        cursor: pointer;
                        bottom: 0;
                        /* z-index: 9999; */
                        top: 16px;
                        left: 100%;
                        width: 13px;
                        display: none;
                        height: 13px;
                        border-radius: 50%;
                        background-color: #ffffff;
                        /* 小圆点的颜色 */
                        transform: translateX(-50%);
                        /* 居中对齐 */
                        box-shadow: 0 0 0 5px rgb(221 221 221 / 31%);
                        cursor: pointer;
                        /* Add any additional styling you want */
                    }

                    .progress-thumb.active {
                        display: block;
                    }
                }


            }


            .left-grid {
                float: left;
                height: 30px;
                width: 400px;
                display: flex;
                flex-direction: row;

                .play-cont {
                    width: 24px;
                    height: 100%;
                    padding: 0 6px 0 16px;

                    .play-icon {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        justify-content: center;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        height: 100%;
                        color: #fff;
                        cursor: pointer;

                        div.play-icon {
                            width: 22px;
                            height: 22px;
                            background: no-repeat;
                            background-image: url('./../../public/icon_svg/player_icon.svg');
                        }

                        div.pause-icon {
                            width: 22px;
                            height: 22px;
                            background: no-repeat;
                            background-image: url('./../../public/icon_svg/pause_icon.svg');
                        }
                    }
                }

                .player-time {
                    color: #fff;
                    height: 30px;
                    line-height: 30px;


                    span {
                        font-family: PingFang SC, DFPKingGothicGB-Medium, sans-serif;
                        font-size: 15px;
                        font-weight: 1000;
                        line-height: 18px;
                    }
                }
            }

            .right-grid {
                float: right;
                height: 30px;
                width: 300px;
                display: flex;
                flex-direction: row;

                .clear-screen {
                    color: #fff;
                    display: flex;
                    padding: 0 10px;
                    font-weight: 600;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    font-size: 14px;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;

                    .toggle-switch {
                        position: relative;
                        width: 35px;
                        height: 16px;
                        background-color: #bcbdc2;
                        border-radius: 25px;
                        margin-top: 2px;
                        transition: background-color 0.3s;
                    }

                    .toggle-switch.active {
                        background-color: #e81554;
                    }

                    .toggle-switch.active:before {
                        left: 20px;
                    }

                    .toggle-switch:before {
                        content: "";
                        position: absolute;
                        top: 2px;
                        left: 5px;
                        width: 11px;
                        height: 11px;
                        background-color: white;
                        border-radius: 50%;
                        transition: left 0.3s;
                    }

                }

                .double-speed {
                    position: relative;
                    display: inline-block;
                    font-size: 14px;
                    font-weight: 600;
                    font-size: 14px;
                    color: #fff;

                    .speed-label {
                        padding: 5px 10px;
                        cursor: pointer;
                        font-size: 14px;
                    }
                }

                .muted {
                    padding: 0 10px;
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;

                    .muted-icon {
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        margin-top: 5px;
                        background: url('./../../public/icon_svg/muted_icon.svg');
                        background-repeat: no-repeat;
                    }

                    .muted-icon.active {
                        background: url('./../../public/icon_svg/unmuted_icon.svg');
                    }
                }
            }
        }
    }

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
