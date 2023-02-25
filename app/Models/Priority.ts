import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Task from 'App/Models/Task'
import { DateTime } from 'luxon'

export default class Priority extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasMany(() => Task)
  public user: HasMany<typeof Task>
}
