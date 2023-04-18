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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoria = exports.getCategorias = void 0;
const database_1 = require("../database");
const getCategorias = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, database_1.connect)();
    const categorias = yield conn.query('SELECT * FROM categorias');
    return res.json(categorias[0]);
});
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCategoria } = req.params;
    const conn = yield (0, database_1.connect)();
    const categoria = yield conn.query('SELECT * FROM categorias WHERE id = ?', [idCategoria]);
    return res.json(categoria[0]);
});
exports.getCategoria = getCategoria;
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategoria = req.body;
    const conn = yield (0, database_1.connect)();
    yield conn.query('INSERT INTO categorias SET ?', [newCategoria]);
    return res.json({ newCategoria, message: 'Categoria creada' });
});
exports.createCategoria = createCategoria;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCategoria } = req.params;
    const updateCategoria = req.body;
    const conn = yield (0, database_1.connect)();
    yield conn.query('UPDATE categorias SET ? WHERE id = ?', [updateCategoria, idCategoria]);
    return res.json({ message: 'Categoria actualizada' });
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCategoria } = req.params;
    const conn = yield (0, database_1.connect)();
    yield conn.query('DELETE FROM categorias WHERE id = ?', [idCategoria]);
    return res.json({ message: 'Categoria eliminada' });
});
exports.deleteCategoria = deleteCategoria;
