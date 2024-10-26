import getTodoModel from "./getTodoModel";

export async function GET(req: Request) {
  const TodoModel = await getTodoModel()
  const todos = await TodoModel.findMany()
  return Response.json(todos)
}

export async function PUT(req: Request) {
  const body = await req.json()
  const TodoModel = await getTodoModel()
  const todo = await TodoModel.create({ 
    data: {
      title: body.title,
      details: body.details,
      date: new Date()
    }
  });
  return new Response(`Saved todo #${todo.id}: "${todo.title}"`)
}