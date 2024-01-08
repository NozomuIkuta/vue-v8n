<script setup lang="ts">
import type { RuleDefinition } from 'vue-v8n'

export interface ControlItemGroup {
  label: string
  items: ControlItem[]
}

export interface ControlItem {
  label: string
  fn: (...args: unknown[]) => unknown
}

export interface RuleOptionGroup {
  label: string
  rules: RuleOption[]
}

export interface RuleOption {
  label: string
  selected: boolean
  rule: RuleDefinition
}

const props = defineProps<{
  controlItemGroups: ControlItemGroup[]
  state: unknown
  result: unknown
}>()

const ruleOptionGroups = defineModel<RuleOptionGroup[]>({ required: true })
</script>

<template>
  <div class="panes">
    <div class="pane">
      <slot />
    </div>
    <div class="pane">
      <template v-for="{ label, rules } in ruleOptionGroups">
        <p>Rules for "{{ label }}":</p>
        <div class="rule-options">
          <label v-for="rule in rules" :key="label">
            <input type="checkbox" v-model="rule.selected">
            {{ rule.label }}
          </label>
        </div>
      </template>
      <template v-for="controlItemGroup in props.controlItemGroups">
        <p>Functions for "{{ controlItemGroup.label }}":</p>
        <div class="control-items">
          <button v-for="{ label, fn } in controlItemGroup.items" @click="fn">{{ label }}</button>
        </div>
      </template>
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
