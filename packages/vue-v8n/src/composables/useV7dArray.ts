import { reactive, ref } from 'vue'
import type { MaybeRefOrGetter, UnwrapRef } from 'vue'
import type { RuleDefinition, UseV7dOptions } from '../types'
import { useV7d } from './useV7d'

export function useV7dArray<T>(values: T[], rules: MaybeRefOrGetter<RuleDefinition[]>, options?: UseV7dOptions) {
  const _initialValues = [...values]
  const _values = reactive([] as T[])
  const $els = reactive([] as ReturnType<typeof useV7d<T>>['$el'][])

  function setElement(index: number, el: EventTarget) {
    if ($els[index]) {
      $els.
      $els[index].value = el
    } else {
      $els[index] = ref<UnwrapRef<typeof $els[number]>>(el)
    }
  }

  return {
    values: _values,
    $els,
    setElement
  }
}
