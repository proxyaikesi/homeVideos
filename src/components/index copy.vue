<template>
  <div>
    <div id="main" :style="{ width: '800px', height: '300px' }"></div>
    <div ref="home"></div>
  </div>
  
  





</template>
  
<script>

import { getCurrentInstance, onMounted } from "vue";
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue-video-player'
import { inject } from "vue";


import axios from 'axios';
export default {
  components: {
    videoPlay,
    },
  setup() {


  },
  mounted() {
    let echarts = inject('echarts')
   
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom,);
    var option;
    option = {
      title: {
        text: '空调全年季度',
        textStyle: {
          color: '#fff'
        },
        left: 'auto'
      },
      xAxis: {
        type: 'category',
        data: ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7'],
        splitLine: {
          show: false
        },
        lineStyle: {
          // 线条不选中时候的效果
          width: 10,
        },
        axisTick:{
          show:false
        },
        axisLabel: {
          margin:15,
          color:'#000',
          fontStyle:'oblique',
          align:'right',
          

        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      series: [
        {
          data: [170, 200, 140, 135, 90, 120, 60],
          type: 'line',
          color: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373',],
          // smooth:0.6,  //曲线
          symbol: 'none',
          lineStyle: {
            color: '#2772e2',
            width: 5,
          },
          areaStyle: {
          

              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2772e2" },
                { offset: 1, color: "#fff" },
              ])
           
          }
        }
      ],
      tooltip: {
        // showContent: true,
        // triggerOn: 'mousemove'
      }
    };
    option && myChart.setOption(option);
  },
  data() {
    return {
      percentage: 0,
      value: 0,
      flag: false,
      UPLOAD_INFO: {
        NO_FILE: "请先选择文件",
        INVALID_TYPE: "不支持该类型文件上传",
        UPLOAD_FAILED: "上传失败",
        UPLOAD_SUCCESS: "上传成功",
      },
      ALLOWED_TYPE: {
        "video/mp4": "mp4",
        "video/ogg": "ogg",
      },
      option: {},
      dataList: [
        { id: 1, src: "http://localhost:3000/1689764201111_ab5695e1e9b08898f2de60bf67d37479.MP4.MP4" },
        { id: 2, src: "http://localhost:3000/1689764207176_b8d1c16caaa3b6f9c224ad59f461c9f4.MP4.MP4" },
        { id: 3, src: "http://localhost:3000/1689765816450_f7a1b214a5d5575c8d9f972a8963423c.MP4.MP4" },


      ],
      CHUNK_SIZE: 60 * 1024,
      uploadPercentage: 0,




      methods: {


        // async uploadFile() {
        //   const input = this.$refs.fileInput;
        //   const file = input.files[0];

        //   const formData = new FormData();
        //   formData.append('file', file);

        //   const config = {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     onUploadProgress: progressEvent => {
        //       this.uploadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //     }
        //   };

        //   try {
        //     await axios.post('/server/upload', formData, config);
        //     this.uploadPercentage = 0;
        //     input.value = '';
        //   } catch (e) {
        //     console.error(e);
        //   }
        // }



        async btnload() {
          let uploadedSize = 0;
          const oUploader = this.$refs.file
          console.log(oUploader);

          const { files: [file] } = oUploader

          console.log(file);
          if (!file) {
            this.$message({
              message: this.UPLOAD_INFO.NO_FILE,
              type: 'warning'
            });
            return
          }
          if (!this.ALLOWED_TYPE[file.type]) {
            this.$message({
              message: this.UPLOAD_INFO.INVALID_TYPE,
              type: 'warning'
            });
            return
          }



          const { name, size, type } = file

          const fileName = new Date().getTime() + "_" + name //1687410158561_23s1000rr.mp4
          let uploadedResult = '';

          // const Progress = this.$refs.uploaderProgress
          // Progress.max = size






          this.percentage = size

          while (uploadedSize < size) {
            const fileChunk = file.slice(uploadedSize, uploadedSize + this.CHUNK_SIZE)
            const fileFormData = this.createFormDate({
              name,
              type,
              size,
              fileName,
              uploadedSize,
              file: fileChunk,
            })


            try {

              uploadedResult = await axios.post('http://localhost:3000/upload_video', fileFormData)
            } catch (error) {
              console.log(reeor, 'ssssssssssssssssssssssss');
              return
            }

            uploadedSize += fileChunk.size;
            // Progress.value = uploadedSize;
            this.value = uploadedSize;
          }


          this.$refs.file.files.value = null;
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^', this.$refs.file.files);
          console.log(uploadedResult.data.video_url,);
          this.$options.methods.createVideo.bind(this)(uploadedResult.data.video_url);
        },
        createFormDate({ name, type, size, fileName, uploadedSize, file }) {
          const fd = new FormData()
          fd.append('name', name)
          fd.append('type', type)
          fd.append('size', size)
          fd.append('fileName', fileName)
          fd.append('uploadedSize', uploadedSize)
          fd.append('file', file)
          return fd
        },
        createVideo(src) {
          const oVideo = document.createElement('video')
          oVideo.id = 'ovideo'
          oVideo.width = "500";
          oVideo.src = src;
          oVideo.controls = true;
          this.$refs.home.appendChild(oVideo)
          console.log('11111111111111111111111111');

          this.$options.methods.close.bind(this)('oVideo')
          // console.log('22222222222222222222222222222222222222222222222222222222');

        },

        close(oVideo) {

          const videos = document.querySelector('#ovideo')
          const owidth = videos.clientWidth
          const oheight = videos.clientHeight
          console.log('video');

          this.$nextTick(() => {
            const videos = document.querySelector('#ovideo')
            // const owidth = videos.clientWidth
            // const oheight = videos.clientHeight
            console.log(videos.clientWidth, videos.clientHeight);
            console.log(videos);
            // const a = 'video'
            // // console.log('video',owidth,oheight);
            // console.log(a);
            // // console.log('oheight',oheight);
          })
          // console.log('owidth222',oheight);
          // console.log('owidth222',owidth);
          // if(owidth>oheight){
          //   console.log('横屏啊啊啊啊');
          // }else{
          //   console.log('竖屏幕啊啊啊');
          // }

        }


      }
    }
  }
}

</script>
  
<style scoped>
.banner {
  width: 100%;
  height: 350px;

  /* background: url('../../public/1323184.png') 100% 100%; */
  background-size: cover;

  background-color: #000;

}

.banner .banner_img {

  position: relative;
}

.banner .banner_img img {
  width: 600px;
  height: 350px;
}

.banner .banner_img .left_img {
  position: absolute;
  left: 0;
}

.banner .banner_img .right_img {
  position: absolute;
  right: 0;
}

.banner .banner_cont {
  width: 60vw;
  margin: 20px auto;
}

.banner .banner_cont .cont_item {
  height: 300px;
  margin: 20px auto;
}

progress {
  width: 300px;
  height: 50px;
}

video:focus {
  outline: none !important;
}

.el-carousel__item {
  /* border-radius: 10px; */
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}






.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}

.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
</style>
  