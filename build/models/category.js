"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
class CategoryModel {
    static getAllWithOffersCount() {
        const categoryIdRef = database_1.default.ref('categories.id');
        const offersCount = (0, database_1.default)('offers')
            .count('*')
            .where('category_id', categoryIdRef)
            .where('active', true)
            .as('offers_count');
        return (0, database_1.default)('categories').select('*', offersCount).where('active', true);
    }
    static getById(id) {
        return (0, database_1.default)('categories').select('*').where('id', id).first();
    }
    static getByName(name) {
        return (0, database_1.default)('categories').select('*').where('name', name).first();
    }
    static create(data) {
        return (0, database_1.default)('categories').insert(data).returning('id');
    }
    static updateById(id, data) {
        return (0, database_1.default)('categories').where('id', id).update(data, ['id']);
    }
    static deleteById(id) {
        return (0, database_1.default)('categories').where('id', id).del(['id']);
    }
}
exports.default = CategoryModel;
