import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Database from '@ioc:Adonis/Lucid/Database';
import Profile from 'App/Models/Profile';
import User from "App/Models/User";

class UsersService {
    public static async index({ request }: HttpContextContract) {
        const { page, page_size } = request.qs()

        if (!page && !page_size) {
            const users = await Database.from('users').join('profiles', 'profiles.user_id', 'users.id')
            return users
        }
        const users = await Database.from('users').paginate(page, page_size)
        return ([...users])
    }


    public static async store(user_data, profile_data, { response }: HttpContextContract) {
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
        const user = await User.create(user_data)

        const profile = new Profile()
        profile.userId = user.id
        if (profile_data.picture) profile.picture = Attachment.fromFile(profile_data.picture)
        if (profile_data.biography) profile.biography = profile_data.biography
        await profile.save()

        return ([user, profile])
    }


    public static async show(ctx: HttpContextContract) {
        return await this.findUserById(ctx)
    }


    public static async update(user_data, profile_data, ctx: HttpContextContract) {
        const user = await this.findUserById(ctx)
        const profile = await Profile.findBy('user_id', user.id)

        if (user_data.username) {
            const username_exists = await User.findBy('username', user_data.username)
            if (username_exists) {
                ctx.response.status(400)
                throw new Error('Bad Request: Username already exists')
            }
        }

        await user.merge(user_data).save()
        if (profile) {
            if (profile_data.picture) profile.picture = Attachment.fromFile(profile_data.picture)
            if (profile_data.biography) profile.biography = profile_data.biography
            await profile.save()
        }

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
