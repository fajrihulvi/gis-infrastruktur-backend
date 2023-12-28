import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import axios from 'axios';
import FormData from 'form-data';
import Drive from '@ioc:Adonis/Core/Drive'
import Kecamatan from 'App/Models/Kecamatan';
import Kelurahan from 'App/Models/Kelurahan';
import Database from '@ioc:Adonis/Lucid/Database';

export default class UploadsController {
  async uploadShp({request, response}:HttpContextContract) {
    try {
      const file = request.file('file')

      if (file) {
        await file.move(Application.tmpPath('uploads'))

        const readableStream = await Drive.getStream(file.fileName)
        let form = new FormData()
        form.append('upload', readableStream)
        form.append('rfc7946', 'RFC7946')

        await axios.post('http://ogre.adc4gis.com/convert', form)
          .then(function (response) {
            response.data.features.forEach(async (raw) => {
              let data = raw.properties
              let kecamatan = data.WADMKC
              let kelurahan = data.WADMKL
              let area = data.AREA
              let perimeter = data.PERIMETER
              let hectare = data.HECTARES
              let x_axis = data.X_CENTR
              let y_axis = data.Y_CENTR
              let id = data.ID
              let code = data.KODE_WIL
              let population = data.Jlh_Pddk
              let wide = data.Luas_Wil
              let feature = JSON.stringify(raw)

              const existing_kec = await Kecamatan.query().where({name: kecamatan}).first()
              let id_kec = existing_kec != null ? existing_kec.id:null
              if (existing_kec == null) {
                let new_kec = await Kecamatan.create({name: kecamatan})
                id_kec = new_kec.id
              }

              const existing_kel = await Kelurahan.query().where({name: kelurahan, id_kecamatan: id_kec}).first()
              if (!existing_kel) {
                await Database.transaction(async (trx) => {
                  const transac_kel = new Kelurahan()

                  transac_kel.name = kelurahan
                  transac_kel.id_kecamatan = id_kec
                  transac_kel.area = area
                  transac_kel.perimeter = perimeter
                  transac_kel.hectares = hectare
                  transac_kel.x_axis = x_axis
                  transac_kel.y_axis = y_axis
                  transac_kel.code = code
                  transac_kel.population = population
                  transac_kel.wide = wide
                  transac_kel.feature = feature

                  transac_kel.useTransaction(trx)

                  await transac_kel.save()
                })
              }
            });
          })
          .catch(function (error) {
            console.log(error);

            return response.badRequest({code: 400, message: error.messages})
          })

          return response.send({code: 200, message: 'success upload data'})
      }
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }
}
