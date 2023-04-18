"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProducto = exports.getProductos = void 0;
const productos_json_1 = __importDefault(require("../productos.json"));
const getProductos = () => productos_json_1.default;
exports.getProductos = getProductos;
const addProducto = () => null;
exports.addProducto = addProducto;
