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
const offer_1 = __importDefault(require("../models/offer"));
let OfferController = class OfferController {
    get(categoryId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (categoryId) {
                    const offersInCategory = yield offer_1.default.getByCategory(categoryId);
                    return { count: offersInCategory.length, data: offersInCategory };
                }
                return offer_1.default.get();
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
            const { active, name, price, description, category_id: categoryId } = data;
            if (!name)
                return { status: 400, error: 'Не указано название товара' };
            try {
                const category = yield offer_1.default.getByName(name);
                if (category && category.name)
                    return { status: 400, error: 'Товар с таким названием уже существует' };
                const createdCategoryId = (yield offer_1.default.create({
                    name: name,
                    active: typeof active !== 'undefined' ? active : true,
                    price: price ? price : 0,
                    description: description ? description : '',
                    category_id: categoryId ? categoryId : null,
                }))[0].id;
                return yield offer_1.default.getById(createdCategoryId);
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
                return { status: 400, error: 'Не указан id товара' };
            try {
                const category = yield offer_1.default.getById(id);
                if (category) {
                    const updateData = Object.assign({}, data);
                    delete updateData.id;
                    if (typeof updateData.category_id !== 'undefined') {
                        updateData.category_id = null;
                    }
                    yield offer_1.default.updateById(id, updateData);
                    return { message: 'Товар обновлен' };
                }
                return { status: 400, error: 'Товар не найден' };
            }
            catch (error) {
                return { status: 500, error: error };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield offer_1.default.getById(id);
                if (category) {
                    yield offer_1.default.deleteById(id);
                    return { message: 'Товар удален' };
                }
                return { status: 400, error: 'Товар не найден' };
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
            id: 20,
            name: 'Сетевое хранилище WD',
            price: 4000,
            description: 'Описание сетевого хранилища',
            category_id: 15,
        },
        {
            id: 21,
            name: 'Маршрутизатор D-Link',
            price: 2000,
            description: 'Описание маршрутизатора',
            category_id: 16,
        },
    ]),
    (0, tsoa_1.Get)('/'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "get", null);
__decorate([
    (0, tsoa_1.Example)({
        id: 20,
        name: 'Сетевое хранилище WD',
        price: 4000,
        description: 'Описание сетевого хранилища',
        category_id: 15,
    }),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)('/{id}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "delete", null);
OfferController = __decorate([
    (0, tsoa_1.Route)('/api/v1/offers'),
    (0, tsoa_1.Tags)('Offer')
], OfferController);
exports.default = OfferController;
