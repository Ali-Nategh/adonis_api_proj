import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles';
import User from 'App/Models/User';

export default class UsersController {
  // GET users
  public async index({ }: HttpContextContract) {
    const users = await User.all();
    return users
  }


  // POST users
  public async store({ request, response }: HttpContextContract) {
    const user = new User();
    const data = {
      ...request.only(
        ['username', 'email', 'password', 'age', 'name', 'familyName']
      ),
      roleId: Roles.MEMBER
    }

    if (!data.email || !data.password || !data.username) {
      response.status(400)
      return 'Bad Request: email, password and username are required'
    }


    await user.merge(data).save()
    return user;
  }


  // GET user:id
  public async show(ctx: HttpContextContract) {
    return await this.findUserById(ctx)
  }


  // PATCH/PUT user:id
  public async update(ctx: HttpContextContract) {
    const user: any = await this.findUserById(ctx)

    const data = ctx.request.only(['username', 'email', 'password', 'age', 'name', 'familyName'])

    // if any error ocurred => returned type is string
    if (typeof user === typeof "") return user
    return await user.merge(data).save()
  }


  // DELETE user:id
  public async destroy(ctx: HttpContextContract) {
    const user: any = await this.findUserById(ctx)

    // if any error ocurred => returned type is string
    if (typeof user === typeof "") return user
    return await user.delete()
  }

  private async findUserById({ request, response }: HttpContextContract) {
    const user_id = request.params().id
    if (!user_id) {
      response.status(400)
      return 'Bad Request: user id is required'
    }
    const user = await User.findBy('id', user_id)
    if (!user) {
      response.status(404)
      return 'Not Found: user not found'
    }
    return user
  }
}
