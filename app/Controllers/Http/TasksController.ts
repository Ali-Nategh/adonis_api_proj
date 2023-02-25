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
  public async store(ctx: HttpContextContract) {
    try {
      return await TaskService.store(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
    return
  }

  // GET /users/:user_id/tasks/:id
  public async show(ctx: HttpContextContract) {
    try {
      return await TaskService.show(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
    return
  }

  // PUT-PATCH /users/:user_id/tasks/:id
  public async update(ctx: HttpContextContract) {
    try {
      return await TaskService.update(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
    return
  }

  // DELETE /users/:user_id/tasks/:id
  public async destroy(ctx: HttpContextContract) {
    try {
      return await TaskService.destroy(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
    return
  }
}
