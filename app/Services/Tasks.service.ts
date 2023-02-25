import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Priorities from 'App/Enums/Priorities';
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

    public static async store({ request, response }: HttpContextContract) {
        const user_id = request.params().user_id

        const task = new Task();
        const data = {
            ...request.only(
                ['title', 'body', 'thumbnail']
            ),
            userId: user_id,
            priorityId: Priorities.LOW,
        }

        const user = await User.findBy('id', user_id)
        if (!user) {
            response.status(404)
            throw new Error('Not Found: user not found')
        }

        if (!data.title) {
            response.status(400)
            throw new Error('Bad Request: task title is required')
        }

        await task.merge(data).save()
        return task;
    }

    public static async show(ctx: HttpContextContract) {
        return await this.findTaskById(ctx)
    }

    public static async update(ctx: HttpContextContract) {
        const task = await this.findTaskById(ctx)

        const data = ctx.request.only(['title', 'body', 'thumbnail'])

        await task.merge(data).save()
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
