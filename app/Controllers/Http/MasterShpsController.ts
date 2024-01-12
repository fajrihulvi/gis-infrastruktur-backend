import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import MasterShp from 'App/Models/MasterShp'
import moment from 'moment'

export default class MasterShpsController {
  async getList ({request, response}:HttpContextContract){
    try {
      const page = request.input('page') != null ? parseInt(request.input('page')):1
      const limit = request.input('limit') != null ? parseInt(request.input('limit')):10
      const order_by = request.input('order_by') != null ? request.input('order_by'):'created_at'
      const order_direction = request.input('order_direction') != null ? request.input('order_direction'):'desc'
      const name = request.input('name')
      const created_at = request.input('created_at') ? moment(request.input('created_at')):null

      let data = await MasterShp.query()
        .if(name, async query => {
          await query.whereILike('name', `%${name}%`)
        })
        .if(created_at, async query => {
          await query.where('created_at', created_at)
        })
        .where('is_finish', 1)
        .select('id', 'name', 'category_infrastructure_id')
        .orderBy(order_by, order_direction)
        .paginate(page, limit)

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async getById ({request, response}:HttpContextContract) {
    try {
      const id = request.input('id')

      let data = await MasterShp.find(id)

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async input ({request, response}:HttpContextContract) {
    const newDataSchema = schema.create({
      id: schema.number([
        rules.required()
      ]),
      name: schema.string([
        rules.required()
      ]),
      category_infrastructure_id: schema.number([
        rules.required()
      ]),
      used_variable: schema.string([
        rules.required()
      ]),
      color: schema.string([
        rules.required()
      ])
    })

    try {
      await request.validate({
        schema: newDataSchema
      })

      let id = request.input('id')
      let name = request.input('name')
      let category_infrastructure_id = request.input('category_infrastructure_id')
      let used_variable = request.input('used_variable')
      let color = request.input('color')

      await Database.transaction(async trx => {

        let data = await MasterShp.findOrFail(id, {client: trx})

        data.name = name
        data.category_infrastructure_id = category_infrastructure_id
        data.used_variable = used_variable
        data.color = color
        data.is_finish = true

        await data.save()
      })

      return response.send({code: 200, message: 'success create master shp'})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }
}
