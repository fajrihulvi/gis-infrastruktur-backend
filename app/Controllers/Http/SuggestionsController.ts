import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Suggestion from 'App/Models/Suggestion'
import SuggestionFile from 'App/Models/SuggestionFile'

export default class SuggestionsController {
  async input({request, response}:HttpContextContract) {
    const newDataSchema = schema.create({
      phone_number: schema.string([
        rules.required()
      ]),
      suggestion: schema.string([
        rules.required()
      ])
    })

    try {
      await request.validate({
        schema: newDataSchema
      })

      let phone_number = request.input('phone_number')
      let suggestion = request.input('suggestion')
      let files = request.files('files', {extnames: ['jpg', 'png']})

      let id = await Suggestion.create({phone_number: phone_number, suggestion: suggestion}).then(data => {
          return data.id
        })

      if (files) {
        files.forEach(async (file, index) => {
          await file.moveToDisk('suggestion', {name: `${phone_number}(${index}).${file.extname}`})

          await SuggestionFile.create({suggestion_id: id, url: file.filePath})
        });
      }

      return response.send({code: 200, message: 'success create suggestion'})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async getList ({request, response}:HttpContextContract) {
    try {
      const page = request.input('page') != null ? parseInt(request.input('page')):1
      const limit = request.input('limit') != null ? parseInt(request.input('limit')):10
      const order_by = request.input('order_by') != null ? request.input('order_by'):'created_at'
      const order_direction = request.input('order_direction') != null ? request.input('order_direction'):'desc'
      const phone_number = request.input('phone_number')
      const status = request.input('status')
      const created_at = request.input('created_at')

      let data = await Suggestion.query()
        .if(phone_number, async query => {
          await query.where('phone_number', phone_number)
        })
        .if(status, async query => {
          await query.where('status', status)
        })
        .if(created_at, async query => {
          await query.where('created_at', created_at)
        })
        .orderBy(order_by, order_direction)
        .paginate(page, limit)

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async getById ({request, response}:HttpContextContract) {
    const newDataSchema = schema.create({
      id: schema.number([
        rules.required()
      ])
    })

    try {
      await request.validate({
        schema: newDataSchema
      })

      let id = request.input('id')

      let data = await Suggestion.query().where('id', id).preload('files').firstOrFail()

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async update ({request, response}:HttpContextContract) {
    const newDataSchema = schema.create({
      id: schema.number([
        rules.required()
      ]),
      status: schema.number([
        rules.required()
      ])
    })

    try {
      await request.validate({
        schema: newDataSchema
      })
      let id = request.input('id')
      let status = request.input('status')

      let data = await Suggestion.findOrFail(id)

      if (data) {
        data.status = status

        await data.save()
      }

      return response.send({code: 200, message: 'success update suggestion'})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }
}
