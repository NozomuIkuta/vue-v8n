import { ref } from 'vue'
import type { Ref } from 'vue'
import { max, min, required, useV7d } from 'vue-v8n'
import type { ControlItem, RuleOption } from './components/DemoView.vue'

export function getControlItemsRef (state: ReturnType<typeof useV7d<any>>, result: Ref<any>, initialValue: unknown) {
  return ref<ControlItem[]>([
    { label: 'Touch', fn: state.$touch },
    { label: 'Validate', fn: () => result.value = state.$validate() },
    { label: 'Reset', fn: state.$reset },
    { label: 'Reset with initial value', fn: state.$resetWithInitialValue },
    { label: `Reset with \`${initialValue}\``, fn: () => state.$resetWith(initialValue) },
  ])
}

export function getRuleOptionsRef (additionalRuleOptions: RuleOption[] = []): Ref<RuleOption[]> {
  return ref<RuleOption[]>([
    { label: 'required', rule: required, selected: false },
    { label: 'min(5)', rule: min(5), selected: false },
    { label: 'max(10)', rule: max(10), selected: false },
    ...additionalRuleOptions
  ])
}
