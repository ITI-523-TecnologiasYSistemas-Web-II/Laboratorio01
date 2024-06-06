import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
//import cors from "cors";
import helmet from "helmet";
import router from "./routes";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {

    // Crear aplicación express
    const app = express();

    app.use(express.json());
    app.use(helmet());
    app.use('/api', router);

    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`El servidor ha sido levantado en el puerto https://localhost:${PORT}`);
    });

}).catch(error => {
    console.error('ERROR AL CONECTARSE', error.message);
});

