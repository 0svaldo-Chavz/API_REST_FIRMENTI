import { Request, Response } from "express";
//import { connect } from "../database";
import { Categoria } from "../models/categoria.model";
import { Producto } from "../models/producto.model";
import { Category } from '../interfaces/categoria';


export const getCategorias = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const categorias = await Categoria.findAll()
    return res.json(categorias)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'No se han podido obtener las categorias'})
  }
}

export const getCategoria = async (req: Request, res: Response): Promise<Response> => {
  const {idCategoria} =req.params 
  try {
    const categoria = await Categoria.findByPk(idCategoria)
    return res.json(categoria)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido obtener la categoria con id: ${idCategoria}`})
  }
}

export const getProductosByCategoria = async (req: Request, res: Response): Promise<Response> => {
  const {idCategoria} = req.params
  try {
    const productos = await Producto.findAll({
      where: { idCategoria: idCategoria}
    })
    return res.status(200).json(productos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se han podido obtener los productos de la categoria con id: ${idCategoria}`})
  }
}

export const createCategoria = async (req: Request, res: Response) => {
  const { nombre, descripcion } : Category = req.body
  try {
    const newCategoria = await Categoria.create({
      nombre,
      descripcion
    })
    return res.status(201).json({newCategoria, message: 'Categoria creada'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido crear la categoria de nombre ${name}`})
  }
}

export const updateCategoria = async (req: Request, res: Response) => {
  const { idCategoria } = req.params 
  const { nombre, descripcion} : Category = req.body
  try {
    const categoria = await Categoria.findByPk(idCategoria)
    await categoria?.update({
      nombre: nombre,
      descripcion: descripcion
    })
    await categoria?.save() 
    return res.status(203).json({categoria, message:'Categoria actualizada'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido actualizar la categoria con id: ${idCategoria}`})
  }
}

export const deleteCategoria = async (req: Request, res: Response) => {
  const {idCategoria} =req.params 
  try {
    const productos = await Producto.findAll({
      where: { idCategoria: idCategoria}
    })
    console.log(productos)
    if (productos.length === 0) {
      const categoria = await Categoria.destroy({
        where: {
          id: idCategoria,
        },
      })
      return res.status(204).json({categoria, message:`La categoria con id ${idCategoria} ha sido eliminada`})
    }else{
      return res.status(404).json({message: 'La  categoria tiene productos asociados. No se ha podido eliminar.'})  
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: `No se ha podido eliminar la categoria con id: ${idCategoria}`})
  }
}