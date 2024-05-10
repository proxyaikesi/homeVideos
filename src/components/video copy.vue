<template>
    <div class="video-container">
        <keep-alive>
        <video style="height: 90vh;" ref="videoRef" @wheel="handleScroll" @click="toggleVideo" preload="metadata"
            @timeupdate="updateProgress" @pause="emitPause" @loadedmetadata="setDuration">
            <source :src="mp4Url" type="video/mp4" />
        </video>
    </keep-alive>
        <div class="control-box">
            <div class="control">
                <div class="progress-box" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
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
                            <div class="play-icon" :class="{ 'pause-icon': isplayer }"></div>
                        </span>
                    </div>
                    <div class="player-time">
                        <span>{{ formattedCurrentTime }}</span>
                        <span> / </span>
                        <span>{{ formattedDuration }}</span>
                    </div>
                </div>
                <div class="right-grid">
                    <span>{{ inNum }}</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { number } from 'echarts';
import { ref, reactive, watch, onMounted, computed, onUnmounted, defineExpose, onBeforeUnmount, nextTick,onDeactivated } from 'vue';

export default ({
    // props: ['mp4Url', 'isplay', 'inNum'],
    props: {
        mp4Url: String,
        isplay: Number,
        inNum: Number
    },
    setup(props) {
        onDeactivated(()=>{
            console.log('ss消失了');
        })
        const page = ref(props.isplay);
        const isShow = ref(false)
        const bar_cont = ref(null)
        const videoRef = ref(null);
        const isplayer = ref(false); // 使用ref创建响应式数据
        const state = reactive({
            currentTime: 0, // 当前时间
            duration: 0,    // 总时间
            progressBarWidth: 0, // 进度条宽度
            isDragging: false
        });
        function emitPause() {

            nextTick(() => {
                // videoRef.value.pause()
                // console.log('杀杀杀杀杀杀杀杀杀', props.isplay);
            })

        }
        watch(() => props.isplay, (newVal, nowVal) => {
           
            if( props.isplay == props.inNum){
                toggleVideo()
                
            }else{
                isplayer.value = false
            }
            
        });
        const toggleVideo = () => {

            if (videoRef.value.paused ) {
                // videoRef.value.play();
                isplayer.value = true

            } else {
                // videoRef.value.pause();
                isplayer.value = false
            }
        };
        //         onMounted(() => {
        //   window.addEventListener('scroll', handleScroll);
        // });

        // 在组件卸载时移除滚动监听
       

        watch(isplayer, (newValue, oldValue) => {
            newValue ? videoRef.value.play() : videoRef.value.pause();
        })
        watch(page, (newValue, oldValue) => {
            // console.log('\\\\\\\\\\\\\\\\\\\\\\\\');

        })
        function handleScroll() {
            // console.log('\\\\\\\\\\\\\\\\\\\\\\\\', videoRef.value.paused, 'sssssssssssssssssssss');
            if (videoRef.value.paused) {
                // videoRef.value.play();
                // videoRef.value.pause(); 
                // console.log(videoRef.value.pause());
                // toggleVideo()

            } else {
                //     // videoRef.value.pause();
                //     // isplayer.value = false
                // }
                // if(props.isplay == props.inNum){
                //     console.log('\\\\\\\\\\\\\\\\\\\\\\\\',props.isplay);
            }


        }
        const someMethod = () => {
            console.log('子组件的方法被调用');

        };
        defineExpose({ someMethod })
        // 组件挂载时添加事件监听
        onMounted(() => {
            window.addEventListener('keydown', handleSpacebar);
        });

        // 组件卸载时移除事件监听
        onUnmounted(() => {
            window.removeEventListener('keydown', handleSpacebar);
        });
        function handleSpacebar(event) {
            if (event.code === 'Space' && props.isplay == props.inNum) {
                event.preventDefault(); // 阻止默认行为
                toggleVideo()
            }
        }
        watch(() => state.currentTime, (newTime) => {
            state.progressBarWidth = (newTime / state.duration) * 100;
            if (state.progressBarWidth >= 100) {
                isplayer.value = false
            }

        });
        function setDuration() {
            if (videoRef.value) {
                state.duration = videoRef.value.duration;
                // 获取video总时间
            }
        }
        function updateProgress(event) {


            if (videoRef.value) {
                event.stopPropagation(); // 阻止事件冒泡
                event.preventDefault(); // 阻止默认行为
                state.currentTime = videoRef.value.currentTime;
            }

        }
        function handleMouseOver() {
            console.log('dddddddd');
            isShow.value = true
        }
        function handleMouseLeave() {
            isShow.value = false
        }
        function handleMouseDown(event) {
            // 鼠标按下时的逻辑
            // isDragging.value = true;
            console.log('hhhhhhhhhhhhhhhhhhh');
            event.preventDefault();
            const bar = event.currentTarget; // 1822px
            //    console.log(bar);
            const clickX = event.offsetX;
            console.log(clickX);
            const newTime = (clickX / bar.offsetWidth) * state.duration;
            state.currentTime = newTime
            videoRef.value.currentTime = newTime;

        }

        function seekVideo(event) {

            const bar = event.currentTarget; // 1822px
            //    console.log(bar);
            const clickX = event.offsetX;
            console.log(clickX);
            const newTime = (clickX / bar.offsetWidth) * state.duration;
            state.currentTime = newTime
            videoRef.value.currentTime = newTime;
        }

        const startDrag = (event) => {
            state.isDragging = true;
            event.stopPropagation(); // 阻止事件冒泡
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);

            event.preventDefault(); // 阻止默认行为

        };
        function doSomething() {
            return console.log('s打写代码ddddddd');
        };
        const onDrag = (event) => {
            if (state.isDragging) {
                event.preventDefault();
                const barRect = bar_cont.value.getBoundingClientRect();
                const clickX = event.clientX - barRect.left;

                isShow.value = true
                const newTime = (clickX / bar_cont.value.offsetWidth) * state.duration;
                videoRef.value.currentTime = newTime;
                state.currentTime = newTime
                event.preventDefault();
            }
        };
        const stopDrag = (event) => {
            if (state.isDragging) {
                state.isDragging = false;
                document.removeEventListener('mousemove', onDrag);
                document.removeEventListener('mouseup', stopDrag);
                event.stopPropagation();
            }
        };
        const formattedCurrentTime = computed(() => formatTime(state.currentTime));// 当前时间
        const formattedDuration = computed(() => formatTime(state.duration));// 总时间
        function formatTime(time) {
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }
        const touchEvent = () => {
            console.log('s666666666666666666666666');
        }

        return {
            handleScroll,
            emitPause,
            page,
            someMethod,
            touchEvent,
            doSomething,
            defineExpose,
            videoRef,
            state,
            stopDrag,
            setDuration,
            seekVideo,
            isShow,
            startDrag,
            onDrag,
            formatTime,
            formattedCurrentTime,
            formattedDuration,
            bar_cont,
            isplayer,
            handleMouseDown,
            toggleVideo,
            updateProgress,
            handleMouseOver,
            handleMouseLeave,

        };

    }
});
</script>

<style lang="scss">
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
                width: 400px;
                display: flex;
                flex-direction: row;
            }



        }
    }


}
</style>
