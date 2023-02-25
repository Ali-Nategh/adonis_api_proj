import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 50).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
    // defer execution of callback until migrations have run
    this.defer(async (db) => {
      // populate Roles in the database
      await db.table('roles').insert([
        { id: Roles.MEMBER, name: 'member' },
        { id: Roles.PROMEMBER, name: 'promember' },
        { id: Roles.MODERATOR, name: 'moderator' },
        { id: Roles.ADMIN, name: 'admin' },
      ])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
