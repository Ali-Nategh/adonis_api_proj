import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import UsersService from 'App/Services/Users.Service';


const profileSchema = schema.create({
  biography: schema.string.optional(),
  picture: schema.file.optional(),
})


export default class UsersController {

  // GET /users
  public async index(ctx: HttpContextContract) {
    try {
      return await UsersService.index(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // POST /users
  public async store(ctx: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string([rules.email(), rules.trim(), rules.maxLength(255)]),
      password: schema.string([rules.minLength(8), rules.maxLength(150)]),
      username: schema.string([rules.minLength(6), rules.maxLength(30)]),
      age: schema.number.optional(),
      name: schema.string.optional([rules.maxLength(15)]),
      familyName: schema.string.optional([rules.maxLength(15)]),
      rememberMeToken: schema.string.optional(),
    })

    const user_data = await ctx.request.validate({ schema: userSchema })
    const profile_data = await ctx.request.validate({ schema: profileSchema })

    try {
      return await UsersService.store(user_data, profile_data, ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // GET /users:id
  public async show(ctx: HttpContextContract) {
    try {
      return await UsersService.show(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // PATCH-PUT /users:id
  public async update(ctx: HttpContextContract) {
    const updateUserSchema = schema.create({
      email: schema.string.optional([rules.email(), rules.trim(), rules.maxLength(255)]),
      password: schema.string.optional([rules.minLength(8), rules.maxLength(150)]),
      username: schema.string.optional([rules.minLength(6), rules.maxLength(30)]),
      age: schema.number.optional(),
      name: schema.string.optional([rules.maxLength(15)]),
      familyName: schema.string.optional([rules.maxLength(15)]),
      rememberMeToken: schema.string.optional(),
    })

    const user_data = await ctx.request.validate({ schema: updateUserSchema })
    const profile_data = await ctx.request.validate({ schema: profileSchema })

    try {
      return await UsersService.update(user_data, profile_data, ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }

  // DELETE /users:id
  public async destroy(ctx: HttpContextContract) {
    try {
      return await UsersService.destroy(ctx)
    } catch (error) {
      console.log(error)
      return error.message
    }
  }
}
