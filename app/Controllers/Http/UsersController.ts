import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/UsersService';


export default class UsersController {
  // GET users
  public async index(ctx: HttpContextContract) {
    return await UsersService.index(ctx)
  }


  // POST users
  public async store(ctx: HttpContextContract) {
    return await UsersService.store(ctx)
  }


  // GET user:id
  public async show(ctx: HttpContextContract) {
    return await UsersService.show(ctx)

  }


  // PATCH/PUT user:id
  public async update(ctx: HttpContextContract) {
    return await UsersService.update(ctx)
  }


  // DELETE user:id
  public async destroy(ctx: HttpContextContract) {
    return await UsersService.destroy(ctx)
  }
}
