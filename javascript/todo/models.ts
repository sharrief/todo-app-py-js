import { ITodo } from "@/todo/browser/types"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Todo extends BaseEntity implements ITodo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 100 })
  title: string

  @Column({ type: "text" })
  details: string

  @Column({ type: "datetime" })
  date: number

  toString() {
    return this.title
  }
}