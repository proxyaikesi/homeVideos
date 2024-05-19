<template>
    <div class="video-container">
        
       

    </div>
</template>
<script>
import { number } from 'echarts';
import { ref, reactive, watch, onMounted, computed, onUnmounted, onBeforeUnmount, } from 'vue';

export default ({
    // props: ['mp4Url', 'isplay', 'inNum'],
    props: {
        mp4Url: String,
        isplay: Number,
        inNum: Number
    },
    setup(props) {
         


        return {

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


}
</style>
