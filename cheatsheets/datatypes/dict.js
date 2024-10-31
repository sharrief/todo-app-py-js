// A Python Dict is a HashMap/HashTable
const map = new Map([
  [0, "zero"],
]);
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

// you can only use dot notation if the key is a valid JS identifier, like a string
// obj.1 // SyntaxError: Unexpected number
obj["1"] // "one"

// obj props are always coerced into strings
obj[1] === obj["1"]; // true


obj.two = 2;
obj.two === obj["two"];// true

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
console.group("Map output");
for ([key, value] of map) {
  console.log(key, value);
}
console.groupEnd();

console.group("Object output");
for (key in obj) {
  const value = obj[key];
  console.log(key, value);
}
console.groupEnd();

console.group("when coercing to string, JS calls toString() on the value");
// Objects print prettier
console.log("map:", map); // Map(2) { 1 => 'one', 'two' => 2 }
console.log("obj:", obj); // { '1': 'one', two: 2 }
console.groupEnd();

/* 
  In general, use Objects for structured data or data you might later serialize.
  All property names in an object must be strings. 
  If you try to use a non-string as a property name, the toString()
  method will be called on the valuet to turn it into a string.

  Maps cannot be JSON serialized, but they are more optimized for iterating and measuring.
  The keys for maps can be anything, including objects and functions.
  In the example below we memoize the output of an expensive function.
 */
console.group("Memoization with Maps");
let unoptimizedExecutions = 0;
function expensiveFunction() {
  let sum = map.get(expensiveFunction) ?? 0;
  if (sum > 0) return sum;

  unoptimizedExecutions++;
  while (sum < 10 ** 10) sum++;
  map.set(expensiveFunction, sum);
  return sum;
}
console.log('Running expensiveFunction...'); // 10_000_000_000
console.log(expensiveFunction()); // 10_000_000_000
console.log(unoptimizedExecutions); // 1
console.log(expensiveFunction()); // 10_000_000_000
console.log(expensiveFunction()); // 10_000_000_000
console.log(expensiveFunction()); // 10_000_000_000
console.log(unoptimizedExecutions); // 1

// Turn the map.keys() iterator into an array, then access and invoke the 4th key, which is the function itself
const expFn = [...map.keys()][3]
console.log(expFn()); // 10_000_000_000
console.log(unoptimizedExecutions); // 1  

// If you try this with an object...
obj[expensiveFunction] = 'some value';
// then expensiveFunction will be coerced to a string
// the toString implementation of a function is the source code of the function
const sourceCode = Object.keys(obj)[3]; 
console.log(
  sourceCode === expensiveFunction.toString() // true
)

// But since JS is interpretable you *can* execute the function source code.
// For example only, in any other case, DO NOT USE eval as it allows running arbitrary code
eval(sourceCode); // eval will execute the JS source provided, which redeclares expensiveFunction
console.log(expensiveFunction()); // 10_000_000_000
console.log(unoptimizedExecutions); // 2
/* 
  unoptimizedExecutions is 2 because the new expensiveFunction is different in memory from the previous one.
  The map's keys are compared by reference. The old function is still a key in the map, but we no longer have
  a refedence to it since the variable expensiveFunction now points to the most recently declared version of the function.
*/
console.groupEnd();