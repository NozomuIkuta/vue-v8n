import { defineRuleFactory } from '../rule'

export const min = defineRuleFactory({
  name: 'min',
  create (min: number) {
    return function (value, { createResult }) {
      if (typeof value === 'string') {
        return createResult(value.length >= min ? null : `Min length is ${min}`)
      }

      if (typeof value === 'number') {
        return createResult(value >= min ? null : `Minimum value is ${min}`)
      }

      return createResult(null)
    }
  }
})
