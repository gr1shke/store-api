import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('offers', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.boolean('active').defaultTo('true');
    table.string('name', 1000).notNullable();
    table.decimal('price', 14, 2).notNullable().defaultTo(0);
    table.text('description');
    table.integer('category_id').unsigned();
  });

  await knex.schema.alterTable('offers', (table: Knex.AlterTableBuilder) => {
    table.foreign('category_id').references('categories.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('offers');
}
