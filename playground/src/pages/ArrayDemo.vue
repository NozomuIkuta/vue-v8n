<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { max, min, required, useV7dArray } from 'vue-v8n'
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

const state = useV7dArray<string>([], rules)

const result = ref<typeof state.values | Error[]>(state.values)

const controlItemGroups = ref<ControlItemGroup[]>([])
// const controlItemGroups = ref<ControlItemGroup[]>([
//   {
//     label: 'Name',
//     items: [
//       { label: 'Touch', fn: state.$touch },
//       { label: 'Validate', fn: () => result.value = state.$validate() },
//       { label: 'Reset', fn: state.$reset },
//       { label: 'Reset with initial value', fn: state.$resetWithInitialValue },
//       { label: 'Reset with "John Doe"', fn: () => state.$resetWith('John Doe') }
//     ]
//   }
// ])
</script>

<template>
  <DemoView
    v-model="ruleOptionGroups"
    :control-item-groups="controlItemGroups"
    :state="state"
    :result="result"
  >
    <div class="form-item">
      <label class="form-label">Products:</label>
      <input
        :ref="(el) => state.setElement(0, el as EventTarget)"
        type="text"
        v-model="state.values[0]"
        class="form-input"
      >
      <input
        :ref="(el) => state.setElement(1, el as EventTarget)"
        type="text"
        v-model="state.values[1]"
        class="form-input"
      >
      <input
        :ref="(el) => state.setElement(2, el as EventTarget)"
        type="text"
        v-model="state.values[2]"
        class="form-input"
      >
    </div>
  </DemoView>
</template>
