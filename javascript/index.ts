import express, { Request, Response } from 'express'
import { Todo } from '@/todo/models'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/sample', async (req: Request, res: Response) => {
  const todo = new Todo();
  todo.title = 'My First Todo'
  todo.details = 'Step 1... there is no step 1'
  todo.date = Date.now()
  res.send(todo)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})