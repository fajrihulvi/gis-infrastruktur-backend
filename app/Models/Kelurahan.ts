import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Kecamatan from './Kecamatan'

export default class Kelurahan extends BaseModel {
  public static table = 'kelurahans'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_kecamatan: number
  @belongsTo(() => Kecamatan,{
    foreignKey: 'id_kecamatan'
  })
  public kecamatan: BelongsTo<typeof Kecamatan>

  @column()
  public name: string

  @column()
  public area: string

  @column()
  public perimeter: string

  @column()
  public hectares: string

  @column()
  public x_axis: string

  @column()
  public y_axis: string

  @column()
  public code: string

  @column()
  public population: string

  @column()
  public wide: string

  @column()
  public feature: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
