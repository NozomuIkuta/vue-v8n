import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { defineRuleFactory } from '../rule'

export const sameAs = defineRuleFactory({
  name: 'sameAs',
  create (target: MaybeRefOrGetter<unknown>) {
    return function (value, { createResult }) {
      return createResult(value === toValue(target) ? null : 'Value is not same as target')
    }
  }
})
