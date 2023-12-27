import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckJwt {
  public async handle({request, response, auth}: HttpContextContract, next: () => Promise<void>) {
    const jwt = request.header('Authorization')

    if (jwt) {
      const JWTValid = await auth.use("jwt").authenticate();

      if (JWTValid) {
        await next()
      }else{
        return response.unauthorized({code: 401, message: 'Unauthenticate.'})
      }
    }else{
      return response.forbidden({code: 403, message: 'Unauthorize'})
    }
  }
}
