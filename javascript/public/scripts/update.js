(async function registerFormEventHandlers() {
  const { getEl, el, selectEl } = Utils

  // Populate form fields with existing data
  const container = getEl('add')
  if (!container) throw new Error('Could not find the "add" container')
  
  const form = selectEl(container, '#add-todo-form')
  if (!form) throw new Error('Could not find the "add-todo-form"')

  // Load the existing todo
  const [_,path,id] = window.location.pathname.split('/')
  const todoResponse = await fetch(`/api/${id}`)
  const todo = await todoResponse.json()
  const titleEl = selectEl(form, '[name="title"]')
  titleEl.value = todo.title
  const detailsEl = selectEl(form, '[name="details"]')
  detailsEl.value = todo.details

  // "import" the FormController
  const formControllerScript = el('script')
  formControllerScript.src = '/scripts/FormController.js'
  formControllerScript.defer = true
  document.head.appendChild(formControllerScript)

  form.addEventListener('submit', async function (event) {
    event.preventDefault()
    const formData = new FormData(form);
    const title = formData.get('title')
    const details = formData.get('details')

    const postData = { id, title, details }
    FormController.submit(postData)
  })
})()