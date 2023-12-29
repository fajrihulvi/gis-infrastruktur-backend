import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dina from 'App/Models/Dina'

export default class DinasController {
  public async getList({response}: HttpContextContract) {
    try {
      let dinas = await Dina.all()

      return response.send({code: 200, data: dinas})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }
}
