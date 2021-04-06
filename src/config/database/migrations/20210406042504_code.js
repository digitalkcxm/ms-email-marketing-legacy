exports.up = knex => knex.schema.createTable('code', table => {
  table.increments()
  table.integer('id_company').notNullable().unsigned()
  table.string('name').notNullable()
  table.text('code').notNullable()
  table.boolean('activated').defaultTo(true)
  table.timestamps(true, true)
  table.foreign('id_company').references('company.id')
  table.unique('name')
})

exports.down = knex => knex.schema.dropTableIfExists('code')
