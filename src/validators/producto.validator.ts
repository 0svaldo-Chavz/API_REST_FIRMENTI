import { check, param} from "express-validator"
import { Producto } from '../models/producto.model';



export const validateCreateProduct = () => {
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
      .custom(async value => await checkProduct(value)),
    check('precio')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Campo de precio faltante')
      .isNumeric()
      .withMessage('El campo de precio debe ser un valor numerico'),
    check('idCategoria')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Es necesario asiganrle una categoria al producto'),
    check('descripcion')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Es necesario redactar una descripcion')
      .isLength({ min: 10, max: 200 })
      .withMessage('Ingrese una descripcion válida de al menos 10 caractéres')
  ]
}

export const validateUpdateProduct = () => {
  return [
    check('nombre')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Campo de nombre faltante')
      .isString()
      .withMessage('El campo de nombre debe ser una cadena de texto')
      .matches(/^[a-zA-Z\s\p{P}]+$/)
      .withMessage('El campo "nombre" solo debe contener letras'),
    check('precio')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Campo de precio faltante')
      .isNumeric()
      .withMessage('El campo de precio debe ser un valor numerico'),
    check('idCategoria')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Es necesario asiganrle una categoria al producto'),
    check('descripcion')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Es necesario redactar una descripcion')
      .isLength({ min: 10, max: 200 })
      .withMessage('Ingrese una descripcion válida de al menos 10 caractéres'),
    param('idProducto')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('El producto no tiene un id valido')
      
  ]
}



const checkProduct = async (value: string): Promise< string > => {
  const producto = await Producto.findOne({ where: { nombre: value } })
  if (producto) {
    return Promise.reject('Ya existe un producto con ese nombre')
  } else {
    return Promise.resolve('OK')
  }
}

/* const checkUpdateProduct = async (value: number, nombre: string): Promise<string> => {
  try {
    const producto : Promise< typeof Producto> = await Producto.findByPk(value)
    if (producto !== null && nombre === producto.nombre && value !== producto.id) {
      return Promise.reject('Ya existe un usuario con ese nombre') 
    } else {
      return Promise.resolve('OK')
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
} */