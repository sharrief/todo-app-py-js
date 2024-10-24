// Custom iterators are most commonly used in data processing tasks, rarely used in front end UI
// JS doesn't have a range() in its standard library, but Iterators make it easy to implement
function range(limit) {
  let value = -1;
  let done = false;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          value++;
          if (value >= limit) {
            value = undefined;
            done = true;
          }
          return { value, done };
        },
      };
    },
  };
}

for (let val of range(5)) {
  console.log(val); // 0, 1, 2, 3, 4
}

// Iterables can be spread into arrays
const lessThan20 = [...range(20)]; // [ 0, 1, 2, ..... 19]

// Under the hood for..of uses the object defined at the special key Symbol.iterator
const rangeIter = range(3)[Symbol.iterator]();
console.log(rangeIter.next()); // { value: 1, done: false }
console.log(rangeIter.next()); // { value: 2, done: false }
console.log(rangeIter.next()); // { value: 3, done: false }
console.log(rangeIter.next()); // { value: undefined, done: true }

// Other built-in types work the same way [Symbol.iterator]
const array = [1, 2, 3];
const arrayIter = array[Symbol.iterator]();
console.log(arrayIter.next()); // { value: 1, done: false }
console.log(arrayIter.next()); // { value: 2, done: false }
console.log(arrayIter.next()); // { value: 3, done: false }
console.log(arrayIter.next()); // { value: undefined, done: true }

// Generator functions offer a simplified iterator syntax
function* evens(limit) {
  let curr = 0;
  while (curr < limit) {
    yield (curr += 2);
  }
}

for (let val of evens(6)) {
  console.log(val); // 2, 4, 6
}

// Async generators are great for pagination/streaming
async function* getPageGenerator() {
  let pageNum = 0;
  while (pageNum < 20) {
    yield await getPage(pageNum++);
  }
}
// simulates fetching over the network
async function getPage(pageNum) {
  return new Promise((r) => setTimeout(() => r(`page ${pageNum}`), 1000));
}

const pageGenerator = getPageGenerator();
(async () => {
  for await (let page of pageGenerator) {
    console.log(page);
  }
})();
