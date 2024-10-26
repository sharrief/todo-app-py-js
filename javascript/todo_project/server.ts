import express from 'express'
import apiRoutes from '@/todo_project/urls';
import { AppDataSource } from '@/todo_project/settings';
import path from 'path';

const port = 3001
AppDataSource.initialize()

const app = express()
// Middleware to parse the request body as JSON
app.use(express.json());
// Requests for static files (.js, .css, .html, .etc) will be served from the public folder
app.use(express.static('public')) 
// All requests to /api will be served by the apiRoutes
app.use('/api', apiRoutes)
// All other requests will be served by the base.html file
app.get('/*', (req, res) => {
  res.contentType('html')
  res.sendFile(path.join(__dirname, '..', 'public', 'base.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})