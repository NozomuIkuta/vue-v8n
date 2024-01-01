<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useV7d, required } from 'vue-v8n'

const name = useV7d('', [required])
const state = ref({
  name
})

onMounted(() => console.log(getCurrentInstance()?.appContext.config.globalProperties.vueV8n))
</script>

<template>
  <div class="panes">
    <div class="pane pane-ui">
      <div :class="['form-item', name.hasError.value ? 'has-error' : '']">
        <label class="form-label">
          Name:
        </label>
        <input
          :ref="name.el"
          type="text"
          v-model="name.value.value"
          class="form-input"
        >
        <p v-if="name.hasError" class="error-message">{{ name.errorMessage.value }}</p>
      </div>
    </div>
    <div class="pane pane-state">
      <pre>{{ state }}</pre>
    </div>
  </div>
</template>

<style>
.panes {
  display: grid;
  grid-row: 2;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  height: 100vh;
}

.pane {
  height: 100%;
  padding: 10px;
  border: 1px solid var(--app-color);
}

pre {
  margin: 0;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-item + .form-item {
  margin-top: 20px;
}

.form-input:focus {
  outline: none;
}

.form-item.has-error .form-label {
  color: #f00;
}

.form-item.has-error .form-input {
  border: 1px solid #f00;
}

.error-message {
  color: #f00;
  margin: 0;
}

.pane.pane-control {
  grid-column: 1 / span 2;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--app-color);
}

.locales {
  display: flex;
  gap: 8px;
}
</style>
