const array = [];
array.push("two"); // returns the length of the array, 1
array.unshift("one"); // pushes to the front of the array, returns the length of the array, 2
array[3] = "three";
array.pop(); // 'three'
array.shift(); // pops from the front, returns the element, 'one'
array.length; // 1

// Python "unpacking" is more robust than "destructuring" in JS
// There is no dedicated Tuple type in JS
// TS adds type support for using Arrays as Tuples (not shown here)
// You can destructure positional elements
const nums = [1, 2, 3, 4, 5];
// using ... on the LHS is called "rest" syntax and accumulates the rest of the array elements or object properties 
const [first, second, ...rest] = nums;
console.log(first, second); // '1, 2'
console.log(rest); // '3, 4, 5'
// The ...rest syntax can only be used at the end
// Accessing the last element is a pain without popping the array
const last = nums[nums.length - 1];

const SixToTen = [6, 7, 8, 9, 10];
// using ... on the RHS is called "spread" syntax and expands the array elements or object properties
const OneToTen = [...nums, ...SixToTen]; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Iterating
// for loops use 'of' to access values...
for (let num of nums) {
  console.log(num); // 1, 2, 3, 4, 5
}
// and use 'in' to access keys/indexes. This is more useful for other Iterables
for (let index in nums) {
  console.log(index); // 0, 1, 2, 3, 4
}

// cannot use 'in' to check for values in an array
9 in SixToTen; // false
// but you can use 'includes'
SixToTen.includes(9); // true
// or indexOf
SixToTen.indexOf(9); // 3
SixToTen.indexOf(11); // -1, if not found

// Quickly create dupes or sequences
const ones = new Array(10).fill(1);
const evens = Array.from({ length: 10 }, (_, idx) => idx * 2);

// if you don't need to exit the loop early, you can use forEach
nums.forEach((num, index) => console.log(num + index)); // 1, 3, 5, 7, 9

// if you want run async functions in parallel you can use Promise.all
async function pretendThisIsAsync(num) {
  return num;
}
const promises = nums
  // call to nums.map immdiately returns an array of promises
  .map(async (num) => await pretendThisIsAsync(num))
// Promise.all resolves when all promises are resolved
const results = await Promise.all(promises);

// map, reduce and filter work on Iterables like Arrays
const sum = nums.reduce((total, current) => total + current); // 15
const squares = nums.map((num) => num ** 2); // [ 1, 4, 9, 16, 25 ]
const notOdds = squares.filter((num) => num % 2 === 0); // [ 4, 16 ]
const evenNum = nums.find((num) => num % 2 === 0); // 4
const someOver21 = nums.some((num) => num > 21); // true
const allOver21 = nums.every((num) => num > 21); // false
