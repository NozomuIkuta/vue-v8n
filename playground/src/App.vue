<script setup lang="ts">
import { computed, reactive, ref, onMounted, getCurrentInstance, watch } from 'vue'
import { useV7d, max, min, required, sameAs } from 'vue-v8n'

const nameRuleOptions = ref([
  { label: 'required', rule: required, selected: false },
  { label: 'min(5)', rule: min(5), selected: false },
  { label: 'max(10)', rule: max(10), selected: false }
])
const name = useV7d('', computed(() => nameRuleOptions.value.flatMap(({ selected, rule }) => selected ? [rule] : [])))

watch(nameRuleOptions, () => validatedValues.name = name.$validate(), { deep: true })

const countRuleOptions = ref([
  { label: 'required', rule: required, selected: false },
  { label: 'min(5)', rule: min(5), selected: false },
  { label: 'max(10)', rule: max(10), selected: false }
])
const count = useV7d(0, computed(() => countRuleOptions.value.flatMap(({ selected, rule }) => selected ? [rule] : [])))

watch(countRuleOptions, () => validatedValues.count = count.$validate(), { deep: true })

const password = ref('')
const passwordConfirmationRuleOptions = ref([
  { label: 'sameAs(password)', rule: sameAs(password), selected: false }
])
const passwordConfirmation = useV7d('', computed(() => passwordConfirmationRuleOptions.value.flatMap(({ selected, rule }) => selected ? [rule] : [])))

watch(password, () => validatedValues.passwordConfirmation = passwordConfirmation.$validate())
watch(passwordConfirmation.value, () => validatedValues.passwordConfirmation = passwordConfirmation.$validate())
watch(passwordConfirmationRuleOptions, () => validatedValues.passwordConfirmation = passwordConfirmation.$validate(), { deep: true })

const noEventListeningNameRuleOptions = ref([
  { label: 'required', rule: required, selected: false },
  { label: 'min(5)', rule: min(5), selected: false },
  { label: 'max(10)', rule: max(10), selected: false }
])
const noEventListeningName = useV7d('', computed(() => noEventListeningNameRuleOptions.value.flatMap(({ selected, rule }) => selected ? [rule] : [])), {
  touchOnFocus: false,
  validateOnBlur: false
})

watch(noEventListeningNameRuleOptions, () => validatedValues.noEventListeningName = noEventListeningName.$validate(), { deep: true })

const state = reactive({
  name,
  count,
  passwordConfirmation,
  noEventListeningName
})
const validatedValues = reactive({} as {
  name: typeof name.value.value | Error,
  count: typeof count.value.value | Error,
  passwordConfirmation: typeof passwordConfirmation.value.value | Error,
  noEventListeningName: typeof noEventListeningName.value.value | Error,
})

function validate() {
  validatedValues.name = name.$validate()
  validatedValues.count = count.$validate()
  validatedValues.passwordConfirmation = passwordConfirmation.$validate()
  validatedValues.noEventListeningName = noEventListeningName.$validate()
}

function touch() {
  name.$touch()
  count.$touch()
  passwordConfirmation.$touch()
  noEventListeningName.$touch()
}

function reset() {
  name.$reset()
  count.$reset()
  passwordConfirmation.$reset()
  noEventListeningName.$reset()
}

onMounted(() => console.log(getCurrentInstance()?.appContext.config.globalProperties.vueV8n))
</script>

<template>
  <div class="panes">
    <div class="pane pane-control">
      <div class="control-items">
        <button @click="validate">Validate all</button>
        <button @click="touch">Touch all</button>
        <button @click="reset">Reset all</button>
      </div>
    </div>
    <div class="pane pane-ui">
      <div :class="['form-item', name.$hasError.value ? 'has-error' : '']">
        <label class="form-label">Name:</label>
        <input
          :ref="name.$el"
          type="text"
          v-model="name.value.value"
          class="form-input"
        >
        <p v-if="name.$hasError.value" class="error-message">{{ name.$error.value }}</p>
        <div class="control-items">
          <p>Rules:</p>
          <label v-for="ruleOption in nameRuleOptions">
            <input type="checkbox" v-model="ruleOption.selected">
            {{ ruleOption.label }}
          </label>
        </div>
        <div class="control-items">
          <button @click="validatedValues.name = name.$validate()">Validate</button>
          <button @click="name.$touch">Touch</button>
          <button @click="name.$reset">Reset</button>
        </div>
      </div>
      <div :class="['form-item', count.$hasError.value ? 'has-error' : '']">
        <label class="form-label">Count:</label>
        <input
          :ref="count.$el"
          type="number"
          v-model="count.value.value"
          class="form-input"
        >
        <p v-if="count.$hasError.value" class="error-message">{{ count.$error.value }}</p>
        <div class="control-items">
          <p>Rules:</p>
          <label v-for="ruleOption in countRuleOptions">
            <input type="checkbox" v-model="ruleOption.selected">
            {{ ruleOption.label }}
          </label>
        </div>
        <div class="control-items">
          <button @click="validatedValues.count = count.$validate()">Validate</button>
          <button @click="count.$touch">Touch</button>
          <button @click="count.$reset">Reset</button>
        </div>
      </div>
      <div :class="['form-item', passwordConfirmation.$hasError.value ? 'has-error' : '']">
        <label class="form-label">Password:</label>
        <input
          type="input"
          v-model="password"
          class="form-input"
        >
        <label class="form-label">Password (confirmation):</label>
        <input
          :ref="passwordConfirmation.$el"
          type="input"
          v-model="passwordConfirmation.value.value"
          class="form-input"
        >
        <p v-if="passwordConfirmation.$hasError.value" class="error-message">{{ passwordConfirmation.$error.value }}</p>
        <div class="control-items">
          <p>Rules:</p>
          <label v-for="ruleOption in passwordConfirmationRuleOptions">
            <input type="checkbox" v-model="ruleOption.selected">
            {{ ruleOption.label }}
          </label>
        </div>
        <div class="control-items">
          <button @click="validatedValues.passwordConfirmation = passwordConfirmation.$validate()">Validate</button>
          <button @click="passwordConfirmation.$touch">Touch</button>
          <button @click="passwordConfirmation.$reset">Reset</button>
        </div>
      </div>
      <div :class="['form-item', noEventListeningName.$hasError.value ? 'has-error' : '']">
        <label class="form-label">Name (no event listening):</label>
        <input
          :ref="noEventListeningName.$el"
          type="text"
          v-model="noEventListeningName.value.value"
          class="form-input"
        >
        <p v-if="noEventListeningName.$hasError.value" class="error-message">{{ noEventListeningName.$error.value }}</p>
        <div class="control-items">
          <p>Rules:</p>
          <label v-for="ruleOption in noEventListeningNameRuleOptions">
            <input type="checkbox" v-model="ruleOption.selected">
            {{ ruleOption.label }}
          </label>
        </div>
        <div class="control-items">
          <button @click="validatedValues.noEventListeningName = noEventListeningName.$validate()">Validate</button>
          <button @click="noEventListeningName.$touch">Touch</button>
          <button @click="noEventListeningName.$reset">Reset</button>
        </div>
      </div>
    </div>
    <div class="pane pane-state">
      <p>[State]</p>
      <pre>{{ state }}</pre>
      <p>[Validated values]</p>
      <pre>{{ validatedValues }}</pre>
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
