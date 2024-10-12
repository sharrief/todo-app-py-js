import { DataSource } from "typeorm";
import { Todo } from "@/todo/models";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "todo_db",
  synchronize: true,
  logging: true,
  entities: [Todo],
  subscribers: [],
  migrations: [],
})