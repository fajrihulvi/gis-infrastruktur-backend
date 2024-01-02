import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryInfrastructure from 'App/Models/CategoryInfrastructure';

export default class CategoryInfrastucturesController {
  async getAllCategory({request, response}:HttpContextContract) {
    try {
      let data = await CategoryInfrastructure.query().select('id', 'name')

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }
}
