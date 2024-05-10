<template>
    <video id="videos" ref="refmp4" autoplay preload="auto" :src="mp4Url" >
        <!-- {{ mp4Url }} -->
        <source src="999">
    </video>
</template>
<script>
import { number } from 'echarts'
import { fn } from 'moment-timezone'
import { reactive, ref, onMounted, onUpdated, useSlots, watch } from 'vue'
export default {
    props: ['mp4Url', 'isplay','inNum'],
    setup(props) {

        const slot = useSlots()
        const num = reactive({
            videoNum: number
        })
        const refmp4 = ref(Array);
        num.videoNum = props.isplay
        onUpdated(() => {
            // console.log(' 77777777777777777777777777777777.value', refmp4.value);
            if (props.inNum == props.isplay) {
                num.videoNum = props.isplay
                
                setTimeout(()=>{
                    refmp4.value.play()
                    
                },500)
               
            }else{
                refmp4.value.pause()
                refmp4.value.currentTime=0
            }
            
            // console.log(refmp4.value.play()); 
        })
        function fnn(index){
           console.log( refmp4.value.length);
            // for(var i =0; i < refmp4.value.length; i++){
            //     console.log('hhhhhhhhhhhhhhhhhhhhhhhh',index);
            // }
        }
        watch(props, (newVal, oldVal) => {
         

            // if(oldVal.isplay ==  num.videoNum){
            //     console.log('监听引用类型数据dataList',num.videoNum,newVal.isplay)
            // }else{
            // console.log('监听引aaaaaaaaa', newVal.isplay)
            // console.log('sdsd', refmp4.value);

            // refmp4.value.play()
            // }

            // console.log('new', newVal.isplay)
            // console.log('old', oldVal.isplay)
        })
        return { refmp4, num }
    }
}
</script>
<style scoped>
video {
    width: 100%;
    height: 830px;
}

h2 {
    color: #fff;
    position: relative;
    top: 0;
    z-index: 10000;
    font-size: 15px;

}
</style>
  