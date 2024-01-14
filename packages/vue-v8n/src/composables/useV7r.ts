// @ts-nocheck

// const [name, nameValidator] = useV7d('', [])
// const [age, ageValidator] = useV7d(0, [])

// name.value = 'John Doe'
// age.value = 20

const { data, errors, validator } = useV7d({
  name: '',
  age: 0
}, {
  name: [required],
  age: [min(20)]
})

data.name = 'John Doe'
data.age = 10

const result = await validator.validate()

result.ok // false
result.data.name // 'John Doe'
result.data.age // 'Error: min is 20'
result.errors // ['Error: min is 20']

const { data: array, errors, validator } = useV7dArray<{ count: number }>([], { count: min(20) })

array.push(21)
array.push(22)

const result = await validator.validate()

result.ok // true
result.data[0] // 21
result.data[1] // 22
result.errors // null
