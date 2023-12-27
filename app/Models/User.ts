import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department';
import Role from './Role';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public password: string

  @column()
  public email: string

  @column()
  public phone: string | null

  @column()
  public nip: string | null

  @column()
  public department_id: number
  @belongsTo(() => Department,{
    foreignKey: 'department_id'
  })
  public department: BelongsTo<typeof Department>

  @column()
  public role_id: number
  @belongsTo(() => Role, {
    foreignKey: 'role_id'
  })
  public role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public created_by: number

  @column()
  public updated_by: number
}
