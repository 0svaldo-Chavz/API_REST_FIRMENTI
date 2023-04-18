import { Request, Response } from "express";
import { Producto } from "../models/producto.model";
import { Product } from "../interfaces/producto";

export const getProductos = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const productos = await Producto.findAll()
    return res.json(productos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'No se han podido obtener los productos'})
  }
}

export const getProducto = async (req: Request, res: Response): Promise<Response> => {
  const {idProducto} =req.params 
  try {
    const producto = await Producto.findByPk(idProducto)
    return res.json(producto)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido obtener el producto con id: ${idProducto}`})
  }
}

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, precio, descripcion, idCategoria } : Product = req.body
  try {
    const newProducto = await Producto.create({
      nombre,
      precio,
      descripcion,
      idCategoria
    })
    return res.status(201).json({newProducto, message: 'Producto creado'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido crear el producto de nombre ${nombre}`})
  }
}

export const updateProducto = async (req: Request, res: Response) => {
  const { idProducto } = req.params 
  const { nombre, precio, descripcion} : Product = req.body
  try {
    const producto = await Producto.findByPk(idProducto)
    await producto?.update({
      nombre: nombre,
      precio: precio,
      descripcion: descripcion
    })
    await producto?.save() 
    return res.status(203).json({producto, message:'Producto actualizado'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido actualizar el producto con id: ${idProducto}`})
  }
}

export const deleteProducto = async (req: Request, res: Response) => {
  const {idProducto} =req.params 
  try {
    const producto = await Producto.destroy({
      where: {
        id: idProducto,
      },
    })
    return res.status(204).json({producto, message:`El producto con id ${idProducto} ha sido eliminado`})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido eliminar el producto con id: ${idProducto}`})
  }
}