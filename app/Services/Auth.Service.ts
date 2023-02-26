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

        const user = await UsersService.store(user_data, profile_data, ctx)

        try {
            const token = await ctx.auth.use('api')
                .attempt(user_data.email, user_data.password, { expiresIn: '20s' })
            return (['Successfully Registered Account: ', user, token,])
        } catch {
            return ctx.response.unauthorized('Invalid credentials')
        }
    }

    public static async verify(ctx: HttpContextContract) {
        return ([`Email Successfully Verified:`, ctx.request.body])
    }

    public static async login({ request, response, auth }: HttpContextContract) {
        const user_data = request.only(['email', 'password'])
        if (!user_data.email || !user_data.password) {
            response.status(400)
            throw new Error('Bad Request: Email And Password Are Required')
        }

        try {
            const token = await auth.use('api')
                .attempt(user_data.email, user_data.password, { expiresIn: '2h' })
            return (['Successfully Logged In: ', user_data, token])
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    }

    public static async logout({ auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        const user = auth.use('api').user!
        await auth.use('api').revoke()

        return (['Successfully Logged Out:', user,])
    }
}


export default AuthService
