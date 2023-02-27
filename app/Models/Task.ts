import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Priority from 'App/Models/Priority'
import User from 'App/Models/User'
import { DateTime } from 'luxon'


export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public priorityId: number


  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public body: string | null

  @attachment({ folder: 'thumbnails', preComputeUrl: true })
  public thumbnail: AttachmentContract | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => Priority)
  public priority: BelongsTo<typeof Priority>

  @belongsTo(() => User)
  // changed 'user' to 'author' for more readability later on
  public author: BelongsTo<typeof User>
}