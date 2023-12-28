import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'kelurahans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_kecamatan').notNullable()
      table.string('name').notNullable()
      table.string('area').notNullable()
      table.string('perimeter').notNullable()
      table.string('hectares').notNullable()
      table.string('x_axis').notNullable()
      table.string('y_axis').notNullable()
      table.string('code').notNullable()
      table.string('population').notNullable()
      table.string('wide').notNullable()
      table.text('feature').notNullable()

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
