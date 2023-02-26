import BaseSchema from '@ioc:Adonis/Lucid/Schema'
// import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').unsigned().references('id').inTable('users')
        .notNullable().onDelete('CASCADE')

      table.string('biography').nullable()
      table.json('picture').nullable() // Profile Image

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
