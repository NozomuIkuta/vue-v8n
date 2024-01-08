import { computed, reactive } from 'vue'
import type { MaybeRefOrGetter, UnwrapRef } from 'vue'
import type { RuleDefinition, UseV7dOptions } from '../types'
import { useV7d } from './useV7d'

export function useV7dObject<T extends Record<string, unknown>>(
  values: T,
  rules: Partial<Record<keyof T, MaybeRefOrGetter<RuleDefinition[]>>>,
  options?: Partial<Record<keyof T, UseV7dOptions>>
) {
  type InitialValues = Record<keyof T, T[keyof T]>
  type Values = Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['value']['value']>

  const _initialValues = {} as InitialValues
  const _values = reactive({} as Values)
  const $els = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$el']>
  const _touched = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$touched']>
  const _error = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$error']>
  const _errors = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$errors']>
  const _touchFns = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$touch']>
  const _validateFns = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$validate']>
  const _resetFns = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$reset']>
  const _resetWithInitialValueFns = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$resetWithInitialValue']>
  const _resetWithFn = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$resetWith']>

  const _keys = Object.keys(values)

  for (const key of _keys) {
    const _key = key as keyof T
    const {
      value,
      $el,
      $touched,
      $error,
      $errors,
      $touch,
      $validate,
      $reset,
      $resetWithInitialValue,
      $resetWith
    } = useV7d(values[_key], rules[_key] ?? [], options?.[_key] ?? {})

    _initialValues[_key] = values[_key]
    ;(_values as Values)[_key] = value.value
    $els[_key] = $el
    _touched[_key] = $touched
    _error[_key] = $error
    _errors[_key] = $errors
    _touchFns[_key] = $touch
    _validateFns[_key] = $validate
    _resetFns[_key] = $reset
    _resetWithInitialValueFns[_key] = $resetWithInitialValue
    _resetWithFn[_key] = $resetWith
  }

  const $touchedAny = computed(() => {
    for (const key of _keys) {
      const _key = key as keyof T

      if (_touched[_key].value) {
        return true
      }
    }

    return false
  })

  const $touched = computed(() => {
    const _$touched = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$touched']['value']>

    for (const key of _keys) {
      const _key = key as keyof T
      _$touched[_key] = _touched[_key].value
    }

    return _$touched
  })

  const $error = computed(() => {
    const _$error = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$error']['value']>

    for (const key of _keys) {
      const _key = key as keyof T
      _$error[_key] = _error[_key].value
    }

    return _$error
  })

  const $errors = computed(() => {
    const _$errors = {} as Record<keyof T, ReturnType<typeof useV7d<T[keyof T]>>['$errors']['value']>

    for (const key of _keys) {
      const _key = key as keyof T
      _$errors[_key] = _errors[_key as keyof T].value
    }

    return _$errors
  })

  function $touch(key?: keyof T) {
    if (typeof key === 'string') {
      _touchFns[key]()
      return
    }

    for (const key of _keys) {
      const _key = key as keyof T
      _touchFns[_key]()
    }
  }

  function $validate(key?: keyof T) {
    if (typeof key === 'string') {
      return _validateFns[key]()
    }

    const results = {} as Record<keyof T, ReturnType<ReturnType<typeof useV7d<T[keyof T]>>['$validate']>>

    for (const key of _keys) {
      const _key = key as keyof T
      results[_key] = _validateFns[_key]()
    }

    return results
  }

  function $reset(key?: keyof T) {
    if (typeof key === 'string') {
      _resetFns[key]()
      return
    }

    for (const key of _keys) {
      const _key = key as keyof T
      _resetFns[_key]()
    }
  }

  function $resetWithInitialValue(key?: keyof T) {
    if (typeof key === 'string') {
      $reset(key)
      ;(_values as any)[key] = _initialValues[key]
      return
    }

    $reset()

    for (const key of _keys) {
      const _key = key as keyof T
      ;(_values as any)[_key] = _initialValues[_key]
    }
  }

  function $resetWith(key: keyof T, newValue: UnwrapRef<T[keyof T]>) {
    $reset(key)
    ;(_values as Values)[key] = newValue
  }

  return {
    values: _values,
    $els,
    $touchedAny,
    $touched,
    $error,
    $errors,
    $touch,
    $validate,
    $reset,
    $resetWithInitialValue,
    $resetWith
  }
}
