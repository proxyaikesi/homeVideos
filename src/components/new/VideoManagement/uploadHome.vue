<template>
  <progress id="press" ref="uploaderProgress" value="0" max="100"></progress>
  <el-cascader size="large" v-if="false" :options="pcaTextArr" v-model="selectedOptions"></el-cascader>
  <form @submit.prevent="handleSubmit">
    <div class="info_box">
      <h3>{{ this.$route.params.code ? '修改信息' : '基本信息' }}</h3>
      <div class="file_name">
        <p>文件名</p>
        <div class="row obtain" @click.stop="btn_a" v-bind:class="{ iptline: shows == 1 }">
          <span>{{ this.upload_name }}</span>
        </div>
      </div>
      <div class="file_tl">
        <p>标题</p>
        <div class="row obtain" @click.stop="btn_b($event)" v-bind:class="{ iptline: shows == 2 }">
          <input type="text" v-model="formdata.title">
        </div>
      </div>
      <div class="describe">
        <p>描述</p>
        <textarea class="obtain" ref="textareaRef" v-model="formdata.describe" @click.stop="btn_c($event)"
          v-bind:class="{ iptline: shows == 3}"></textarea>
      </div>
      <div class="classify">
        <p>分类</p>
        <div class="boder_box" v-bind:class="{ iptline: shows == 4 }">
          <el-select popper-class="dropdown" class="obtain" :popper-append-to-body="true" v-model="formdata.classify"
            clearable @click.stop="btn_d($event)" placeholder="请选择" @change="cityChange">
            <el-option class="elop" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="classify">
        <p>隐私设置</p>
        <div class="boder_box" v-bind:class="{ iptline: shows == 5}">
          <el-select class="obtain" @click.stop="btn_e($event)" popper-class="list" v-model="public" filterable
            placeholder="请选择" @change="publicChange">
            <el-option v-for="item in optionsTwo" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="location">
        <p>位置</p>
        <div class="row obtain" @click.stop="btn_f($event)" v-bind:class="{ iptline: shows == 6 }">
          {{ this.formdata.location }}
        </div>
      </div>
      <div class="sub">
        <button type="submit">发布</button>
      </div>
    </div>
    <div class="video_home" v-show="show" ref="video_home">
      <img class="img_out" src="/img/out.png" width="240" height="515" alt="">
      <video class="video" @click="one" ref="Refvideo" autoplay src="" oncontextmenu="return false;"></video>
    </div>
  </form>
</template>
<style lang="scss">
.img_out {
  border-radius: 28px;
  position: absolute;
  display: block;
}
</style>
<script>

import { pcaTextArr } from 'element-china-area-data'
import axios from 'axios';

