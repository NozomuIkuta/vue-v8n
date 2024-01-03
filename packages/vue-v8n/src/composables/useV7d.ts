import { computed, ref, toRef, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { RuleDefinition, UseV7dOptions } from '../types'

export function useV7d<T>(value: T, rules: MaybeRefOrGetter<RuleDefinition[]>, options?: UseV7dOptions) {
  const immediate = !!options?.immediate

  const $el = ref<EventTarget>()
  const _value = ref(value)
  const _rules = toRef(rules)
  const _touched = ref(immediate)
  const _error = ref('')
  const _errors = ref<string[]>([])

  watch($el, () => {
    $el.value?.removeEventListener('focus', $touch)
    $el.value?.addEventListener('focus', $touch)
  }, { immediate: true })

  watch(_value, $validate, { immediate })

  watch(_rules, $validate)

  function $touch() {
    const isAlreadyTouched = _touched.value

    _touched.value = true

    if (!isAlreadyTouched) {
      $el.value?.removeEventListener('blur', $validate)
      $el.value?.addEventListener('blur', $validate, { once: true })
    }
  }

  function $validate() {
    if (!_touched.value) {
      return new Error('[vue-v8n] not yet touched')
    }

    _errors.value = []

    for (const rule of _rules.value) {
      const error = rule.run(_value.value, {})

      if (error) {
        _errors.value.push(error)
      }
    }

    if (_errors.value.length) {
      _error.value = _errors.value[0]

      return new Error(_errors.value[0])
    }

    _error.value = ''

    return _value.value
  }

  function $reset() {
    _touched.value = false
    _errors.value = []
    _error.value = ''
  }

  return {
    value: _value,
    $el,
    $touched: computed(() => _touched.value),
    $error: computed(() => _error.value),
    $errors: computed(() => _errors.value),
    $hasError: computed(() => !!_errors.value.length),
    $touch,
    $validate,
    $reset
  }
}
