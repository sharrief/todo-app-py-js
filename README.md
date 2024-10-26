# A Todo app in Python, Vanilla JS and React
This repository contains 3 basic todo apps built to show the parallels and differences between Python and JavaScript in the context of a web app.

## Directory
- `/python` contains a basic todo app built using Python & Django.
- `/javascript` contains a Vanilla JavaScript + Express translation of the pthyon app
- `/react` contains a React/TypeScript/NextJS translation of the javascript app

## Running the apps
### Pre-requisites
- VSCode
- Docker Desktop

### Starting the apps
For ease of use, a container with python and nodejs installed is configured in `./.devcontainer/devcontainer.json`.

1. Open the root folder (containing this README.md) in VSCode
1. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
1. Use the VSCode command palette to run `Dev Containers: Rebuild and Reopen in Container`
    - Wait for the container to be built. VSCode will automatically re-open in the container environment.
1. Open a VSCode terminal
1. Run any of the apps using the provided npm scripts and open the app's webpage
  - `npm run python` http://localhost:3000
  - `npm run javascript` http://localhost:3001
  - `npm run react` http://localhost:3002

## Suggested exploration path
The apps were built primarily to introduce JavaScript and React to an experienced Python & Django developer. The `/javascript` app exists primarily to show front-end fundamentals which are hidden by higher level abstractions like React and NextJS.

The suggested exploration path is to get familiar with the [`/python`](/python) app then compare fundamental differences between the python app and the javascript app.
  
## A-B comparisons
 
| Functionality | Python                                   | Vanilla JS | React | Notes
| ------------- | ------                                   | ---------- | ----- | ----- |
| Server config | [wsgi.py](/python/todo_project/wsgi.py)  | [server.ts](/javascript/todo_project//server.ts)|pre-configured by NextJS|
| Route setup   | [urls.py](/python/todo_project//urls.py) | [urls.ts](/javascript/todo_project/urls.ts)| [api/*](/react/src/app/api/) | NextJS maps routes using a `app/api/{route}/route.ts` folder naming convention|
| APIs          | [views.py](/python/todo/views.py)        | [routes.ts](/javascript/todo/routes.ts)| [route.ts  for `api`](/react/src/app//api/todo/route.ts) & [route.ts  for `api/:id`](/react/src/app/api/todo/[id]/route.ts)|
| Models        | [models.py](/python/todo/models.py) | [models.ts](/javascript/todo/models.ts) | [schema.prisma](/react/prisma/schema.prisma) | The Vanilla JS uses TypeORM to show there are JS frameworks let you define your models in JS code. The React app uses popular Prisma framework which has its own language but integrates well with TypeScript.|
| Views         | [templates/](/python//templates/) (see [settings.py:60](/python/todo_project/settings.py#L60)) | [public/](/javascript/public/) (see [server.ts:13](/javascript/todo_project/server.ts#L13)) | [(pages)/*/page.tsx](/react/src/app/(pages)/) & [components/*](/react/src/components/) | NextJS maps pages using a `app/{path}/page.tsx` naming convention for page templates. The page templates then consume React components. |
| View updates   | N/A, server-side rendered | Imperative DOM manipulation: [add.js](/javascript/public/scripts/add.js) | "Reactive" DOM changes on state updates: [EditTodo.tsx](/react/src/components/EditTodo.tsx#L8) ||
| Interactivity  | N/A, server-side rendered | DOM event listeners : [home.js](/javascript/public/scripts/home.js#L42) | Component event handlers: [EditItem.tsx](/react/src/components//EditTodo.tsx#L8) | Component event handlers work the same as event listeners in practice. They differ only in that React handles their lifecycle. |

## TL;DR Under the hood of React
The JSX markup commonly used in React components is not JavaScript. Transpilers are used to convert JSX into JavaScript functions call to React. See [TodoItem.tsx](/react/src/components/TodoItem.tsx) for an A-B comparison of a component built with JSX vs with pure JS.

React manages an internal representation of the DOM which it calls the Fiber Tree. 
React monitors updates to state variables that your component makes, and compares the return value of your component with its state in the Fiber Tree,
to determine when and how to update the DOM.
React uses an optimized reconciliation process that batches changes from multiple components on a schedule, and determines the optimal way to update the DOM.