import store from '@/store/index';
import AMap from 'AMap'
// import AMapLoader from 'vue-amap';
import { ref, nextTick, onUpdated, onMounted, onBeforeUpdate, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router';





export default {
  data() {
    return {
      // a:'',
      CHUNK_SIZE: 60 * 1024,
      percentage: 0,
      srcvideo: '',
      show: true,
      pcaTextArr,
      selectedOptions: [],
      shows: '',
      public: '',
      optionsTwo: [
        { label:'公开 - 所有人可看', value:'open' },
        { label: '私密 - 仅自己可看', value:'none' },
      ],
      options: [
        {
          value: 'Option1',
          label: '资讯',
        },
        {
          value: 'Option2',
          label: '电影',
        },
        {
          value: 'Option3',
          label: '体育',
        },
        {
          value: 'Option4',
          label: '游戏',
        },
        {
          value: 'Option5',
          label: '动漫',
        },
        {
          value: 'Option6',
          label: '少儿',
        },
        {
          value: 'Option7',
          label: '生活',
        },
        {
          value: 'Option8',
          label: '汽车',
        },
        {
          value: 'Option9',
          label: '摩托',
        },
        {
          value: 'Option10',
          label: '旅游',
        },
        {
          value: 'Option11',
          label: '娱乐',
        },
        {
          value: 'Option12',
          label: '文化',
        },
        {
          value: 'Option13',
          label: '科技',
        },
        {
          value: 'Option14',
          label: '其他',
        },
        {
          value: 'Option15',
          label: '纪录片',
        },
        {
          value: 'Option16',
          label: '创意视频',
        },
      ],
      upload_name: '',
      formdata: {
        classify: '',
        title: '',
        file_name: '',
        describe: '',
        location: '',
        uploadName: '',
        privacy:'',
        modify:''
      },
      video_id: '',
      res: 0,
      videourl: '',
      locid: '',
      Refvideo: '',
      timer: '',
      videoHV: ''
    };
  },
  watch: {
    'formdata.describe': function (newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      this.changeTextareaHeight();
    },
  },
  setup() {
    const uploaderProgress = ref(null);
    const Refvideo = ref([null]);
    const a = ref([]);
    return { uploaderProgress, Refvideo, a };
  },
  created() {
    if (this.$route.params.code == 0) return
    this.btn()
    this.getLoactionCity();
  },
  mounted() {
    let dco = document.querySelectorAll('.info_box')[0];
    dco.addEventListener('click', this.handleclose);
    if (!this.$route.params.code) return
    this.$store.state.projectTitleId[0] = JSON.parse(this.$route.params.data)
    this.$refs.Refvideo.src = this.$store.state.projectTitleId[0].file_name
    this.newInfo()
  },
  updated() {

    if (this.$route.params.code == 0) return
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.Refvideo.videoWidth >= 1280) {
          this.videoHV = 'Horizontal'
          console.log('横屏幕');
        } else {
          this.videoHV = 'Vertical'
          console.log('竖屏幕');
        }
        console.log(this.$refs.Refvideo.videoWidth, 'videoWidth');
        console.log(this.$refs.Refvideo.videoHeight, 'videoHeight');
      },)

    })
  },
  methods: {
    newInfo() {
      let data = this.$store.state.projectTitleId[0]
      console.log(data);
      this.video_id = data._id
      this.videoHV = data.VideoHV
      this.formdata.classify = data.classify
      this.formdata.title = data.title
      this.formdata.file_name = data.file_name
      this.formdata.describe = data.describe
      this.formdata.location = data.location
      this.upload_name = data.uploadName
      this.formdata.uploadName = data.uploadName
      this.public = data.privacy
      this.formdata.modify = 'modifyData'
    },

    handleSubmit() {
      axios.post('http://localhost:3000/videoInfo', {
        params: {
          info: this.formdata,
          loc: store.state.userInfo._id,
          id: this.video_id,
          HV: this.videoHV,
        }
      }).then(response => {
        console.log('resposnse,', response);

        this.$router.push({ name: 'upload', });
        sessionStorage.clear()
        this.$store.state.projectTitleId[0] = undefined
        console.log(this.$router);

      }).catch(error => {
        console.log('error', error);
      });
    },
    cityChange(val) {
      let opt = {};
      opt = this.options.find((item) => {
        return item.value === val;
      });
      if (this.formdata.classify == '') {
      }
      else {
        this.formdata.classify = opt.label;
      }
    },
    publicChange(val) {
      this.public = val
      this.formdata.privacy = val
      console.log(val);
    },
    handleclose() {
      if (this.shows == '') {
      }
      else {
        this.shows = '';
      }
    },
    changeTextareaHeight(newVal, oldVal) {
      let _this = this;
      this.$nextTick(() => {
        let textarea = _this.$refs.textareaRef;
        var scrollHeight = textarea.scrollHeight;
        var height = textarea.offsetHeight;
        if (height <= scrollHeight) {
          textarea.style.height = 'auto'; // 恢复默认值，这个作用就是根据内容自适应textarea高度
          textarea.style.height = textarea.scrollHeight + 'px'; // 拿到最新的高度改变textarea的高度
        }
      });
    },
    btn_a() {
      this.shows = 1;
    },
    btn_b() {
      this.shows = 2;
    },
    btn_c() {
      this.shows = 3;
    },
    btn_d() {
      this.shows = 4;
    },
    btn_e() {
      this.shows = 5;
    },
    btn_f() {
      this.shows = 6;
    },
    getLoactionCity() {
      let _this = this;
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            for (const key in result) {
              _this.formdata.location = result.province + result.city;
            }
          }
        });
      });
    },
    async btn() {

      let uploadedSize = 0;

      if (this.$store.state.projectTitleId[0] == undefined) {


        if (this.$route.query.name == 0)  return
          
          this.$router.push({ name: 'upload', })
        


      }
      else {
        const { name, size, type } = this.$store.state.projectTitleId[0].id;
        this.upload_name = name;
        const fileName = new Date().getTime() + '_' + name;
        let uploadedResult = '';
        await this.$nextTick();
        const Progress = this.$refs.uploaderProgress;
        console.log(Progress);
        Progress.max = size;
        this.percentage = size;
        while (uploadedSize < size) {
          const fileChunk = this.$store.state.projectTitleId[0].id.slice(uploadedSize, uploadedSize + this.CHUNK_SIZE);
          const fileFormData = this.createFormDate({
            name,
            type,
            size,
            fileName,
            uploadedSize,
            file: fileChunk,
          });
          try {
            uploadedResult = await axios.post('http://localhost:3000/uploadhome', fileFormData);
          }
          catch (error) {
            console.log(error);
            console.log(uploadedResult.data);
            // this.videourl = uploadedResult.data.video_url
            // this.$options.methods.createVideo(uploadedResult.data.video_url);
            return;
          }
          uploadedSize += fileChunk.size;
          Progress.value = uploadedSize;
        }
        this.video_id = uploadedResult.data.data;
        sessionStorage.setItem("V_id", uploadedResult.data.data)
        this.$refs.Refvideo.src = uploadedResult.data.video_url;
        this.formdata.file_name = uploadedResult.data.video_url;
        this.formdata.uploadName = uploadedResult.data.upload;
        console.log('this.formdata.file_name ', this.formdata.file_name,);
        this.$refs.Refvideo.play();
        this.show = true;
      }
    },

    createFormDate({ name, type, size, fileName, uploadedSize, file }) {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('type', type);
      fd.append('size', size);
      fd.append('fileName', fileName);
      fd.append('uploadedSize', uploadedSize);
      fd.append('file', file);
      return fd;
    },
  },
}

