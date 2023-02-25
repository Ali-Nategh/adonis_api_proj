import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles';
import User from 'App/Models/User';

export default class UsersController {
  public async index({ }: HttpContextContract) {
    const user = new User();

    return
  }

  public async store({ request, response }: HttpContextContract) {
    const user = new User();
    let data = {
      ...request.only(['username', 'email', 'password', 'age', 'name', 'familyName']),
      roleId: Roles.MEMBER
    }

    if (!data.email || !data.password || !data.username) {
      response.status(400)
      return 'Bad Request: email, password and username are required'
    }


    await user.merge(data).save()
    return user;
  }

  public async show({ }: HttpContextContract) {

    return
  }

  public async update({ }: HttpContextContract) {

    return
  }

  public async destroy({ }: HttpContextContract) {

    return
  }
}
