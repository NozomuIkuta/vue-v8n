<script setup lang="ts">
import { computed, ref, onMounted, getCurrentInstance } from 'vue'
import { useV7d, required } from 'vue-v8n'

const nameRuleOptions = ref([
  { label: required.name, rule: required, selected: false }
])
const nameRules = computed(() => nameRuleOptions.value.flatMap(({ selected, rule }) => selected ? [rule] : []))
const name = useV7d('', nameRules)

const state = ref({
  name
})

function reset() {
  name.reset()
}

function touch() {
  name.touch()
}

onMounted(() => console.log(getCurrentInstance()?.appContext.config.globalProperties.vueV8n))
</script>

<template>
  <div class="panes">
    <div class="pane pane-control">
      <div class="control-items">
        <button @click="reset">Reset all</button>
        <button @click="touch">Touch all</button>
      </div>
    </div>
    <div class="pane pane-ui">
      <div :class="['form-item', name.hasError.value ? 'has-error' : '']">
        <label class="form-label">Name:</label>
        <input
          :ref="name.el"
          type="text"
          v-model="name.value.value"
          class="form-input"
        >
        <p v-if="name.hasError" class="error-message">{{ name.errorMessage.value }}</p>
      </div>
      <div class="control-items">
        <p>Rules:</p>
        <label v-for="ruleOption in nameRuleOptions">
          <input type="checkbox" v-model="ruleOption.selected">
          {{ ruleOption.label }}
        </label>
      </div>
      <div class="control-items">
        <button @click="name.reset">Reset</button>
        <button @click="name.touch">Touch</button>
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

.control-items {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 8px;
}
</style>
