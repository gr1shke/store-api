"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
class OfferModel {
    static getByCategory(categoryId) {
        return (0, database_1.default)('offers').select('*').where('category_id', categoryId).where('active', true);
    }
    static get() {
        return (0, database_1.default)('offers').select('*').orderBy('category_id', 'asc');
    }
    static getById(id) {
        return (0, database_1.default)('offers').select('*').where('id', id).first();
    }
    static getByName(name) {
        return (0, database_1.default)('offers').select('*').where('name', name).first();
    }
    static create(data) {
        return (0, database_1.default)('offers').insert(data).returning('id');
    }
    static updateById(id, data) {
        return (0, database_1.default)('offers').where('id', id).update(data, ['id']);
    }
    static deleteById(id) {
        return (0, database_1.default)('offers').where('id', id).del(['id']);
    }
}
exports.default = OfferModel;
