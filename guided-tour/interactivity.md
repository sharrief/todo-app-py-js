[<< Back: README](/README.md)  
[< Back: The DOM](./the-dom.md)
# Interactivity
The example in [home.js](/javascript/public/scripts/home.js) builds on the script loading and DOM manipulation topics to display a list of Todo items fetched from the backend API. It exhibits the original purpose of JavaScript: to make HTML pages dynamic and interactive.

### Dynamic content
To display a list of Todo items, we store the template markup representing one Todo item so that we can repeat it later. The element with id "row-template", which is queried in the DOM using the `#row-template` selector gives us access to this element. And since we don't yet know if any Todos will be rendered, we remove this template from the DOM so it is not rendered to the user.

We make a simple GET request to load the todos. If we find any, we remove the "No data found" message from the DOM. Next, for each todo, we clone the row template, dynamically set attributes and content on the elements in the template, then add the row to the DOM.

### Event listeners
All interactivity between the HTML page and JavaScript is event-driven. [Home.js:42](/javascript/public/scripts/home.js#L42) has a basic example of an "on click" handler, which triggers an API call to delete the todo, and conditionally remove the todo from the DOM if the deletion is successful. 

### Memory leaks
An important technical detail is that the event listener creates a closure over the row variable when the function is declared. Because the event listener may be invoked long after the for loop has completed, the `row` is not garbage collected when the loop exits. 

Even after the event listener removes the `row` element from the DOM, it still maintains a reference to the `row` element in-memory. Since the row is not garbage collected, the row's delete button and the event listener aren't garbage collected either. Since the row is no longer in the DOM, the row and the event listener are no longer accessible by any other JavaScript code, resulting in a quintessential JavaScript memory leak.

You can image how easy it would be to produce such scenarios if our rows were in a large table, like a real-time chat log or a list of search results.

Mitigating memory-leaks of this nature requires maintaining awareness of closures and cleaning up event listeners. In this case we could use `deleteButton.removeEventListener('click', deleteClicked)` to clean up the event listener when removing the row from the DOM.

Rendering frameworks like React handle this cleanup for you when you build components using the their APIs. 
[Next: Routing >](./routing.md)