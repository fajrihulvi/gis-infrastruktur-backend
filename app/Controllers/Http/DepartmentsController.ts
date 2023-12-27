import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'

export default class DepartmentsController {
  public async getList({request, response}: HttpContextContract) {
    try {
      const page = request.input('page') != null ? parseInt(request.input('page')):1
      const limit = request.input('limit') != null ? parseInt(request.input('limit')):10
      const name = request.input('name')

      let department
      if (name) {
        department = await Department.query().whereILike('name', '%'+name+'%').paginate(page, limit)
      }else{
        department = await Department.query().paginate(page, limit)
      }

      return response.send({code: 200, data: department})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }
}
