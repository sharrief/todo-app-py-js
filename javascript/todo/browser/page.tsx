import type { ITodo } from "./types"
console.log('App started')
function getEl(id: string) {
  return document.getElementById(id)
}
function el(tag: string) {
  return document.createElement(tag)
}

const root = getEl('root')
if (!root) throw new Error('Could not find root element')

const itemCountLabel = getEl('item-count')
const loadButton = getEl('load')
const todoList = getEl('list')

const msg = `Your TODOs`
const pageTitle = el('h1')
pageTitle.innerText = msg
root.prepend(pageTitle)

if (loadButton) {
  loadButton.onclick = async () => {
    const res = await fetch('/all')
    if (res.ok) {
      const todos = await res.json() as ITodo[];
      if (itemCountLabel) {
        itemCountLabel.innerText = `Found ${todos.length} items`
      }
      if (todoList) {
        todos.forEach((todo) => {
          const todoEl = el('div')
          todoEl.setAttribute('key', todo.id.toString())

          const todoHeader = el('div')
          todoHeader.innerText = `#${todo.id}: ${todo.title}`
          todoEl.append(todoHeader)

          const todoContent = el('div')
          todoContent.innerText = todo.details
          todoEl.append(todoContent);

          todoList.append(todoEl)
        })
      }
    }
  }
}