import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async login({auth, request, response}: HttpContextContract) {
    const newUserSchema = schema.create({
      email: schema.string([
        rules.email()
      ]),
      password: schema.string()
    })

    try {
      await request.validate({
        schema: newUserSchema
      })

      const email = request.input('email')
      const password = request.input('password')

      const user = await User
        .query()
        .where('email', email)
        .preload('role')
        .preload('dinas')
        .firstOrFail()

      if (!user) {
        return response.badRequest({code: 400, message: 'user not found!'})
      }

      // Verify password
      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized({code: 401, message: 'Invalid credentials'})
      }

      // Generate token
      const token = await auth.use('jwt').generate(user)

      return response.send({code: 200, data: user, token: token})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }

  public async getList({request, response}: HttpContextContract) {
    try {
      const page = request.input('page') != null ? parseInt(request.input('page')):1
      const limit = request.input('limit') != null ? parseInt(request.input('limit')):10
      const order_by = request.input('order_by') != null ? request.input('order_by'):'id'
      const order_direction = request.input('order_direction') != null ? request.input('order_direction'):'desc'
      const name = request.input('name')
      const dinas_id = request.input('dinas_id')
      const role_id = request.input('role_id')

      // param initiation (object)
      let param:{[k: string]: any} = {}

      if (dinas_id) {
        param.dinas_id = dinas_id
      }
      if (role_id) {
        param.role_id = role_id
      }

      let user
      if (name) {
        user = await User.query().preload('role').preload('dinas').where('role_id', '!=', 1).where(param).whereILike('name', '%'+name+'%').orderBy(order_by, order_direction).paginate(page, limit)
      }else{
        user = await User.query().preload('role').preload('dinas').where('role_id', '!=', 1).where(param).orderBy(order_by, order_direction).paginate(page, limit)
      }

      return response.send({code: 200, data: user})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }

  public async storeAdmin({request, response}: HttpContextContract) {
    const newUserSchema = schema.create({
      email: schema.string([
        rules.email()
      ]),
      password: schema.string(),
      created_by: schema.number(),
      updated_by: schema.number(),
      name: schema.string(),
      phone: schema.string([
        rules.minLength(10),
        rules.maxLength(13)
      ]),
      department_id: schema.number(),
      nip: schema.string([
        rules.minLength(10)
      ])
    })

    try {
      await request.validate({
        schema: newUserSchema
      })

      const name = request.input('name')
      const password = request.input('password')
      const email = request.input('email')
      const phone = request.input('phone')
      const dinas_id = request.input('dinas_id')
      const nip = request.input('nip')
      const created_by = request.input('created_by')
      const updated_by = request.input('updated_by')

      const user = await User
        .query()
        .where('id', created_by)
        .where('role_id', 1)
        .firstOrFail()

      if (!user) {
        return response.unauthorized({code: 401, message: 'creator are not super admin!'})
      }

      // hash password
      const hashed_password = await Hash.make(password)

      await Database.transaction(async (trx) => {
        const user = new User()

        user.name = name
        user.password = hashed_password
        user.email = email
        user.phone = phone
        user.dinas_id = dinas_id
        user.role_id = 2
        user.nip = nip
        user.created_by = created_by
        user.updated_by = updated_by

        user.useTransaction(trx)

        await user.save()
      })

      return response.send({code: 200, message: 'success create admin'})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }

  public async updateUserAdmin({request, response}: HttpContextContract) {
    const newUserSchema = schema.create({
      id: schema.number(),
      email: schema.string([
        rules.email()
      ]),
      updated_by: schema.number(),
      name: schema.string(),
      phone: schema.string([
        rules.minLength(10),
        rules.maxLength(13)
      ]),
      department_id: schema.number(),
      nip: schema.string([
        rules.minLength(10)
      ])
    })

    try {
      await request.validate({
        schema: newUserSchema
      })

      const id = request.input('id')
      const name = request.input('name')
      const email = request.input('email')
      const phone = request.input('phone')
      const dinas_id = request.input('dinas_id')
      const nip = request.input('nip')
      const updated_by = request.input('updated_by')

      if (id != updated_by) {
        const user = await User
          .query()
          .where('id', updated_by)
          .where('role_id', 1)
          .firstOrFail()

        if (!user) {
          return response.unauthorized({code: 401, message: 'you are not super admin!'})
        }
      }

      const users = await User.findOrFail(id)

      users.name = name
      users.email = email
      users.phone = phone
      users.dinas_id = dinas_id
      users.nip = nip
      users.updated_by = updated_by

      await users.save()

      return response.send({code: 200, message: 'success update data admin'})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }

  public async deleteAdmin ({request, response}: HttpContextContract) {
    const newUserSchema = schema.create({
      id: schema.number(),
      updated_by: schema.number()
    })

    try {
      await request.validate({
        schema: newUserSchema
      })

      const id = request.input('id')
      const updated_by = request.input('updated_by')

      const user = await User
        .query()
        .where('id', updated_by)
        .where('role_id', 1)
        .firstOrFail()

      if (!user) {
        return response.unauthorized({code: 401, message: 'you are not super admin!'})
      }

      await (await User.findOrFail(id)).delete()

      return response.send({code: 200, message: 'success delete data admin'})
    } catch (error) {
      console.log(error);

      return response.badRequest({code: 400, message: error.messages})
    }
  }
}
