import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryInfrastructure from 'App/Models/CategoryInfrastructure';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import moment from 'moment';

export default class CategoryInfrastucturesController {
  async getAllCategory({request, response}:HttpContextContract) {
    try {
      let page = request.qs().page
      let limit = request.qs().limit
      let name = request.qs().name
      let type = request.qs().type

      let data

      if (page && limit) {
        data = await CategoryInfrastructure.query().if(name, (query) => {
            query.where('name', 'ilike', `%${name}%`)
          }).if(type, (query) => {
            query.where('category_type', type)
          }).paginate(page, limit)
      }else{
        data = await CategoryInfrastructure.query().if(name, (query) => {
            query.where('name', 'ilike', `%${name}%`)
          }).if(type, (query) => {
            query.where('category_type', type)
          })
      }

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async getById({request, response}:HttpContextContract) {
    const newDataSchema = schema.create({
      id: schema.number([
        rules.required()
      ])
    })

    try {
      await request.validate({
        schema: newDataSchema
      })

      let id = request.qs().id

      let data = await CategoryInfrastructure.query().where('id', id).first()

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async create({request, response}: HttpContextContract) {
    const newDataSchema = schema.create({
      name: schema.string([
        rules.required()
      ]),
      type: schema.number([
        rules.required()
      ])
    })

    try {
      await request.validate({
        schema: newDataSchema
      })

      let name = request.input('name')
      let type = request.input('type')

      await Database.transaction(async (trx) => {
        const data = new CategoryInfrastructure()

        data.name = name
        data.category_type = type

        data.useTransaction(trx)

        await data.save()
      })

      return response.send({code: 200, message: 'success create category infrastuctures'})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async update({request, response}: HttpContextContract) {
    const newDataSchema = schema.create({
      id: schema.number([
        rules.required()
      ]),
      name: schema.string([
        rules.required()
      ]),
      type: schema.number([
        rules.required()
      ])
    })

    const trx = await Database.transaction()

    try {
      await request.validate({
        schema: newDataSchema
      })

      let id = request.input('id')
      let name = request.input('name')
      let type = request.input('type')

      await CategoryInfrastructure.query({client: trx}).where('id', id).update({
        name: name,
        category_type: type,
        updated_at: moment()
      })

      await trx.commit()

      return response.send({code: 200, message: 'success update category infrastuctures'})
    } catch (error) {
      console.log(error);
      await trx.rollback()

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async delete({request, response}:HttpContextContract) {
    const newDataSchema = schema.create({
      id: schema.number([
        rules.required()
      ])
    })

    const trx = await Database.transaction()

    try {
      await request.validate({
        schema: newDataSchema
      })

      let id = request.input('id')

      await CategoryInfrastructure.query({client: trx}).where('id', id).delete()

      await trx.commit()

      return response.send({code: 200, message: 'success delete category infrastuctures'})
    } catch (error) {
      console.log(error);
      await trx.rollback()

      return response.badRequest({code: 500, message: error.messages})
    }
  }
}
