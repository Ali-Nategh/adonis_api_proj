import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';
import User from 'App/Models/User';

class TaskService {
    public static async index({ response, request }: HttpContextContract) {
        const user = await User.findBy('id', request.params().user_id)
        if (!user) {
            response.status(404)
            throw new Error('Not Found: user not found')
        }

        const tasks = await Task.all();
        return tasks
    }

    public static async store(task_data, { request, response }: HttpContextContract) {
        const user_id = request.params().user_id

        const user = await User.findBy('id', user_id)
        if (!user) {
            response.status(404)
            throw new Error('Not Found: user not found')
        }
        task_data.userId = user_id

        const task = new Task();
        await task.merge(task_data).save()

        return task;
    }

    public static async show(ctx: HttpContextContract) {
        return await this.findTaskById(ctx)
    }

    public static async update(task_data, ctx: HttpContextContract) {
        const task = await this.findTaskById(ctx)

        await task.merge(task_data).save()

        return task
    }

    public static async destroy(ctx: HttpContextContract) {
        const task = await this.findTaskById(ctx)

        await task.delete()

        return task
    }

    private static async findTaskById({ request, response }: HttpContextContract) {
        const task_id = request.params().id
        if (!task_id) {
            response.status(400)
            throw new Error('Bad Request: task id is required')
        }

        const user_id = request.params().user_id
        if (!user_id) {
            response.status(400)
            throw new Error('Bad Request: task id is required')
        }

        const user = await User.findBy('id', user_id)
        if (!user) {
            response.status(404)
            throw new Error('Not Found: user not found')
        }

        const task = await Task.findBy('id', task_id)
        if (!task) {
            response.status(404)
            throw new Error('Not Found: task not found')
        }

        return task
    }
}

export default TaskService
