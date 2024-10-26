import { Todo } from "@prisma/client";

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
        <a className="update-todo btn btn-secondary" href={`/${todo.id}`}>Update</a>
        <a className="delete-todo btn btn-danger" href="#" 
          onClick={(e) => { e.preventDefault(); deleteTodo() }}
        >
          Delete
        </a>
      </div>
    </div>
  </div>
}