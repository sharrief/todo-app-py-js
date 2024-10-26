'use client'
import type { Todo } from "@prisma/client"
import { useEffect, useState } from "react"

export default function EditTodo(props: {todo?: Todo}) {
  const id = props.todo?.id ?? ''
  const saveTodoLabel = id ? 'Update' : 'Add'
  const [todo, setTodo] = useState<Todo>(props.todo ?? { id: 0, title: '', details: '', date: new Date() })

  useEffect(() => {
    async function fetchTodo() {
      if (props.todo) {
        const res = await fetch("/api/todo/" + props.todo.id)
        const responseData = await res.json() as Todo
        setTodo(responseData)
      }
    }
    fetchTodo()
  }, [props.todo])

  const [title, setNewTitle] = useState(todo.title)
  const [details, setNewDetails] = useState(todo.details)
 
  const saveTodo = async () => { 
    const res = await fetch(`/api/todo/${id}`,
      {
        method: id ? 'PATCH' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, details })
      }
    )
    if (res.ok) {
      if (confirm('Todo saved') !== undefined) {
        window.location.href = '/'
      }
    } else {
      alert(await res.text())
    }
  }

  return <div id="add">
    <div className="container d-flex d-flex-column justify-content-center mt-5 ">
      <h1>{saveTodoLabel} a task</h1>
    </div>

    <div className="container mb-3">
      <form id="add-todo-form" action="#" onSubmit={(e) => { e.preventDefault(); saveTodo() }}>
      <div>
        <label className=" requiredField">Title</label>
        <input name="title" 
          className="textinput form-control"
          value={title} 
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        <label className=" requiredField">Details</label>
        <textarea name="details" 
           className="textarea form-control" 
           rows={10}
           cols={40}
          value={details} 
          onChange={(e) => setNewDetails(e.target.value)}
          placeholder="Details"
        />
      </div>
        <button type="submit" name="button">{saveTodoLabel}</button>
      </form>
    </div>
  </div>
}