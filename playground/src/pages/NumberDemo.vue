<script setup lang="ts">
import { computed, ref } from 'vue'
import { useV7d } from 'vue-v8n'
import DemoView from '../components/DemoView.vue'
import { getControlItemsRef, getRuleOptionsRef } from '../utils'

const ruleOptions = getRuleOptionsRef()

const rules = computed(() => ruleOptions.value.flatMap(({ selected, rule }) => selected ? [rule] : []))

const state = useV7d(0, rules)

const result = ref<typeof state.value.value | Error>(state.value.value)

const controlItems = getControlItemsRef(state, result, 0)
</script>

<template>
  <DemoView
    v-model="ruleOptions"
    :control-items="controlItems"
    :state="state"
    :result="result"
  >
    <div class="form-item" :class="[state.$hasError.value ? 'has-error' : '']">
      <label class="form-label">Count:</label>
      <input
        :ref="state.$el"
        type="number"
        v-model="state.value.value"
        class="form-input"
      >
      <p v-if="state.$hasError.value" class="error-message">{{ state.$error.value }}</p>
    </div>
  </DemoView>
</template>
