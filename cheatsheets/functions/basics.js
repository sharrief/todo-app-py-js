// Idiomatic function declaration
function printName(name) {
  console.log(name);
}
// Basically the same as this anonymous/unnamed function
const printName2 = function (name) {
  console.log(name);
};

// Also usually the same as this "arrow" function, as long as you don't reference `this`
const printName3 = (name) => {
  console.log(name);
};
// You can omit the parens around args. 
// You can omit brackets around the block and return for arrow functions with one expression
const getFancyName = name => `✨${name}✨`;
console.log(getFancyName("john")); // ✨john✨

// Function declarations can be invoked (aka IIFE)
(function(name) {
  console.log(name);
})("john");
// Function expressions and can be invoked (aka IIFE)
(name => console.log(name))("john");

// More useful when you want encapsulate logic/behavior
const date = new Date();
const displayDate = (() => {
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const year = date.year();
  return month + " " + day + " " + year;
})();

// using ... in function arguments is called "rest" syntax
// it accumulates the rest of the positional arguments into an array
function printNums(first, second, ...rest) {
  console.log(first);
  console.log(second);
  rest.forEach((num) => console.log(num));
}

// there are no keyword arguments in JS
// you can use object destructuring to simulate them
function printPerson({ firstName, age, greeting = 'hello' }) {
  console.log(firstName, age, greeting);
}
const firstName = 'john'
const age = 30
printPerson({ firstName, age }); // john 30 hello