// A Python Dict is a HashMap/HashTable
const map = new Map([[0, "zero"]]);
map.set(1, "one");
map.set("two", 2);
map.get(1); // 'one'
map.get(3); // undefined

// In JS its more idiomatic and concise to use Objects
// Maps didn't originally exist, so many JS developers continue to use Objects
// You can access keys by dot or bracket notation
const obj = {
  0: "zero",
};
obj[1] = "one";
obj.two = 2;
obj[1]; // 'one'
// obj props are always strings
obj["1"]; // 'one'
obj["two"]; // 2
obj.two; // 2
obj.three; // undefined
obj[3]; // undefined

// Its easier to get the size of a Map
map.size; // 3
Object.keys(obj).length; // 3

// And access the keys
map.keys(); // Iterator [0, 1, 'two']
Object.keys(obj); // ['0', '1', 'two']

// And iterate over the values
// Maps/Sets maintain insertion order in JS
for ([key, value] of map) {
  console.log(key, value);
}
for (key in obj) {
  const value = obj[key];
  console.log(key, value);
}

// Objects print prettier
console.log(map); // Map(2) { 1 => 'one', 'two' => 2 }
console.log(obj); // { '1': 'one', two: 2 }

// In general use Objects for structured data or data you might serialize
// Maps cannot be JSON serialized, but they are more optimized
// and the keys for maps can be anything
let unoptimizedExecutions = 0;
function expensiveFunction() {
  let sum = map.get(expensiveFunction) ?? 0;
  if (sum > 0) return sum;

  unoptimizedExecutions++;
  while (sum < 10 ** 10) sum++;
  map.set(expensiveFunction, sum);
  return sum;
}

console.log(expensiveFunction()); // 10_000_000_000
console.log(unoptimizedExecutions); // 1
console.log(expensiveFunction()); // 10_000_000_000
console.log(expensiveFunction()); // 10_000_000_000
console.log(expensiveFunction()); // 10_000_000_000
console.log(unoptimizedExecutions); // 1
