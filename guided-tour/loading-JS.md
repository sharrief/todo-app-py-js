[< Back: README](/README.md)
# Loading JavaScript the old way
JavaScript files are downloaded and executed in the order that their `<script>` tags appear in the DOM.
All files share the global scope, so code in a later file can access variables and functions defined in earlier files. Later files can also redeclare and override those same variable and functions.

## Loading a script
The Urls.js file is loaded by the first `<script>` tag in [base.html:16](/javascript/public/base.html#L16).

## Declaring a global value
Open [Utils.js](/javascript/public/scripts/Utils.js) and see that it declares a `Utils` object in the global scope so that JS files loaded later in the lifecycle can access it. Inspect [add.js](/javascript/public/scripts/add.js#2) to that it destructures (calling unpacking in python) the function-valued properties of the Utils object.

We will discuss the code in these files in a moment. 

## Dynamically loading scripts
If a JavaScript file relies on other code that isn't loaded by `<script>` tags in the original HTML, it can dynamically add a `<script>` tag to the HTML to cause the browser to load the script. [add.js](/javascript/public/scripts/add.js#L8) uses this technique to load JavaScript that is specific to manipulating form data.

[Next: Manipulating the DOM >](./the-dom.md)