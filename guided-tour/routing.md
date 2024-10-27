[<< Back: README](/README.md)  
[< Back: Interactivity](./interactivity.md)
# Routing
In this example we simulate a Single Page App (SPA) by returning the same HTML from the server on any path, and using JavaScript to determine which page template to render. You can try to access http://localhost:30001/not-a-real-page when running the JavaScript app and you'll see that the todo app still loads renders. You can try accessing an arbitrary path and you'll get the same behavior. The [server](/javascript/todo_project/server.ts#L17) is configured to response with the same HTML template on a GET request to any path that isn't for a resource in the `/public` folder or a request to the `/api`

Modern frameworks, like NextJS, can perform client-side navigation meaning no request is made to the server for accessing certain paths. Instead, the framework intercepts the navigation request, and renders the appropriate template for the page.

[Router.js](/javascript/public/scripts/router.js) is the second script loaded by our HTML in [base.html:](/javascript/public/base.html#L17). We implement simple client-side routing based on the current path using the global `window.location` to inspect the current path. A HTML file and its corresponding JavaScript file are fetched from the server depending on the current path. 

Of course there is no need for this sort of manual effort for a website as simple as this todo app, this example exists only to show how some JS frameworks handle client-side navigation under the hood. 
[Next: fetching data >](./fetching-data.md)