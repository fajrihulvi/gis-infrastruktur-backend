import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'category_infrastructures'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('category_type')
    })
  }

  public async down () {
  }
}
