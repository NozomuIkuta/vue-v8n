import { defineRule } from '../rule'

export const required = defineRule({
  name: 'required',
  run (value) {
    if (typeof value === 'string' && !value) {
      return 'Required'
    }
  }
})
