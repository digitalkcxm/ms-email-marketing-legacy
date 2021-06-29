
exports.up = knex => knex.raw('ALTER TABLE company ADD COLUMN token_broker VARCHAR(60)')

exports.down = knex => { }
