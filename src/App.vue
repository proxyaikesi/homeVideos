<template>
  <!-- <app-Header v-show="$route.path == '/index'?$route.meta.show : true"></app-Header> -->
  <app-Header></app-Header>
  <!-- <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </RouterView> -->
  <RouterView></RouterView>
</template>

<script>

import { RouterView } from 'vue-router';
import { ref } from 'vue'
import { mapState } from "vuex";


import { provide } from "vue";
import * as echarts from "echarts";


import Header from '@/components/aheader.vue'
// const inputName = ref("选择视频")

export default {
  name: "App",
  components: {
    RouterView,
    appHeader: Header
  },
  setup() {
    provide('echarts', echarts)
  },
  data() {
    return {
      appimg: ''
    }
  },
  created() {

    this.$store.commit("init_user");
  },
  computed: {



  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
}

body {
  margin: 0px;
  padding: 0px;
  background: rgb(14, 14, 16);
}
</style>
