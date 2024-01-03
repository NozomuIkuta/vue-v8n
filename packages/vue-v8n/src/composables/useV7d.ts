import { computed, ref, toRef, watch } from 'vue'
import type { MaybeRef, MaybeRefOrGetter } from 'vue'
import type { RuleDefinition, UseV7dOptions } from '../types'

export function useV7d<T>(value: MaybeRef<T>, rules: MaybeRefOrGetter<RuleDefinition[]>, options?: UseV7dOptions) {
  const immediate = !!options?.immediate

  const el = ref<EventTarget | null>(null)
  const _value = toRef(value)
  const _rules = toRef(rules)
  const touched = ref(immediate)
  const error = ref('')
  const errors = ref<string[]>([])
  const hasError = computed(() => !!errors.value.length)

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
    if (!touched.value) {
      return new Error('[vue-v8n] not yet touched')
    }

    errors.value = []

    for (const rule of _rules.value) {
      const error = rule.run(_value.value, {})

      if (error) {
        errors.value.push(error)
      }
    }

    if (errors.value.length) {
      error.value = errors.value[0]

      return new Error(errors.value[0])
    }

    error.value = ''

    return _value.value as T
  }

  function reset() {
    touched.value = false
    errors.value = []
    error.value = ''
  }

  return {
    el,
    touched,
    value: _value,
    errors,
    error,
    hasError,
    touch,
    validate,
    reset
  }
}
