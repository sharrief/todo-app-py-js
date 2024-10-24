import { iterativeFibOf, recursiveFibOf } from './functions'

describe('iterative fibonacci', () => {
  it.each([
    [1, 1],
    [2, 1],
    [3, 2],
    [5, 5],
    [9, 34],
    [10, 55],
    [12, 144],
  ])('calculates fib(%s) correctly', (n, expected) => {
    expect(iterativeFibOf(n)).toBe(expected)
  })
})

describe('recursive fibonacci', () => {
  it.each([
    [1, 1],
    [2, 1],
    [3, 2],
    [5, 5],
    [9, 34],
    [10, 55],
    [12, 144],
  ])('calculates fib(%s) correctly', (n, expected) => {
    expect(recursiveFibOf(n)).toBe(expected)
  })
})
