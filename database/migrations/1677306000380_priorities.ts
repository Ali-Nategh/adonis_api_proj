import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Priorities from 'App/Enums/Priorities'

export default class extends BaseSchema {
  protected tableName = 'priorities'

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
      await db.table('priorities').insert([
        { id: Priorities.LOW, name: 'low' },
        { id: Priorities.MEDIUM, name: 'medium' },
        { id: Priorities.HIGH, name: 'high' },
      ])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
