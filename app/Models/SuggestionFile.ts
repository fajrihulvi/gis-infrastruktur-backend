import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Suggestion from './Suggestion'

export default class SuggestionFile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public suggestion_id: number
  @belongsTo(() => Suggestion, {
    foreignKey: 'suggestion_id'
  })
  public suggestion: BelongsTo<typeof Suggestion>

  @column()
  public url: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
