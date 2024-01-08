<script setup lang="ts">
import { computed, ref } from 'vue'
import { max, min, required, useV7dObject } from 'vue-v8n'
import DemoView from '../components/DemoView.vue'
import type { ControlItemGroup, RuleOptionGroup } from '../components/DemoView.vue'

const ruleOptionGroups = ref<RuleOptionGroup[]>([
  {
    label: 'First name',
    rules: [
      { label: 'required', rule: required, selected: false },
      { label: 'min(5)', rule: min(5), selected: false },
      { label: 'max(10)', rule: max(10), selected: false }
    ]
  },
  {
    label: 'Last name',
    rules: [
      { label: 'required', rule: required, selected: false },
      { label: 'min(5)', rule: min(5), selected: false },
      { label: 'max(10)', rule: max(10), selected: false }
    ]
  }
])

const firstNameRules = computed(() => ruleOptionGroups.value[0].rules.flatMap(({ selected, rule }) => selected ? [rule] : []))
const lastNameRules = computed(() => ruleOptionGroups.value[1].rules.flatMap(({ selected, rule }) => selected ? [rule] : []))

const state = useV7dObject({
  firstName: '',
  lastName: ''
}, {
  firstName: firstNameRules,
  lastName: lastNameRules
})

const result = ref<Record<string, string | Error>>({
  firstName: '',
  lastName: ''
})

const controlItemGroups = ref<ControlItemGroup[]>([
  {
    label: 'First name',
    items: [
      { label: 'Touch', fn: () => state.$touch('firstName') },
      { label: 'Validate', fn: () => result.value.firstName = state.$validate('firstName') as string | Error },
      { label: 'Reset', fn: () => state.$reset('firstName') },
      { label: 'Reset with initial value', fn: () => state.$resetWithInitialValue('firstName') },
      { label: 'Reset with "John"', fn: () => state.$resetWith('firstName', 'John') }
    ]
  },
  {
    label: 'Last name',
    items: [
      { label: 'Touch', fn: () => state.$touch('lastName') },
      { label: 'Validate', fn: () => result.value.lastName = state.$validate('lastName') as string | Error },
      { label: 'Reset', fn: () => state.$reset('lastName') },
      { label: 'Reset with initial value', fn: () => state.$resetWithInitialValue('lastName') },
      { label: 'Reset with "John"', fn: () => state.$resetWith('lastName', 'Doe') }
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
    <div class="form-item" :class="[state.$errors.value.firstName.length ? 'has-error' : '']">
      <label class="form-label">First name:</label>
      <input
        :ref="state.$els.firstName"
        type="text"
        v-model="state.values.firstName"
        class="form-input"
      >
      <p v-if="state.$error.value.firstName" class="error-message">{{ state.$error.value.firstName }}</p>
    </div>
    <div class="form-item" :class="[state.$errors.value.lastName.length ? 'has-error' : '']">
      <label class="form-label">Last name:</label>
      <input
        :ref="state.$els.lastName"
        type="text"
        v-model="state.values.lastName"
        class="form-input"
      >
      <p v-if="state.$error.value.lastName" class="error-message">{{ state.$error.value.lastName }}</p>
    </div>
  </DemoView>
</template>
