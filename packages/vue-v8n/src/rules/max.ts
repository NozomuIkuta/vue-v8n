import { defineRuleFactory } from '../rule'

export const max = defineRuleFactory({
  name: 'max',
  create (max: number) {
    return function (value) {
      if (typeof value === 'string' && value.length > max) {
        return `Max length is ${max}`
      }

      if (typeof value === 'number' && value > max) {
        return `Maximum value is ${max}`
      }
    }
  }
})
