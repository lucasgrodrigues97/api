import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('movies', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').index();
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.text('director').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('movies');
}
