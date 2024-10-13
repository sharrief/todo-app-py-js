import { Todo } from '@/todo/models'
import { Router, type Request, type Response } from 'express'

export async function getById(req: Request, res: Response) {
  const id = +req.params.id;
  const todo = await Todo.findOneBy({ id })
  res.send(todo)
}

export async function all(req: Request, res: Response) {
  const todos = await Todo.find()
  res.send(todos)
}

export async function add(req: Request, res: Response) {
  const { body } = req as { body: Todo }
  const todo = new Todo();
  todo.title = body.title
  todo.details = body.details
  todo.date = Date.now()
  await todo.save()
  res.send(`Saved todo #${todo.id}: "${todo.title}"`)
}

export async function update(req: Request<unknown, string, Todo>, res: Response) {
  const { body } = req
  const todo = await Todo.findOneBy({ id: body.id })
  if (!todo) {
    res.send(`Could not find a todo with id ${body.id}`)
  } else {
    ({ title: todo.title, details: todo.details } = body)
    await todo.save()
    res.send(`Updated todo #${todo.id}: "${todo.title}"`)
  }
}

export async function remove(req: Request<{ id: string }>, res: Response) {
  const id = +req.params.id;
  const todo = await Todo.findOneBy({ id })
  if (todo) {
    await todo.remove()
    res.send(`Deleted todo #${todo.id}: "${todo.title}"`)
  } else {
    res.send(`Could not find a todo with id ${id}:`)
  }
}

const router = Router()
router.get('/all', all)
router.put('/add', add)
router.patch('/update', update)
router.delete('/delete/:id', remove)
router.get('/:id', getById)
export default router