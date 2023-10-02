<template>
  <div>
    <div class="img_pink">
      <img src="../../../../public/img_pink.png" alt="">
      <h1>上传文件啦!!</h1>
    </div>
    <div class="layout_cont">
      <div class="uploadbox">
        <div class="upload_main" @dragover="fileDragover" @drop="fileDrop">
          <img src="../../../../public/upload.png" @dragstart.prevent alt="">
        </div>
        <div class="upload_right">

          <label>
            <span>上传本地视频</span>
            <input type="file" @change="load" class="file-input" :v-model="uploadFile" ref="file"
              style="display: none;" />
          </label>

          <p style="margin-top: 6px;">将短视频拖拽至框内</p>
        </div>
      </div>
      <div class="info">
        <div class="info_item">
          <p>视频格式</p>
          <p> 支持常用格式,使用mp4、ogg</p>
        </div>
        <div class="info_item">
          <p>视频大小</p>
          <p>视频文件大小不超过16G,时长在60分钟以内</p>
        </div>
        <div class="info_item">
          <p>视频分辨率</p>
          <p>分辨率为720p(1280x720)及以上</p>
        </div>
      </div>
    </div>
    <div ref="video_home">
    </div>


  </div>
</template>
  
<script>
import axios from 'axios'
import { mapState } from 'vuex';
export default {
  props: ['order'],
  data() {
    return {
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
      uploadFile: '',
    }
  },

  mounted() {
    if (sessionStorage.getItem('V_id')) {
      axios.post('http://localhost:3000/deleteInfo', {
        params: {
          v_id: sessionStorage.getItem('V_id'),
          user_id: this.$store.state.userInfo.userid
        }
      }).then(() => {
        sessionStorage.clear()
      })
    }



  },
  created() {
   
  
  },

  methods: {
    load(e) {
      this.uploadFile = this.$refs.file
      const { files: [file] } = this.uploadFile
      this.file = file
      this.a(this.$refs.file)
    },

    fileDragover(e) {
      e.preventDefault()
    },
    fileDrop(e) {
      e.preventDefault()
      console.log(e.dataTransfer.files);
      const file = e.dataTransfer.files[0]
      this.file = file
      this.a(file)
    },
    a(jfile) {
      if (!jfile) {
        this.$message({
          message: this.UPLOAD_INFO.NO_FILE,
          type: 'warning'
        });
        return
      }
      if (!this.ALLOWED_TYPE[this.file.type]) {
        this.$message({
          message: this.UPLOAD_INFO.INVALID_TYPE,
          type: 'warning'
        });
        return
      } else {
        const aa = this.$refs.file

        const { files: [file] } = aa
        if (jfile.name == '') {
          this.$store.commit("SET_PROJECTTITLEID", [{ id: file }]);
          console.log('aaaaaaaaaaaaaaaaaaa', aa);

        } else {
          this.$store.commit("SET_PROJECTTITLEID", [{ id: jfile }]);
        }
        this.$router.push({ name: 'uploadHome' })
      }
    },
  }
}
</script>
  
<style scoped lang="scss">
#press {
  width: 100%;
  height: 50px;
  border-radius: 0;
  background: #FFF;
}

progress::-webkit-progress-bar {
  background-color: #1E1E24;
}

progress::-webkit-progress-value {
  background: #772ce8;
  background: -webkit-gradient(linear, 30% 0%, 0% 100%, from(#772ce8), to(#f140f8));
  border-radius: 0.2rem;
}

::v-deep .el-progress-bar__outer {
  width: 100%;
  height: 50px !important;
  border-radius: 0;
}

.img_pink {
  width: 100%;
  height: 180px;
  background: #6811eb;
  position: relative;
}

.img_pink img {
  position: absolute;
  left: 230px;
  top: 20px;

}

.img_pink h1 {
  color: #fff;
  padding-top: 70px;

}

.layout_cont {
  height: 445px;
  background: #1E1E24;
  padding: 25px 25px 0 25px;
  cursor: pointer;
}

.layout_cont p {
  color: #ffffff61;
  margin: 0;
  font-size: 14px;
  margin-bottom: 9px;
  text-align: left;
}

.layout_cont .uploadbox {
  width: 100%;
  height: 310px;
  background: #29292F;
  margin-bottom: 30px;
  border-radius: 4px;
  color: #fff;
  border-radius: 3px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;

}

.layout_cont .uploadbox .upload_main {
  width: 341px;
  height: 199px;
  border: 1px dashed #979797;
  border-radius: 4px;
  margin-right: 60px;
}

.layout_cont .uploadbox .upload_right span {
  width: 114px;
  height: 32px;
  font-size: 13px;
  line-height: 32px;
  display: inline-block;
  border-radius: 20px;
  background: linear-gradient(135deg, #d242e6, #00c5ff 52%, #d242e6)
}

.layout_cont .info {
  width: 100%;
  display: flex;
}

.layout_cont .info .info_item {
  flex: 1;
  height: 50px;
  border-radius: 4px;
  padding: 16px;
  background: #2f2f35;
  margin-right: 10px;
}

.layout_cont .info .info_item:last-child {
  margin-right: 0;
}

.layout_cont .info .info_item p {
  color: rgba(255, 255, 255, 0.38);
  ;
}

.layout_cont .info .info_item>p:nth-child(1) {
  color: #fff;
}
</style>
  