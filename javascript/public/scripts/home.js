(async function () {
  const { getEl, el, selectEl } = Utils
  
  // "import" the FormController
  const deleteScript = el('script')
  deleteScript.src = '/scripts/DeleteHandler.js'
  deleteScript.defer = true
  document.head.appendChild(deleteScript)

  const homeElement = getEl('home')
  if (!homeElement) throw new Error('Could not find the "home" container')
  
  const rowTemplate = selectEl(homeElement, '#row-template')
  if (!rowTemplate) throw new Error('Could not find the "row-template" container')
  rowTemplate?.remove()
  
  const todoList = selectEl(homeElement, '.todo-list');
  const noDataMessage = selectEl(homeElement, '#no-data')

  const todosResponse = await fetch('/api/all')
  const todos = await todosResponse.json()
  if (todos.length) noDataMessage?.remove()

  todos.forEach((todo) => {
    const row = rowTemplate.cloneNode(true)
    row.removeAttribute('id')

    function setTextContent(selector, content) {
      const el = row.querySelector(selector)
      if (el) el.textContent = content
    }

    setTextContent('.todo-id', todo.id.toString())
    setTextContent('.todo-title', todo.title)
    setTextContent('.todo-details', todo.details)

    const date = new Date(todo.date)
    const dateString = `${date.getMonth()+1}-${date.getDay()}-${date.getFullYear()}`
    setTextContent('.todo-date', dateString + " " + date.toLocaleTimeString())

    const deleteButton = row.querySelector('.delete-todo')
    deleteButton.addEventListener('click', () => DeleteHandler.delete(todo.id))

    const updateButton = row.querySelector('.update-todo')
    updateButton.setAttribute('href', `/update/${todo.id}`)

    todoList?.append(row)
  })
  
})()