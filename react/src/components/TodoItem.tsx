import { Todo } from "@prisma/client";
import React from "react";
import LinkButton from "./LinkButton";

export function TodoItem({ todo }: {todo: Todo}) {

  const { id, title, details, date } = todo
  const deleteTodo = async () => { 
    const res = await fetch(`/api/todo/${id}`, { method: 'DELETE' })
    if (res.ok) {
      console.log('Todo deleted')
      alert('Todo deleted')
      window.location.href = '/'
    } else {
      alert(res.text)
    }
  }

  return <div id="row-template" className="row">
    <div className="container card mb-3">
      <p>
        <span className="todo-id">{id}.</span>
        <span className='todo-title ms-2' style={{color:"green"}}>{title}</span>
      </p>
      <p className="todo-details">{details}</p>
      <p> <span style={{color:"green"}}>Created: </span><span className="todo-date">{date.toString()}</span></p>
      <div className="container">
        <LinkButton variant="secondary" href={`/${todo.id}`}>Update</LinkButton>
        <LinkButton variant="danger" 
          onClick={(e) => { e.preventDefault(); deleteTodo() }}
        >
          Delete
        </LinkButton>
      </div>
    </div>
  </div>
}

function TodoItemWithoutJSX({ todo }: {todo: Todo}) {

  const { id, title, details, date } = todo
  const deleteTodo = async () => { 
    const res = await fetch(`/api/todo/${id}`, { method: 'DELETE' })
    if (res.ok) {
      console.log('Todo deleted')
      alert('Todo deleted')
      window.location.href = '/'
    } else {
      alert(res.text)
    }
  }
  // Thanks Copilot for the JSX to React.createElement conversion
  /*
    React.createElement is similar to document.createElement, 
    but React handles instantiating the element, updating it, and inserting it into the DOM.
    
    JSX is converted to React.createElement calls using the following rules:
    - first argument is the tag name
    - second argument is the props object. 
      Some of these map to basic HTML DOM element attributes.
      Some map to React-specific attributes like className.
      Some map to a Component's props.
    - the rest of the arguments are the children of the element

  */
  return React.createElement("div", { id: "row-template", className: "row" },
    React.createElement("div", { className: "container card mb-3" },
      React.createElement("p", null,
        // The ID 
        React.createElement("span", { className: "todo-id" }, id),
        // The title is green
        React.createElement("span", { className: "todo-title ms-2", style: { color: "green" } }, title)
      ),
      // The details are in a paragraph element
      React.createElement("p", { className: "todo-details" }, details),
      React.createElement("p", null,
        React.createElement("span", { style: { color: "green" } }, "Created: "),
        // The date
        React.createElement("span", 
          { className: "todo-date" }, 
          date.toString()
        )
      ),
      React.createElement("div", { className: "container" },
        // A link to update the todo
        React.createElement(LinkButton, 
          { 
            variant: "secondary", href: `/${todo.id}` 
          }, 
          "Update"
        ),
        // A link to delete the todo
        React.createElement(LinkButton,
          { 
            variant: "danger", 
            onClick: (e) => { e.preventDefault(); deleteTodo() }
          },
          "Delete"
        )
      )
    )
  )
}