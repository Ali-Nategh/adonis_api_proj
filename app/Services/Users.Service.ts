import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Roles from 'App/Enums/Roles';

class UsersService {
    public static async index({ }: HttpContextContract) {
        const users = await User.all();
        return users
    }


    public static async store({ request, response }: HttpContextContract) {
        const user = new User();
        const data = {
            ...request.only(
                ['username', 'email', 'password', 'age', 'name', 'familyName']
            ),
            roleId: Roles.MEMBER
        }

        if (!data.email || !data.password || !data.username) {
            response.status(400)
            throw new Error('Bad Request: email, password and username are required')
        }

        const email_exists = await User.findBy('email', data.email)
        if (email_exists) {
            response.status(400)
            throw new Error('Bad Request: Email already exists')
        }
        const username_exists = await User.findBy('username', data.username)
        if (username_exists) {
            response.status(400)
            throw new Error('Bad Request: Username already exists')
        }

        await user.merge(data).save()
        return user;
    }


    public static async show(ctx: HttpContextContract) {
        return await this.findUserById(ctx)
    }


    public static async update(ctx: HttpContextContract) {
        const user = await this.findUserById(ctx)

        const data = ctx.request.only(['username', 'email', 'password', 'age', 'name', 'familyName'])

        return await user.merge(data).save()
    }


    public static async destroy(ctx: HttpContextContract) {
        const user = await this.findUserById(ctx)

        await user.delete()

        return user
    }


    private static async findUserById({ request, response }: HttpContextContract) {
        const user_id = request.params().id
        if (!user_id) {
            response.status(400)
            throw new Error('Bad Request: user id is required')
        }

        const user = await User.findBy('id', user_id)
        if (!user) {
            response.status(404)
            throw new Error('Not Found: user not found')
        }

        return user
    }
}

export default UsersService
