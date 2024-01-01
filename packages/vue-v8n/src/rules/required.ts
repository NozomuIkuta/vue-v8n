import { defineRule } from '../rule'

export const required = defineRule({
  name: 'required',
  run (value, { createResult }) {
    if (typeof value === 'string') {
      return createResult(!!value ? null : 'Required')
    }

    return createResult(null)
  }
})
