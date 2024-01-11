import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SuggestionFile from './SuggestionFile'

export default class Suggestion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phone_number: string

  @column()
  public suggestion: string

  @hasMany(() => SuggestionFile, {
    foreignKey: 'suggestion_id'
  })
  public files: HasMany<typeof SuggestionFile>

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
