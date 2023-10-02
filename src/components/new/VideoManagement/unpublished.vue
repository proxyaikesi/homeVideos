<template>
    <videoTemplate></videoTemplate>
</template>


<script setup >

import { useVwSize } from "@/hooks/videoHome"
import  videoTemplate  from "./videoTemplate.vue"



const { data, getViewportSize } = useVwSize();

</script>