import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/Users.Service';


export default class UsersController {
  // GET /users
  public async index(ctx: HttpContextContract) {
    try {
      return await UsersService.index(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // POST /users
  public async store(ctx: HttpContextContract) {
    try {
      return await UsersService.store(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // GET /users:id
  public async show(ctx: HttpContextContract) {
    try {
      return await UsersService.show(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // PATCH-PUT /users:id
  public async update(ctx: HttpContextContract) {
    try {
      return await UsersService.update(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // DELETE /users:id
  public async destroy(ctx: HttpContextContract) {
    try {
      return await UsersService.destroy(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }
}
