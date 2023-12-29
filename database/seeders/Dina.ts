import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dina from 'App/Models/Dina'

export default class extends BaseSeeder {
  public async run () {
    await Dina.createMany([
      {
        name: 'Bapeda'
      },
      {
        name: 'PU'
      },
      {
        name: 'Kominfo'
      }
    ])
  }
}
