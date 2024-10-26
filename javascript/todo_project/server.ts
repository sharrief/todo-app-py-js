import express from 'express'
import apiRoutes from '@/todo_project/urls';
import { AppDataSource } from '@/todo_project/settings';
import path from 'path';

AppDataSource.initialize()

const app = express()
const port = 3001

app.use(express.json());
app.use(express.static('public'))
app.use('/api', apiRoutes)
app.get('/*', (req, res) => {
  res.contentType('html')
  res.sendFile(path.join(__dirname, '..', 'public', 'base.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})