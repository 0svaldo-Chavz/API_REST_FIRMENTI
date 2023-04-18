import { Router } from 'express'
import * as categoriaCtrl from '../controllers/categoria.controller'
import { validateResult } from '../helpers/validate.helper'
import { validateCreateCategory, checkDeleteCategory } from '../validators/categoria.validator'

const router = Router()



router.route('/')
  .get(categoriaCtrl.getCategorias)
  .post(validateResult(validateCreateCategory()),categoriaCtrl.createCategoria)

router.route('/:idCategoria')
  .get(categoriaCtrl.getCategoria)
  .put(categoriaCtrl.updateCategoria)
  .delete(validateResult(checkDeleteCategory()), categoriaCtrl.deleteCategoria)

router.route('/:idCategoria/productos')
  .get(categoriaCtrl.getProductosByCategoria)
  

export default router