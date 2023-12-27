import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('created_by').defaultTo(1)
      table.integer('updated_by').defaultTo(1)
    })
  }

  public async down () {
  }
}
