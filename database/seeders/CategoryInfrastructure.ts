import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CategoryInfrastructure from 'App/Models/CategoryInfrastructure'

export default class extends BaseSeeder {
  public async run () {
    await CategoryInfrastructure.createMany([
      {
        name: 'Drainase'
      },
      {
        name: 'Jalan'
      },
      {
        name: 'Kemiringan Lereng'
      },
      {
        name: 'Kontur'
      },
      {
        name: 'Jenis Tanah'
      },
      {
        name: 'Persil Bangunan'
      },
      {
        name: 'Data Kolong dan Sungai'
      },
      {
        name: 'Data Batas Administrasi'
      }
    ])
  }
}
