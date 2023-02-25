import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Roles from 'App/Enums/Roles';
import Profile from 'App/Models/Profile';

class UsersService {
    public static async index({ }: HttpContextContract) {
        const users = await User.all();
        return users
    }


    public static async store({ request, response }: HttpContextContract) {
        const user = new User();
        const user_data = {
            ...request.only(
                ['username', 'email', 'password', 'age', 'name', 'familyName']
            ),
            roleId: Roles.MEMBER
        }

        if (!user_data.email || !user_data.password || !user_data.username) {
            response.status(400)
            throw new Error('Bad Request: email, password and username are required')
        }

        const email_exists = await User.findBy('email', user_data.email)
        if (email_exists) {
            response.status(400)
            throw new Error('Bad Request: Email already exists')
        }
        const username_exists = await User.findBy('username', user_data.username)
        if (username_exists) {
            response.status(400)
            throw new Error('Bad Request: Username already exists')
        }
        await user.merge(user_data).save()


        const profile = new Profile()
        const profile_data = {
            ...request.only(['biography', 'picture']),
            userId: user.id,
        }
        await profile.merge(profile_data).save()

        return ([user, profile])
    }


    public static async show(ctx: HttpContextContract) {
        return await this.findUserById(ctx)
    }


    public static async update(ctx: HttpContextContract) {
        const user = await this.findUserById(ctx)
        const profile = await Profile.findBy('user_id', user.id)

        const user_data = ctx.request.only(['username', 'email', 'password', 'age', 'name', 'familyName'])
        const profile_data = ctx.request.only(['biography', 'picture'])

        const username_exists = await User.findBy('username', user_data.username)
        if (username_exists) {
            ctx.response.status(400)
            throw new Error('Bad Request: Username already exists')
        }
        await user.merge(user_data).save()
        profile && await profile.merge(profile_data).save()

        return ([user, profile])
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
