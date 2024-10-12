import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Todo extends BaseEntity {
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