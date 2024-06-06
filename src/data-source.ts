import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Producto } from "./entity/Productos"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "dbLab1",
    synchronize: true,
    logging: false,
    entities: [Producto],
    migrations: [],
    subscribers: [],
})
