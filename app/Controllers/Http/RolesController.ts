import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  public async getList({request, response}: HttpContextContract) {
    try {
      const page = request.input('page') != null ? parseInt(request.input('page')):1
      const limit = request.input('limit') != null ? parseInt(request.input('limit')):10
      const name = request.input('name')

      let role
      if (name) {
        role = await Role.query().whereILike('name', '%'+name+'%').paginate(page, limit)
      }else{
        role = await Role.query().paginate(page, limit)
      }

      return response.send({code: 200, data: role})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }
}
