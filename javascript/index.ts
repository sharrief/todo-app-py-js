import express from 'express'
import apiRoutes from '@/todo/routes';
import { AppDataSource } from '@/todo_project/settings';
import path from 'path';

AppDataSource.initialize()

const app = express()
const port = 3000

// app.use(handler) means the handler is run for every request to the server

// express.json() is route handler middleware to parse JSON in request body and serialize response objects to JSON
app.use(express.json());
app.use(express.static('public'))
app.use('/api', apiRoutes)
app.get('/*', (req, res) => {
  res.contentType('html')
  res.sendFile(path.join(__dirname, 'public', 'base.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})