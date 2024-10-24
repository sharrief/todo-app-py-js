/**
 * 
 * @param n A positive integer signaling the nth Fibonacci number to calculate
 */
export function iterativeFibOf(n: number) {
  if (n <= 0) throw new Error('Input must be a positive integer')
  if (n <= 2) return 1

  let n_1 = 1;
  let n_2 = 1;
  let cur = 2;
  let i = 3

  while (i <= n) {
    cur = n_1 + n_2;
    ([n_1, n_2] = [n_2, cur])
    i++
  }

  return cur
}

/**
 * 
 * @param n A positive integer signaling the nth Fibonacci number to calculate
 */
export function recursiveFibOf(n: number) {
  if (n <= 0) throw new Error('Input must be a positive integer')
  const memo = new Map([[1, 1], [2, 1]])
  function recurse(n: number): number {
    return memo.get(n) ?? recurse(n - 1) + recurse(n - 2)
  }
  return recurse(n)
}
