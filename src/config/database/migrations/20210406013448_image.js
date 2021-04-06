exports.up = knex => knex.schema.createTable('images', table => {
  table.increments()
  table.integer('id_company').notNullable().unsigned()
  table.string('name').notNullable()
  table.string('url', 500).notNullable()
  table.boolean('activated').defaultTo(true)
  table.timestamps(true, true)
  table.foreign('id_company').references('company.id')
})

exports.down = knex => knex.schema.dropTableIfExists('images')
