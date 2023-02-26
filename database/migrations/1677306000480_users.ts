import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('role_id').unsigned().references('id').inTable('roles')
        .notNullable().onDelete('CASCADE').defaultTo(Roles.MEMBER)

      table.string('email', 255).unique().notNullable()
      table.string('password', 180).notNullable()
      table.string('username', 30).unique().notNullable()

      table.integer('age').unique().unsigned().nullable()
      table.string('name', 15).nullable()
      table.string('family_name', 15).nullable()
      table.string('remember_me_token').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
