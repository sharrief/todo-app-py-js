import { DataSource } from "typeorm";
import { Todo } from "@/todo/models";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite3",
  synchronize: true,
  logging: true,
  entities: [Todo],
  subscribers: [],
  migrations: [],
})