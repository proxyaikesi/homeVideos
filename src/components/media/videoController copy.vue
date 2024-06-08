<template>
    <div class="control-box">
        <div class="control">
            <div class="progress-box" @mouseover="isShow = true" @mouseleave="isShow = false">
                <div ref="bar_cont" class="progress-bar-container" :class="{ active: isShow }"
                    @mousedown="handleMouseDown">
                    <div class="progress-bar" :style="{ width: state.progressBarWidth + '%' }"
                        :class="{ active: isShow }"></div>
                    <div class="progress-thumb" :style="{ left: state.progressBarWidth + '%' }" @mousedown="startDrag"
                        :class="{ active: isShow, }">
                    </div>
                </div>

            </div>
            <div class="left-grid">
                <div class="play-cont" @click="togglePlay">
                    <span class="play-icon">
                        <div class="play-icon" :class="{ 'pause-icon': isPlaying }"></div>
                    </span>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, getCurrentInstance, inject, watch, nextTick, watchEffect } from 'vue'
export default {

    name: '',
    props: {
        currentVideoIndex: Number,
        isPlaying: {
            type: Boolean,
            default: false
        }
    },
    emits: ['play', 'pause',],
    setup(props) {
        const videoRefs = inject('videoRefs');
        const newIndex = ref()
        const bar_cont = ref()
        const state = reactive({
            currentTime: 0, // 当前时间
            duration: 0,    // 总时间
            progressBarWidth: 0, // 进度条宽度
        });
        const togglePlay = () => {
            const video = videoRefs.value[props.currentVideoIndex];
            if (video) {
                if (video.paused) {
                    video.play(); // 播放视频
                    console.log('哈哈哈哈哈哈哈哈哈哈');
                    emit('play', props.currentVideoIndex);
                } else {
                    video.pause(); // 暂停视频
                    emit('pause', props.currentVideoIndex);
                }
            }
        };
        watchEffect(() => {
            if (videoRefs.value[props.currentVideoIndex]) {
                setDuration(props.currentVideoIndex);
            }
        });
        function setDuration(index) {
            if (videoRefs.value[index]) {
                const video = videoRefs.value[index];
                console.log('视频元素:', video);
                if (video) {
                    if (video.readyState >= 1) {
                        state.duration = video.duration;
                    } else {
                        const handleLoadedMetadata = () => {
                            state.duration = video.duration;
                            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                        };
                        video.addEventListener('loadedmetadata', handleLoadedMetadata);
                    }

                    video.addEventListener('timeupdate', () => {
                        state.currentTime = video.currentTime;
                    });
                } else {
                    console.log('视频元素尚未加载，等待下一次更新。');
                }
            }
        }
        watch(() => state.currentTime, (newTime) => {
            state.progressBarWidth = (newTime / state.duration) * 100;
        });
        const isShow = ref(false)
        const onDrag = (event) => {

            event.preventDefault();
            nextTick(() => { // 使用 nextTick 确保 DOM 更新完成后再获取 ref
                const bar = bar_cont.value; // 获取 ref 元素
                const barWidth = bar.offsetWidth;
                isShow.value = true
                const mouseX = event.clientX - bar.getBoundingClientRect().left;
                const newTime = (mouseX / barWidth) * state.duration;
                state.currentTime = newTime;
                videoRefs.value[props.currentVideoIndex].currentTime = newTime;
            });
        };

        const startDrag = (event) => {
            event.stopPropagation(); // 阻止事件冒泡
            event.preventDefault(); // 阻止默认行为

            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        };
        function handleMouseDown(event) {
            event.preventDefault();
            const bar = event.currentTarget; // 1822px
            const clickX = event.offsetX;
            const newTime = (clickX / bar.offsetWidth) * state.duration;
            state.currentTime = newTime
            videoRefs.value[props.currentVideoIndex].currentTime = newTime;
        }

        const stopDrag = (event) => {
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            event.stopPropagation();
            isShow.value = false
        };
        const emit = getCurrentInstance().emit; // 获取 emit 方法
        return {
            state,
            isShow,
            startDrag,
            onDrag,
            stopDrag,
            videoRefs,
            setDuration,
            newIndex,
            handleMouseDown,
            bar_cont,
            togglePlay,
        }
    }
}
</script>
<style scoped lang="scss">
.control-box {
    position: absolute;
    bottom: 0px;
    overflow: hidden;
    width: 95%;
    padding-top: 20px;
    height: 50px;
    left: 50%;
    transform: translateX(-50%);

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
                    // transition: width 0.5s ease;
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
                        background-image: url('./../../../public/icon_svg/player_icon.svg');
                    }

                    div.pause-icon {
                        width: 22px;
                        height: 22px;
                        background: no-repeat;
                        background-image: url('./../../../public/icon_svg/pause_icon.svg');
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
                    background: url('./../../../public/icon_svg/muted_icon.svg');
                    background-repeat: no-repeat;
                }

                .muted-icon.active {
                    background: url('./../../../public/icon_svg/unmuted_icon.svg');
                }
            }
        }
    }
}
</style>