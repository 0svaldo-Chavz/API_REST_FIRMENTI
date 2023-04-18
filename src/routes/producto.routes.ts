import express from "express";
import * as productoCtrl from "../controllers/producto.controller"
import { validateResult } from "../helpers/validate.helper";
import { validateCreateProduct } from "../validators/producto.validator";

const router = express.Router()

router.route('/')
  .get(productoCtrl.getProductos)
  .post(validateResult(validateCreateProduct()) ,productoCtrl.createProducto)

router.route('/:idProducto')
  .get(productoCtrl.getProducto)
  .put(validateResult(validateCreateProduct()) ,productoCtrl.updateProducto)
  .delete(productoCtrl.deleteProducto)


export default router