</script>
<style lang="scss">
.el-select:hover .el-input__wrapper {
  box-shadow: none !important;
}

.el-input--suffix:hover .el-input__inner {
  border: none;
}

.list {
  background-color: #1e1e24;
}

.el-select-dropdown__list li:hover {
  background: #29292F !important;
  transition: background 0.3s ease;

}

.el-select-dropdown__list {
  .el-select-dropdown__item {
    color: rgba(255, 255, 255, 0.87) !important;
  }
}

.el-select-dropdown__item.selected {
  color: rgba(255, 255, 255, 0.87) !important;
}

.el-popper.is-light {
  border: none !important;
}

.dropdown {
  background-color: #1e1e24 !important;
  border: none !important;

  ul {
    width: 100%;
    height: 130px;
    margin-bottom: 10px !important;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-around;
    align-items: stretch;
    justify-content: center;


    li {
      height: 30px;
      line-height: 30px;
      background: #1e1e24;
      display: inline-block;
      text-align: center;
      overflow: visible;
      box-sizing: content-box;
      padding: 1px 10px;
      margin-top: 5px;
      color: rgba(255, 255, 255, 0.87) !important;
    }

    li:hover {
      background: #29292F !important;
      transition: background .3s ease;
    }
  }
}

.el-select-dropdown{
  border-radius: 0px !important;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: none !important;
}

.boder_box {
  height: 37px;
  line-height: 37px;
  background: #1e1e24;
  border-radius: 0.3rem;
  box-shadow: inset 0 0 0 1px hsla(240, 8%, 88%, .4);
}

.boder_box:hover {
  box-shadow: inset 0 0 0 2px hsla(240, 8%, 88%, .4);
}

.el-input .el-input__wrapper.is-focus {
  box-shadow: none !important;
}

.el-select .el-input.is-focus .el-input__wrapper {
  box-shadow: none !important;
}
</style>
<style scoped lang="scss">
// 信息框 start
::v-deep .el-input__inner {
  color: #efeff1 !important;
}

::v-deep .boder_box .el-select .el-input .el-input__wrapper {
  width: 100%;
  background: transparent;
  border-radius: 0.3rem;
  box-shadow: none !important;
  color: #efeff1 !important;
}

.el-select {
  height: 37px !important;
  display: block;
  padding-top: 3px !important;
  border-radius: 0.3rem;
  box-sizing: border-box !important;
}

.info_box {
  width: 600px;
  height: 600px;
  // border: 1px solid #772ce8;
  padding: 0 50px;

  h3:first-child {
    font: {
      weight: 600;
      size: 1.2rem;
    }

    color: #efeff1;
  }

  p {
    text-align: left;
    color: #f7f7f8;
    font-weight: 700;
    font-size: 14px;
  }

  .row {
    height: 37px;
    border-radius: 0.3rem;
    cursor: pointer;
    color: #efeff1;
    text-indent: 10px;
    line-height: 37px;
    text-align: left;
    font-size: 13px;
    box-shadow: inset 0 0 0 1px hsla(240, 8%, 88%, .4);
    background: #1e1e24;
    ;

    &:hover {
      box-shadow: inset 0 0 0 2px hsla(240, 8%, 88%, .4);
    }
  }

  .file_tl {
    input {
      width: 560px;
      height: 35px;
      background: transparent;
      outline: none;
      border: none;
      font-size: 13px;
      color: #efeff1;
    }
  }

  .describe {
    color: #d242e6;

    textarea {
      width: 100%;
      font-size: 13px;
      padding: 10px 10px;
      height: auto;
      box-sizing: border-box;
      display: block;
      resize: vertical;
      background-color: #1e1e24;
      border-style: solid;
      border-width: 0px;
      appearance: none;
      background-clip: padding-box;
      outline: 0px;
      border-radius: 0.3rem;
      border-color: transparent;
      color: #efeff1;
      box-shadow: inset 0 0 0 1px hsla(240, 8%, 88%, .4);
      overflow: hidden;

      &:hover {
        box-shadow: inset 0 0 0 2px hsla(240, 8%, 88%, .4);
      }
    }
  }
}

.iptline {
  outline: 3px solid #A970FF !important;
  box-shadow: none !important;
}

.sub button {
  width: 100px;
  height: 30px;
  font-weight: 800;
  border-radius: 0.4rem;
  outline: none;
  border: none;
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
  background: #9147ff;
}

// 信息框 info end

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

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

.video_home {
  width: 242px;
  height: 515px;
  margin-top: 50px;
  position: relative;
  cursor: pointer;
}

::v-deep.video_home video {
  width: 234px;
  height: 391px;
  position: relative;
  top: 65px;
  left: -1px;

}
</style>
  