<template>
  <div class="navbar">
    <a
      @mouseenter="showDropdown"
      @mouseleave="hideDropdown"
      :class="[customClass]"
    >
      <slot name="link-content">{{ text }}</slot></a
    >
    <div
      class="dropdown"
      @mouseenter="showDropdown"
      @mouseleave="hideDropdown"
      :class="{ active: isDropdownVisible }"
    >
      <div class="dropdown-cont" :class="{ active: isDropdownVisible }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  text: String,
  customClass: {
    type: String,
    default: "",
  },
});

const isDropdownVisible = ref(false);
let hideTimeout = null;
const showDropdown = () => {
  clearTimeout(hideTimeout);
  isDropdownVisible.value = true;
};

const hideDropdown = () => {
  hideTimeout = setTimeout(() => {
    isDropdownVisible.value = false;
  }, 100); // 延时100ms隐藏
};
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #18181b;
  height: 50px;
  position: relative;
  a {
    color: white;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    display: inline-flex;
  }
  .different-class {
    height: 30px;
    padding: 0 10px 0 5px;
    border-radius: 4px;
    align-items: center;
    background: #9147ff;
    &:hover {
      background: #772ce8;
    }
  }
  .User-picture {
    width: 32px;
    height: 32px;
  }
  .dropdown {
    position: absolute;
    background: 0 0 !important;
    -webkit-app-region: no-drag !important;
    z-index: 1;
    right: -2px;
    width: 300px;
    &.active {
      top: 58px;
      border-radius: 4px;
      display: block;
      position: absolute;
      overflow: hidden;
      background: 0 0 !important;
    }
    .dropdown-cont {
      visibility: hidden;
      position: absolute;
      background-color: #1f1f23;
      display: none;
      padding: 10px;
      -webkit-app-region: no-drag !important;
      &.active {
        display: block;
        visibility: visible;
        position: static;
        animation: 0.4s cubic-bezier(0.34, 0.69, 0.1, 1) forwards Slide-Down;
      }
    }
  }
}

@keyframes Slide-Down {
  0% {
    transform: translateY(-80px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
