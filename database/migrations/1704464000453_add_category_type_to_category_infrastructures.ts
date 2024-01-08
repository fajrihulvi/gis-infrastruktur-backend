import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'category_infrastructures'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('category_type').comment('1: Regional, 2: Existing, 3: Perencanaan, 4: Indikator Makro')
    })
  }

  public async down () {
  }
}
