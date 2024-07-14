<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script setup>
import Header from "@/views/aheader.vue";
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
