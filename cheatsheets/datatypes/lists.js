const array = [];
array.push("two"); // 1
array.unshift("one"); // 2
array[3] = "three";
array.pop(); // 'three'
array.shift(); // 'one'
array.length; // 1

// Python "unpacking" is more robust than "destructuring" in JS
// There is no dedicated Tuple type in JS
// TS adds type support for using Arrays as Tuples
// You can destructure positional elements
const nums = [1, 2, 3, 4, 5];
const [first, second, ...rest] = nums;
console.log(first, second); // '1, 2'
console.log(rest); // '3, 4, 5'
// The ...rest syntax can only be used at the end
// Accessing the last element is a pain without popping the array
const last = nums[nums.length - 1];

const SixToTen = [6, 7, 8, 9, 10];
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

// Quickly create dupes or sequences
const ones = new Array(10).fill(1);
const evens = Array.from({ length: 10 }, (_, idx) => idx * 2);

// if you don't need to exit the loop early
// or you want to run async functions in parallel
nums.forEach((num, index) => console.log(num + index)); // 1, 3, 5, 7, 9

// map, reduce and filter work on Iterables like Arrays
const sum = nums.reduce((total, current) => total + current); // 15
const squares = nums.map((num) => num ** 2); // [ 1, 4, 9, 16, 25 ]
const notOdds = squares.filter((num) => num % 2 === 0); // [ 4, 16 ]
const evenNum = nums.find((num) => num % 2 === 0); // 4
const over21 = nums.some((num) => num > 21); // true
const allOver21 = nums.every((num) => num > 21); // false

function countArgs(...args) {
  console.log(args.length);
}
countArgs(1, 2, 3, 4, 5); // 5
