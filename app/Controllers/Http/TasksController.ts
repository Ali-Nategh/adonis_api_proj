import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskService from 'App/Services/Tasks.service'

export default class TasksController {
  // GET /users/:user_id/tasks
  public async index(ctx: HttpContextContract) {
    try {
      return await TaskService.index(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // POST /users/:user_id/tasks
  public async store({ }: HttpContextContract) {

    return
  }

  // GET /users/:user_id/tasks/:id
  public async show({ }: HttpContextContract) {

    return
  }

  // PUT-PATCH /users/:user_id/tasks/:id
  public async update({ }: HttpContextContract) {

    return
  }

  // DELETE /users/:user_id/tasks/:id
  public async destroy({ }: HttpContextContract) {

    return
  }
}
