<script setup lang="ts">
import { computed, ref } from 'vue'
import { max, min, required, useV7d } from 'vue-v8n'
import DemoView from '../components/DemoView.vue'
import type { ControlItemGroup, RuleOptionGroup } from '../components/DemoView.vue'

const ruleOptionGroups = ref<RuleOptionGroup[]>([
  {
    label: 'Name',
    rules: [
      { label: 'required', rule: required, selected: false },
      { label: 'min(5)', rule: min(5), selected: false },
      { label: 'max(10)', rule: max(10), selected: false }
    ]
  }
])

const rules = computed(() => ruleOptionGroups.value[0].rules.flatMap(({ selected, rule }) => selected ? [rule] : []))

const state = useV7d('', rules)

const result = ref<typeof state.value.value | Error>(state.value.value)

const controlItemGroups = ref<ControlItemGroup[]>([
  {
    label: 'Name',
    items: [
      { label: 'Touch', fn: state.$touch },
      { label: 'Validate', fn: () => result.value = state.$validate() },
      { label: 'Reset', fn: state.$reset },
      { label: 'Reset with initial value', fn: state.$resetWithInitialValue },
      { label: 'Reset with "John Doe"', fn: () => state.$resetWith('John Doe') }
    ]
  }
])
</script>

<template>
  <DemoView
    v-model="ruleOptionGroups"
    :control-item-groups="controlItemGroups"
    :state="state"
    :result="result"
  >
    <div class="form-item" :class="[state.$hasError.value ? 'has-error' : '']">
      <label class="form-label">Name:</label>
      <input
        :ref="state.$el"
        type="text"
        v-model="state.value.value"
        class="form-input"
      >
      <p v-if="state.$hasError.value" class="error-message">{{ state.$error.value }}</p>
    </div>
  </DemoView>
</template>
