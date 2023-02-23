import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public static register(ctx: HttpContextContract) {
        return ctx.request.body
    }

    public static login(ctx: HttpContextContract) {
        return ctx.request.body
    }
}
