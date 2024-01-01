import { defineRuleFactory } from '../rule'

export const max = defineRuleFactory({
  name: 'max',
  create (max: number) {
    return function (value, { createResult }) {
      if (typeof value === 'string') {
        return createResult(value.length <= max ? null : `Max length is ${max}`)
      }

      if (typeof value === 'number') {
        return createResult(value <= max ? null : `Maximum value is ${max}`)
      }

      return createResult(null)
    }
  }
})
