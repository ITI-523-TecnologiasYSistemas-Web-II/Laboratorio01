import { Producto } from './../entity/Productos';
import { Request, Response } from "express";
import { Repository, getRepository } from "typeorm";
import { AppDataSource } from '../data-source';

class ProductosController {

    // Obtener todos los productos
    static getAll = async (req: Request, resp: Response) => {
        try {
            const productoRepository: Repository<Producto> = AppDataSource.getRepository(Producto);
            const productos = await productoRepository.find();
            resp.json(productos);
        } catch (error) {
            return resp.status(500).json({ message: "Error al obtener productos", error: (error as Error).message });
        }
    }

    static obteinById = async (req: Request, resp: Response) => {
        const { cedula } = req.params;
        try {
            const productoRepository: Repository<Producto> = AppDataSource.getRepository(Producto);
            const producto = await productoRepository.findOne({ where: { cedula: parseInt(cedula) } });

            if (!producto) {
                return resp.status(404).json({ message: "No se encontró el producto" });
            }

            resp.json(producto);
        } catch (error) {
            return resp.status(500).json({ message: "Error al obtener el producto por su cédula", error: (error as Error).message });
        }
    };

    // Crear nuevo producto
    static create = async (req: Request, resp: Response) => {
        try {
            const productoRepository: Repository<Producto> = AppDataSource.getRepository(Producto);
            const nuevoProducto = productoRepository.create(req.body);
            const resultado = await productoRepository.save(nuevoProducto);
            return resp.status(201).json(resultado);
        } catch (error) {
            return resp.status(500).json({ message: "Error al crear el producto", error: error.message });
        }
    };

    // Actualizar producto
    static update = async (req: Request, resp: Response) => {
        const { cedula } = req.params;
        try {
            const productoRepository: Repository<Producto> = AppDataSource.getRepository(Producto);
            const producto = await productoRepository.findOne({ where: { cedula: parseInt(cedula) } });

            if (!producto) {
                return resp.status(404).json({ message: "No se encontró el producto" });
            }

            productoRepository.merge(producto, req.body);
            const resultado = await productoRepository.save(producto);
            return resp.status(200).json(resultado);
        } catch (error) {
            return resp.status(500).json({ message: "Error al actualizar el producto", error: error.message });
        }
    };

    // Eliminar producto
    static delete = async (req: Request, resp: Response) => {
        const { cedula } = req.params;
        try {
            const productoRepository: Repository<Producto> = AppDataSource.getRepository(Producto);
            const resultado = await productoRepository.delete(cedula);

            if (resultado.affected === 0) {
                return resp.status(404).json({ message: "No se encontró el producto" });
            }

            resp.json({ message: "Producto eliminado exitosamente" });
        } catch (error) {
            return resp.status(500).json({ message: "Error al eliminar el producto", error: error.message });
        }
    };
}

export default ProductosController; // Forma de exponer los objetos
