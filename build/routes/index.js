"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_router_1 = __importDefault(require("./category.router"));
const offer_routes_1 = __importDefault(require("./offer.routes"));
const rootRouter = (0, express_1.Router)();
rootRouter.use(category_router_1.default);
rootRouter.use(offer_routes_1.default);
exports.default = rootRouter;
