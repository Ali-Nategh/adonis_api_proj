import {
  HasOne, hasOne, hasMany, HasMany, beforeSave,
  BaseModel, column, BelongsTo, belongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Profile from 'App/Models/Profile'
import Role from 'App/Models/Role'
import Task from 'App/Models/Task'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number


  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public username: string

  @column()
  public age: number | null

  @column()
  public name: string | null

  @column()
  public familyName: string | null

  @column()
  public rememberMeToken: string | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>
}
