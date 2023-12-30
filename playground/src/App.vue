<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'

onMounted(() => {
  const vm = getCurrentInstance()

  if (vm) {
    console.log(vm.appContext.config.globalProperties.vueV8n)
  }
})
</script>

<template>
  <div>
    vue-v8n demo page
  </div>
</template>
