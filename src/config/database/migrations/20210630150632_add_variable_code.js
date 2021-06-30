
exports.up = knex => knex.raw(`
    ALTER TABLE code ADD COLUMN variable JSON;
`)

exports.down = knex => { }
