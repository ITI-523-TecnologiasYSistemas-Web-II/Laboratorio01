import { Express } from "express";
import ProductosController from "../controller/ProductosController";
import express = require("express");

const router = express.Router();

// Rutas para productos
router.get('/productos', ProductosController.getAll);
router.get('/productos/:cedula', ProductosController.obteinById);
router.post('/productos', ProductosController.create);
router.delete('/productos/:cedula', ProductosController.delete);
router.put('/productos/:cedula', ProductosController.update);

export default router;
