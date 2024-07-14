<template>
  <div class="container">
    <div @click="toggleContent" class="header">
      {{ title }}
      <div class="overturn-svg" :class="{ rotated: isExpanded }">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6.5 5.5 11 10l-4.5 4.5L8 16l6-6-6-6-1.5 1.5z"></path>
        </svg>
      </div>
    </div>
    <div v-if="isExpanded" class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isExpanded = ref(false);
    const toggleContent = () => {
      isExpanded.value = !isExpanded.value;
    };
    return { isExpanded, toggleContent };
  },
};
</script>
<style scoped lang="scss">
.container {
  border: 1px solid #a970ff;
  border-radius: 10px;
  padding: 10px;
  border-radius: 5px;
  margin: 100px 50px;
  .header {
    position: relative;
    cursor: pointer;
    padding: 2rem;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    user-select: none; /* For modern browsers */
    -webkit-user-select: none; /* For Safari */
    -moz-user-select: none; /* For Firefox */
    -ms-user-select: none; /* For Internet Explorer/Edge */
    .overturn-svg {
      position: absolute;
      right: 40px;
      top: 32px;
      transition: transform 0.3s ease;
      transform: rotate(90deg);
    }
    .overturn-svg.rotated {
      transform: rotate(-90deg);
    }
  }
  .content {
    font-size: 17px;
    text-align: left;
    padding: 0rem 2rem 2rem;
  }
}
</style>
