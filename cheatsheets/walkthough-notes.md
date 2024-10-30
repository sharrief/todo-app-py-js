# TypeScript syntax
### [Simple Class example](/javascript/todo/models.ts)
  - Classes can extend one class, implement many interfaces/types
  - Decorators/mixins are supported by TypeScript, but not a ES standard, yet...
  - Classes do not need constructors to instantiate public properties
  - Methods are declared with a shorthand function syntax
### [Type and Interface example usage](/cheatsheets/classes.ts)
  - Types and Interfaces can both be used to describe the shape of an object.
  - Types can also describe the type of a non-object
  - Both support generics
### [Function basics](/cheatsheets/functions/basics.js)
  - The difference between arrow functions and normal functions
      - Normal functions can become methods, in which `this` refers to the object from which they are accessed.
      - The `this` value arrow functions closes around the `this` when they are declared. Usually `this` === the global object.
      - Only normal functions support the generator function syntax
      - Arrow functions are always anonymous and appear as such in the call stack
      - Normal functions can be declared anonymously 
### [Async Functions](/cheatsheets/functions/async.js)
  - Promises provide asynchronous support in JS. Native Promises are callback-based.
  - Async/Await is syntactical sugar which causes a function to return a Promise, even if the function doesn't `await` anything.
  - Async/Await allows writing async code that looks synchronous, is easier to read in most cases
### [Dicts / Maps & Objects](/cheatsheets/datatypes/dict.js)
  - Python Dict -> JS Map when large number of keys, independent key-value pairs, fast performance 
  - Python Dict -> JS Object for serializing data, when key-values are different pieces of the same thing (like Class members)
### Loops
  - Same-valued arrays are optimized.
  - Can be destructured
  - Supports ...rest (unpacking) for un-destructured items at the end only
  - Supports spreading when instantiating, concise concatenation
