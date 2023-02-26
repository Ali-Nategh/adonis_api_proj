import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Priorities from 'App/Enums/Priorities'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').unsigned().references('id').inTable('users')
        .notNullable().onDelete('CASCADE')

      table.integer('priority_id').unsigned().references('id').inTable('priorities')
        .notNullable().defaultTo(Priorities.LOW)

      table.string('title', 100).notNullable()
      table.text('body').nullable()
      table.json('thumbnail').nullable() // Task Image

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
