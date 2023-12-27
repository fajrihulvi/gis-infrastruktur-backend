import Hash from '@ioc:Adonis/Core/Hash'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      name: 'super admin',
      password: await Hash.make('admin'),
      email: 'admin@admin.com',
      phone: null,
      department_id: 1,
      role_id: 1
    })
  }
}
