import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from './Users.Service'
import User from "App/Models/User";
import { schema, rules } from '@ioc:Adonis/Core/Validator'

class AuthService {

    public static async register(ctx: HttpContextContract) {
        const userSchema = schema.create({
            email: schema.string([rules.email(), rules.trim(), rules.maxLength(255)]),
            password: schema.string([rules.minLength(8), rules.maxLength(150)]),
            username: schema.string([rules.minLength(6), rules.maxLength(30)]),
            age: schema.number.optional(),
            name: schema.string.optional([rules.maxLength(15)]),
            familyName: schema.string.optional([rules.maxLength(15)]),
            rememberMeToken: schema.string.optional(),
        })
        const profileSchema = schema.create({
            biography: schema.string.optional(),
            picture: schema.string.optional(),
            // picture: schema.file.optional(),
        })

        const user_data = await ctx.request.validate({ schema: userSchema })
        const profile_data = await ctx.request.validate({ schema: profileSchema })

        await UsersService.store(user_data, profile_data, ctx)

        const login_user = await User.findBy('email', user_data.email)
        login_user && await ctx.auth.login(login_user)

        return ctx.response.redirect().toPath('/')
        return (['Successfully Registered Account: ',])
    }

    public static async verify(ctx: HttpContextContract) {
        return ([`Email Successfully Verified:`, ctx.request.body])
    }

    public static async login({ request, response, session, auth }: HttpContextContract) {
        const user_data = request.only(['email', 'password'])
        if (!user_data.email || !user_data.password) {
            response.status(400)
            throw new Error('Bad Request: Email And Password Are Required')
        }

        try {
            await auth.attempt(user_data.email, user_data.password)
        } catch (_error) {
            session.flash('errors', 'Email or Password is Incorrect')
            return response.redirect().back()
        }

        // return response.redirect().toPath('/')
        return (['Successfully Logged In: ',])
    }

    public static async logout({ response, auth }: HttpContextContract) {
        await auth.logout()
        // return response.redirect().toPath('/')
        return (['Successfully Logged Out: ',])
    }
}


export default AuthService
