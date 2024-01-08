import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kecamatan from 'App/Models/Kecamatan';
import Kelurahan from 'App/Models/Kelurahan';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class MapsController {
  async getMaps ({request, response}: HttpContextContract) {
    try {
      let kecamatan_id = request.qs().kecamatan_id
      let kelurahan_id = request.qs().kelurahan_id
      let data

      if (kecamatan_id) {
        if (kelurahan_id) {
          data = await Kecamatan.query().where({id: kecamatan_id}).preload('kelurahan', (postsQuery) => {
            postsQuery.where({id: kelurahan_id})
          }).first()
        } else {
          data = await Kecamatan.query().where({id: kecamatan_id}).preload('kelurahan').first()
        }
      } else {
        data = await Kecamatan.query().preload('kelurahan')
      }

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async getListKecamatan ({response}: HttpContextContract) {
    try {
      // let name = request.qs().name
      let data

      // if (name) {
      //   data = await Kecamatan.query().where({name: name})
      // } else {
        data = await Kecamatan.query().select('id', 'name')
      // }

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }

  async getListKelurahan ({request, response}: HttpContextContract) {
    const newUserSchema = schema.create({
      kecamatan_id: schema.number()
    })

    try {
      await request.validate({
        schema: newUserSchema
      })

      let kecamatan_id = request.qs().kecamatan_id
      // let name = request.qs().name

      let data = await Kelurahan.query().select('id', 'name').where({id_kecamatan: kecamatan_id})

      return response.send({code: 200, data: data})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 500, message: error.messages})
    }
  }
}
