<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div></div>
    <h1 class="msg">{{ msg }}</h1>
    <!-- <el-button type="primary" @click="count++">count is: {{ count }}</el-button> -->
</template>

<style scoped lang="scss">
.msg {
  color: $color-primary;
}
</style>

