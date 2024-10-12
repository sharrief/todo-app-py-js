import express from 'express'
import { add, all, remove, update } from '@/todo/routes';
import { AppDataSource } from '@/todo_project/settings';

AppDataSource.initialize()

const app = express()
const port = 3000

// app.use(handler) means the handler is run for every request to the server

// express.json() is route handler middleware to parse JSON in request body and serialize response objects to JSON
app.use(express.json());

app.use(express.static('public'))
app.get('/all', all)
app.post('/add', add)
app.post('/update', update)
app.post('/delete', remove)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})