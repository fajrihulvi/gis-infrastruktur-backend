import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Kelurahan from './Kelurahan'

export default class Kecamatan extends BaseModel {
  public static table = 'kecamatans'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Kelurahan,{
    foreignKey: 'id_kecamatan'
  })
  public kelurahan: HasMany<typeof Kelurahan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
