import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('categories').del();

  // Inserts seed entries
  await knex('categories').insert([
    { name: 'Компьютеры' },
    { name: 'Бытовая техника' },
    { name: 'Компьютеры, ноутбуки и ПО', parent_id: 1 },
    { name: 'Комплектующие для ПК', parent_id: 1 },
    { name: 'Периферия и аксессуары', parent_id: 1 },
    { name: 'Техника для кухни', parent_id: 2 },
    { active: false, name: 'Техника для дома', parent_id: 2 },
    { name: 'Красота и здоровье', parent_id: 2 },
    { name: 'Персональные компьютеры', parent_id: 3 },
    { name: 'Ноутбуки', parent_id: 3 },
    { name: 'Процессоры', parent_id: 4 },
    { name: 'Материнские платы', parent_id: 4 },
    { name: 'Мониторы', parent_id: 5 },
    { active: false, name: 'Клавиатуры', parent_id: 5 },
    { name: 'Холодильное оборудование', parent_id: 6 },
    { name: 'Встраиваемая техника', parent_id: 6 },
    { name: 'Стирка и сушка', parent_id: 7 },
    { name: 'Уборка', parent_id: 7 },
    { name: 'Укладка и сушка волос', parent_id: 8 },
    { name: 'Стрижка волос', parent_id: 8 },
  ]);
}
