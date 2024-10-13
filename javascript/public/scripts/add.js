(async function registerFormEventHandlers() {
  const { getEl, el, selectEl } = Utils

  // "import" the FormController
  const formControllerScript = el('script')
  formControllerScript.src = '/scripts/FormController.js'
  formControllerScript.defer = true
  document.head.appendChild(formControllerScript)

  const container = getEl('add')
  if (!container) throw new Error('Could not find the "add" container')
  
  const form = selectEl(container, '#add-todo-form')
  if (!form) throw new Error('Could not find the "add-todo-form"')
  
  form.addEventListener('submit', async function (event) {
    event.preventDefault()
    const formData = new FormData(form);
    const title = formData.get('title')
    const details = formData.get('details')
    const postData = { title, details }
    FormController.submit(postData)
  })
})()