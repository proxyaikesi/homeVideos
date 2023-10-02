<template>
  <div>
    <div class="new_cont">
      <div class="cont_left">
        <el-row class="tac">
          <el-col>
            <div class="Publish_Video">
              <router-link to="/new/upload"> <span>发布视频</span></router-link>
            </div>
            <el-menu background-color="none" class="el-menu-vertical-demo" text-color="#fff" @open="handleOpen"
              @close="handleClose" :default-active="$route.path">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <VideoCameraFilled />
                  </el-icon>
                  <span>内容管理</span>
                </template>
                <el-menu-item index="/new/videoManage"><router-link to="videoManage">已发布</router-link></el-menu-item>
                <el-menu-item index="/new/unpublished"><router-link to="unpublished">未发布</router-link></el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <PieChart />
                  </el-icon>
                  <span>运营数据</span>
                </template>
                <el-menu-item index="1-2">视频数据</el-menu-item>
                <el-menu-item index="2-2">评论管理</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon>
                    <Menu />
                  </el-icon>
                  <span>个人中心</span>
                </template>
                <el-menu-item index="1-3">我的账号</el-menu-item>
              </el-sub-menu>
            </el-menu>

          </el-col>
        </el-row>
      </div>
      <div class="cont_right">
        <RouterView v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component"  v-if="!$route.meta.keepAlive"/>
        </RouterView>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import { PieChart, Menu, VideoCameraFilled } from '@element-plus/icons'
import { RouterView } from 'vue-router';
export default {
  components: {
    PieChart, Menu, VideoCameraFilled,
    RouterView,
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '游戏'
      }, {
        value: '选项2',
        label: '电影'
      }, {
        value: '选项3',
        label: 'creative'
      }, {
        value: '选项4',
        label: '电竞'
      }, {
        value: '选项5',
        label: '动漫'
      }],
      src: '',
      value: '',
      file: '',
      // isDisabled: false,

    }
  },
  mounted() {

  },
  methods: {
    aa() {
      this.$router.push({ name: 'upload', });
      console.log('home');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);


    },
    handleClose(key, keyPath) {
      // this.$router.push(keyPath)
      console.log(key, keyPath);
    },

    load() {

      const upload = this.$refs.file
      const { files: [file] } = upload
      this.file = file
    },
    fileDragover(e) {
      e.preventDefault()
    },
    fileDrop(e) {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      this.file = file
    },


    selectWorkName(id) {
      let obj = {};
      obj = this.options.find((item) => {
        //这里的ClaOptions就是上面遍历的数据源
        return item.value === id; //筛选出匹配数据，这里的value是你遍历数组每一项的value，如果没有对后台返回的数据做处理，一般为id
      });
      console.log(obj.value);
      console.log(obj.label); //  这里的label就是对应label的
      this.addCagLabel = obj.label; //打印出来的obj.label就是想要的label值

    },
  }
}
</script>
  
<style scoped lang="scss">
a {
  text-decoration: none;
  color: #fff;
}

.router-link-active {
  text-decoration: none;
  color: #fff;
}

.new_cont {
  display: flex;
  justify-content: space-between;
  width: 1300px;
  height: 670px;
  margin: 40px auto;

}

.new_cont .cont_right {
  width: 100%;
  height: 100%;
  position: relative;
  // border: 1px solid red;
  background: #18181b;
  overflow: hidden;

}

.new_cont .cont_left {
  width: 300px;
  height: 100%;
  padding: 0 20px;

}

.Publish_Video {
  width: 100%;
  height: 56px;

  background: #772ce8;
  border-radius: 4px;
  margin-bottom: 15px;
}

.Publish_Video span {
  font-size: 20px;
  color: #fff;
  line-height: 56px;
  font-weight: 600;
}

.el-menu {
  border: none;
}

.el-menu-item:hover {
  background-color: rgba(83, 83, 95, .48) !important;
  ;
}

.el-menu-item.is-active {
  color: #fff !important;
  background: rgba(145, 71, 255) !important;
}

.el-menu-item {
  border-radius: 10px;
}

.el-menu-vertical-demo {
  height: 600px;
  background-color: #18181b;
}

::v-deep .el-sub-menu__title:hover {

  background-color: rgba(83, 83, 95, .48) !important;
  ;
}



.new_cont .cont_left {
  /* width: 195px;
  height: 600px; */
  /* background-image: url('../../public/newbg.png'); */
}



// .layout {
//   width: 100%;
//   height: 100%;
// }

// .layout .layout_cont {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   margin: auto;
//   width: 700px;
//   height: 380px;
//   background: #1E1E24;
//   padding: 40px 0 0 25px;
//   cursor: pointer;
// }

// .layout .layout_cont p {
//   color: #ffffff61;
//   margin: 0;
//   font-size: 14px;
//   margin-bottom: 9px;
//   text-align: left;
// }

// .layout .layout_cont .uploadbox {
//   width: 620px;
//   height: 270px;
//   background: #29292F;
//   margin-bottom: 20px;
//   border-radius: 4px;
//   color: #fff;
//   border-radius: 3px;
//   display: flex;
//   -ms-flex-pack: center;
//   justify-content: center;
//   -ms-flex-align: center;
//   align-items: center;

// }

// .layout .layout_cont .uploadbox .upload_main {
//   width: 341px;
//   height: 199px;
//   border: 1px dashed #979797;
//   border-radius: 4px;
//   margin-right: 60px;
// }

// .layout .layout_cont .uploadbox .upload_right {}

// .layout .layout_cont .uploadbox .upload_right span {
//   width: 114px;
//   height: 32px;
//   font-size: 13px;
//   line-height: 32px;
//   display: inline-block;
//   border-radius: 20px;
//   background: linear-gradient(135deg, #d242e6, #00c5ff 52%, #d242e6)
// }

// .layout .layout_cont .uploadbox .upload_right p {
//   margin-top: 9px;
//   font-size: 12px;
// }
</style>
  