"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const category_1 = __importDefault(require("../models/category"));
let CategoryController = class CategoryController {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = [];
                let rows = yield category_1.default.getAllWithOffersCount();
                Object.keys(rows).forEach((category) => {
                    // @ts-ignore
                    rows[category]['offers_count'] = parseInt(rows[category]['offers_count']);
                });
                const countOffers = (id, rows, recursive = false) => {
                    let count = 0;
                    const childCategories = rows.filter((category) => {
                        return category.parent_id == id;
                    });
                    childCategories.map((category) => {
                        count += countOffers(category.id, rows, true);
                    });
                    const currentCategory = rows.find((category) => {
                        return category.id === id;
                    });
                    if (recursive || childCategories.length > 0) {
                        count += currentCategory.offers_count ? currentCategory.offers_count : 0;
                    }
                    return count;
                };
                rows.map((category) => {
                    let currentCategory = Object.assign({}, category);
                    if (currentCategory.offers_count)
                        currentCategory.offers_count += countOffers(category.id, rows);
                    result.push(currentCategory);
                });
                return result;
            }
            catch (error) {
                return { status: 500, error: error };
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                return { status: 400, error: 'Пустое тело запроса' };
            const { active, name, parent_id: parentId } = data;
            if (!name)
                return { status: 400, error: 'Не указано название категории' };
            try {
                const category = yield category_1.default.getByName(name);
                if (category && category.name)
                    return { status: 400, error: 'Категория с таким названием уже существует' };
                const createdCategoryId = (yield category_1.default.create({
                    name: name,
                    active: typeof active !== 'undefined' ? active : true,
                    parent_id: parentId ? parentId : null,
                }))[0].id;
                return yield category_1.default.getById(createdCategoryId);
            }
            catch (error) {
                return { status: 500, error: error };
            }
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                return { status: 400, error: 'Пустое тело запроса' };
            const { id } = data;
            if (!id)
                return { status: 400, error: 'Не указан id категории' };
            try {
                const category = yield category_1.default.getById(id);
                if (category) {
                    const updateData = Object.assign({}, data);
                    delete updateData.id;
                    yield category_1.default.updateById(id, updateData);
                    return { message: 'Категория обновлена' };
                }
                return { status: 400, error: 'Категория не найдена' };
            }
            catch (error) {
                return { status: 500, error: error };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.default.getById(id);
                if (category) {
                    yield category_1.default.deleteById(id);
                    return { message: 'Категория удалена' };
                }
                return { status: 400, error: 'Категория не найдена' };
            }
            catch (error) {
                return { status: 500, error: error };
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Example)([
        {
            id: 15,
            name: 'Сетевое оборудование',
            parent_id: 3,
            offers_count: 4,
        },
        {
            id: 16,
            name: 'Маршрутизаторы',
            parent_id: 15,
            offers_count: 2,
        },
        {
            id: 17,
            name: 'Сетевые хранилища',
            parent_id: 15,
            offers_count: 2,
        },
    ]),
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "get", null);
__decorate([
    (0, tsoa_1.Example)({
        id: 15,
        active: false,
        name: 'Сетевое оборудование',
        parent_id: 3,
    }),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('/{id}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = __decorate([
    (0, tsoa_1.Route)('/api/v1/categories'),
    (0, tsoa_1.Tags)('Category')
], CategoryController);
exports.default = CategoryController;
