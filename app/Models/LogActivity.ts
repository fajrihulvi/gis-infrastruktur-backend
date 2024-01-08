import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class LogActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  @belongsTo(() => User,{
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @column()
  public activity: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
