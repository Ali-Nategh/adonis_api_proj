import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Task from 'App/Models/Task';
import User from 'App/Models/User';

class TaskService {
    public static async index({ response, request }: HttpContextContract) {
        const user = await User.findBy('id', request.params().user_id)
        if (!user) {
            response.status(404)
            throw new Error('Not Found: user not found')
        }

        const { page, page_size } = request.qs()
        if (page != null || page_size != null) {
            const tasks = await Database.from('tasks').paginate(page, page_size)
            return ([...tasks])
        }

        const { search } = request.qs()
        if (search) {
            const task_find = await Database.from('tasks').whereILike('title', `%${search}%`)
            return task_find
        }

        const { sort, sort_type } = request.qs()
        if (sort != null && sort_type != null) {
            if (sort === 'created_at') {
                if (sort_type === 'asc') {
                    return await Database.from('tasks').orderBy('created_at', 'asc')
                }
                if (sort_type === 'desc') {
                    return await Database.from('tasks').orderBy('created_at', 'desc')
                }
            }
            if (sort === 'name') {
                if (sort_type === 'asc') {
                    return await Database.from('tasks').orderBy('title', 'asc')
                }
                if (sort_type === 'desc') {
                    return await Database.from('tasks').orderBy('title', 'desc')
                }
            }
            response.status(400)
            return 'Bad Request: sort(created_at/name) or sort_type(asc/desc) wrong, please use these'
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
