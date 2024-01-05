<script setup lang="ts">
import type { RuleDefinition } from 'vue-v8n'

export interface ControlItem {
  label: string
  fn: (...args: unknown[]) => unknown
}

export interface RuleOption {
  label: string
  selected: boolean
  rule: RuleDefinition
}

const props = defineProps<{
  controlItems: ControlItem[]
  state: unknown
  result: unknown
}>()

const ruleOptions = defineModel<RuleOption[]>({ required: true })
</script>

<template>
  <div class="panes">
    <div class="pane">
      <slot />
    </div>
    <div class="pane">
      <p>Rules:</p>
      <div class="rule-options">
        <label v-for="ruleOption in ruleOptions">
          <input type="checkbox" v-model="ruleOption.selected">
          {{ ruleOption.label }}
        </label>
      </div>
      <p>Functions:</p>
      <div class="control-items">
        <button v-for="{ label, fn } in props.controlItems" @click="fn">{{ label }}</button>
      </div>
      <p>State:</p>
      <div class="content-box">
        <pre class="content">{{ props.state }}</pre>
      </div>
      <p>Result:</p>
      <div class="content-box">
        <pre class="content">{{ props.result }}</pre>
      </div>
    </div>
  </div>
</template>
