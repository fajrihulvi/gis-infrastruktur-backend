import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'master_shp'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.integer('category_infrastructure_id').nullable()
      table.string('variable').notNullable()
      table.string('used_variable').nullable()
      table.text('features').notNullable()
      table.string('color').nullable()
      table.boolean('is_finish').defaultTo(0).comment('0: unfinish, 1: finish')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
