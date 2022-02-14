import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('categories', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.boolean('active').defaultTo('true');
    table.string('name', 1000).unique().notNullable();
    table.integer('parent_id').unsigned();
  });

  await knex.schema.alterTable('categories', (table: Knex.AlterTableBuilder) => {
    table.foreign('parent_id').references('categories.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('categories');
}
