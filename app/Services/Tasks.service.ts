import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Priorities from 'App/Enums/Priorities';
// import Roles from 'App/Enums/Roles';
// import User from "App/Models/User";
import Task from 'App/Models/Task';

class TaskService {
    public static async index({ }: HttpContextContract) {
        const tasks = await Task.all();
        return tasks
    }

    public static async store({ }: HttpContextContract) {

        return
    }

    public static async show({ }: HttpContextContract) {

        return
    }

    public static async update({ }: HttpContextContract) {

        return
    }

    public static async destroy({ }: HttpContextContract) {

        return
    }
}

export default TaskService
