'use client'
import { Todo } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { TodoItem } from "@/components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function fetchTodos() {
    const res = await fetch("/api/todo")
    const responseData = await res.json() as Todo[]
    setTodos(responseData)
  }

  useEffect(() => {
      fetchTodos()
  }, [])

  const context = useMemo(() => ({todoMap: todos, setTodoMap: setTodos}), [todos])

  return (
    <div id="home">
    <div className="container mb-5">
  
    </div>
    <div className="container d-flex d-flex-column justify-content-center mb-5 ">
      <h1>Todo app</h1>
    </div>
      <div className="todo-list">
        {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        {todos.length < 1 && <h4 id="no-data">You have no todos!</h4>}
      </div>
    <div className="container">
      <a id="add-todo-button" className="btn btn-primary" href="/add"> Add a new todo</a>
    </div>
  </div>
  );
}

