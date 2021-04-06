exports.up = knex => knex.schema.createTable('company', table => {
  table.increments()
  table.string('name').notNullable()
  table.string('token').notNullable()
  table.string('callback').notNullable()
  table.boolean('activated').defaultTo(true)
  table.timestamps(true, true)
  table.unique('name')
  table.unique('token')
})

exports.down = knex => knex.schema.dropTableIfExists('company')
