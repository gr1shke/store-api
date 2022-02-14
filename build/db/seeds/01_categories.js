"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('categories').del();
        // Inserts seed entries
        yield knex('categories').insert([
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
    });
}
exports.seed = seed;
