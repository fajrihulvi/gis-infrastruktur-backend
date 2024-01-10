import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import CategoryInfrastructure from './CategoryInfrastructure'

export default class MasterShp extends BaseModel {
  public static table = 'master_shp'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public category_infrastructure_id: number
  @belongsTo(() => CategoryInfrastructure,{
    foreignKey: 'category_infrastructure_id'
  })
  public category: BelongsTo<typeof CategoryInfrastructure>

  @column()
  public variable: string

  @column()
  public used_variable: string

  @column()
  public features: string

  @column()
  public color: string

  @column()
  public is_finish: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
