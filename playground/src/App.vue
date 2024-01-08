<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const menuItems = computed(() => [
  { label: 'Number', to: '/number' },
  { label: 'Object', to: '/object' },
  { label: 'Password', to: '/password' },
  { label: 'String', to: '/string' }
])
</script>

<template>
  <div class="menu">
    <RouterLink v-for="{ label, to } in menuItems" :to="to">{{ label }}</RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>
.menu {
  display: flex;
  gap: 20px;
}
</style>
