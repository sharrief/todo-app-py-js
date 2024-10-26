import getTodoModel from "@/app/api/todo/getTodoModel";
import EditTodo from "@/components/EditTodo";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  const TodoModel = await getTodoModel()
  const todo = await TodoModel.findFirst({ where: { id } })
  console.log(`/update/${id}/page.tsx`, todo)
  return <EditTodo todo={todo ?? undefined} />
}