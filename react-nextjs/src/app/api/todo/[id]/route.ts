import getTodoModel from "../getTodoModel";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  const TodoModel = await getTodoModel()
  const todo = await TodoModel.findFirst({ where: { id } })
  return Response.json(todo)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  const body = await req.json()
  const TodoModel = await getTodoModel()
  try {
    const todo = await TodoModel.update({ 
      where: { id },
      data: {
        title: body.title,
        details: body.details,
      }
     })
    return new Response(`Updated todo #${todo.id}: "${todo.title}"`)
  } catch {
    return new Response(`Could not find a todo with id ${body.id}`)
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  const TodoModel = await getTodoModel()
  try {
    const todo = await TodoModel.delete({ where: { id } })
    return new Response(`Deleted todo #${todo.id}: "${todo.title}"`)
  } catch (e) {
    return new Response(`Could not find a todo with id ${id}:`)
  }
}