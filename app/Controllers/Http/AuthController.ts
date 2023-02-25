import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/Auth.Service'

export default class AuthController {
    // POST /register
    public async register(ctx: HttpContextContract) {
        try {
            return AuthService.register(ctx)
        } catch (error) {
            console.log(error)
            return error.message
        }
    }

    // POST /login
    public async login(ctx: HttpContextContract) {
        try {
            return AuthService.login(ctx)
        } catch (error) {
            console.log(error)
            return error.message
        }
    }
}
