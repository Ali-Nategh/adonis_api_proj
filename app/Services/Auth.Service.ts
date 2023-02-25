import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from './Users.Service'
import User from "App/Models/User";
// import Roles from 'App/Enums/Roles';

class AuthService {

    public static async register(ctx: HttpContextContract) {
        const user = await UsersService.store(ctx)
        return `Account Successfully Registered: \n ${JSON.stringify(user)}`
    }

    public static async verify(ctx: HttpContextContract) {
        return `Email Successfully Verified:`
    }

    public static async login({ request, response }: HttpContextContract) {
        const data = request.only(['email', 'password'])
        if (!data.email || !data.password) {
            response.status(400)
            throw new Error('Bad Request: Email And Password Are Required')
        }

        const user = await User.findBy('email', data.email)
        if (!user) {
            response.status(400)
            throw new Error('Bad Request: Wrong Email Or Password')
        }

        if (user.password !== data.password) {
            response.status(400)
            throw new Error('Bad Request: Wrong Email Or Password')
        }

        return 'Successfully Logged In'
    }
}


export default AuthService
