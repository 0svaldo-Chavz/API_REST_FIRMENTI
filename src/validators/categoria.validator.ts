import { check, param } from 'express-validator';
import { Categoria } from "../models/categoria.model"
import { Producto } from '../models/producto.model';


export const validateCreateCategory = () => {
  return [
    check('nombre')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Campo de nombre faltante')
      .isString()
      .withMessage('El campo de nombre debe ser una cadena de texto')
      .matches(/^[a-zA-Z\s\p{P}]+$/)
      .withMessage('El campo "nombre" solo debe contener letras')
      .custom(async value => await checkCategory(value)),
    check('descripcion')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Es necesario redactar una descripcion')
      .isLength({ min: 10, max: 200 })
      .withMessage('Ingrese una descripcion válida de al menos 10 caractéres')
  ]
}

export const checkDeleteCategory = () => {
  return [
    param('idCategoria')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('ID de categoria no valido')
      .custom(async value => await checkCategorieProducts(value))
  ]
}


const checkCategorieProducts = async (value: number) => {
  const productos = await Producto.findAll({ where: { idCategoria: value } })
  
  if (!productos.length) {
    return Promise.resolve('OK')
  } else {
    return Promise.reject('No se puede eliminar la categoria. Aun cuenta con productos relacionados.  ')
  }
}

const checkCategory = async (value: string): Promise< string > => {
  const categoria = await Categoria.findOne({ where: { nombre: value } })
  if (categoria) {
    return Promise.reject('Ya existe una categoria con ese nombre')
  } else {
    return Promise.resolve('OK')
  }
}
