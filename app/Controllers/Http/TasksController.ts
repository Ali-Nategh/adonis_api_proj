import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
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
    const taskSchema = schema.create({
      title: schema.string([rules.maxLength(100)]),
      body: schema.string.optional(),
      thumbnail: schema.string.optional(),
      // thumbnail: schema.file.optional(),
    })

    const task_data = await ctx.request.validate({ schema: taskSchema })

    try {
      return await TaskService.store(task_data, ctx)
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
    const updateTaskSchema = schema.create({
      title: schema.string.optional([rules.maxLength(100)]),
      body: schema.string.optional(),
      thumbnail: schema.string.optional(),
      // thumbnail: schema.file.optional(),
    })

    const task_data = await ctx.request.validate({ schema: updateTaskSchema })

    try {
      return await TaskService.update(task_data, ctx)
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
