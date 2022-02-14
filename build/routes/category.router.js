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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const router = express_1.default.Router();
const Category = new category_controller_1.default();
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Category.get();
    if ('status' in response && response.status) {
        res.json(response).status(response.status);
    }
    res.json(response).status(200);
}));
router.post('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Category.create(req.body);
    if ('status' in response && response.status) {
        return res.json(response).status(response.status);
    }
    return res.json(response).status(200);
}));
router.put('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Category.update(req.body);
    if ('status' in response && response.status) {
        return res.json(response).status(response.status);
    }
    return res.json(response).status(204);
}));
router.delete('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Category.delete(req.params.id);
    if ('status' in response && response.status) {
        return res.json(response).status(response.status);
    }
    res.json(response).status(204);
}));
exports.default = router;
