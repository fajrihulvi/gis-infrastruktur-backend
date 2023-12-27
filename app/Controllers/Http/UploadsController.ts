import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import * as gdal from 'gdal-async'

export default class UploadsController {
  async uploadShp({request, response}:HttpContextContract) {
    try {
      const files = request.files('file')

      if (files) {
        for (let file of files) {
          await file.move(Application.tmpPath('uploads'))
        }
        const ds1: gdal.Dataset = gdal.open(Application.tmpPath('uploads'))
        // const ds2: Promise<gdal.Dataset> = gdal.openAsync(path)
        console.log(ds1);
        // console.log(ds2);
      }
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }
}
