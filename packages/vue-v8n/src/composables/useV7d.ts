import { computed, ref, toRef, watch } from 'vue'
import type { MaybeRef, MaybeRefOrGetter } from 'vue'
import type { RuleDefinition, UseV7dOptions } from '../types'
import { createResult } from '../rule'

export function useV7d<T>(value: MaybeRef<T>, rules: MaybeRefOrGetter<RuleDefinition[]>, options?: UseV7dOptions) {
  const immediate = !!options?.immediate

  const el = ref<EventTarget | null>(null)
  const _value = toRef(value)
  const _rules = toRef(rules)
  const touched = ref(immediate)
  const errorMessage = ref('')
  const errorMessages = ref<string[]>([])
  const hasError = computed(() => !!errorMessages.value.length)

  watch(el, () => {
    el.value?.removeEventListener('focus', touch)
    el.value?.addEventListener('focus', touch)
  }, { immediate: true })

  watch(_value, validate, { immediate })

  watch(_rules, validate)

  function touch() {
    const isAlreadyTouched = touched.value

    touched.value = true

    if (!isAlreadyTouched) {
      el.value?.removeEventListener('blur', validate)
      el.value?.addEventListener('blur', validate, { once: true })
    }
  }

  function validate() {
    errorMessages.value = []

    for (const rule of _rules.value) {
      const result = rule.run(_value.value, { createResult })

      if (!result.ok) {
        errorMessages.value.push(result.errorMessage)
      }
    }

    if (errorMessages.value.length) {
      errorMessage.value = errorMessages.value[0]

      return new Error(errorMessages.value[0])
    }

    errorMessage.value = ''

    return _value.value as T
  }

  function reset() {
    touched.value = false
    errorMessages.value = []
    errorMessage.value = ''
  }

  return {
    el,
    touched,
    value: _value,
    errorMessages,
    errorMessage,
    hasError,
    touch,
    validate,
    reset
  }
}
