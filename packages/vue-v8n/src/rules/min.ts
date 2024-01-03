import { defineRuleFactory } from '../rule'

export const min = defineRuleFactory({
  name: 'min',
  create (min: number) {
    return function (value) {
      if (typeof value === 'string' && value.length < min) {
        return `Min length is ${min}`
      }

      if (typeof value === 'number' && value < min) {
        return `Minimum value is ${min}`
      }
    }
  }
})
