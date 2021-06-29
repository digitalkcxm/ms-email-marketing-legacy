
exports.up = knex => knex.raw(`
    ALTER TABLE code ADD COLUMN id_template_ms_broker INT;
    ALTER TABLE code ADD COLUMN id_template_broker VARCHAR(250);
    ALTER TABLE code ADD COLUMN thumbnail_url TEXT;
`)

exports.down = knex => { }
