[<< Back: README](/README.md)  
[< Back: Loading JS](./loading-JS.md)
# The Document Object Model
Every XML element in HTML has 3 primary artifacts:
- A tag name
- Any number of attributes, optionally with values
- Content (optionally)

`<tagName attribute="value">content</tagName>`

The DOM is a JavaScript accessible representation of the HTML document. Browsers provide JavaScript with an API to interact with the DOM via the global `document` and with the browser itself via the global `window`.

This API is not a part of the JavaScript standard library and is not available to JavaScript in non-browser environments like NodeJS.

### DOM Manipulation
At is core, JavaScript adds interactivity to HTML pages by dynamically creating, removing and modifying DOM elements. [Utils.js](/javascript/public/scripts/Utils.js) contains helper functions for finding and creating elements.

# JavaScript concepts
The example showcases a few other notable JavaScript concepts 

### JavaScript Objects
The `Utils` variable is assigned an Object value. The `{}` syntax is shorthand for instantiating an instance of the base Object class. It is equivalent to calling `new Object()`.

#### Objects are not hashmaps

While the instantiation syntax is very similar to creating a `Dict` in Python, JS `Objects` are not a replacement for Dicts because `Objects` are not implementations of hashmaps. 

The JS implementation of the hashmap is the `Map` class. Unlike `Object`, `Map` is an Iteratble provides an easy way to check its size and access its keys. Like in Python, the keys in JS `Maps` maintain insertion order.

JS `Objects` are frequently used as key-value stores primarily because of the consise JSON-like syntax. Also, `Map` did not exist previous to 2015's introduction of ES6, so `Object` was often used as a stand in for hashmaps.

#### Use Objects for keyword parameters
Unlike Python, JS does not support keyword/named parameters. However since the introduction of object destructuring syntax in ES6, it has become common practice to use Object parameters to achieve the flexibility provided by named/keyword parameters.

#### Objects are class instances
Another significant difference is that methods defined on an `Object` can access the keyword `this` which, like `self` in python, refers to the `Object` instance from which the method is being invoked. 

### JSDoc comments
JS comments starting with `/**` are interpreted as JSDoc comments by VSCode, similar to triple-quoted stings in Python. Using JSDoc comments leverages VSCode Intellisense.

[Next: Adding interactivity >](./interactivity.md)