import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el módulo cors
import router from '../routes/index.routes.js';
import middleware from '../middlewares/index.middleware.js';
import pgService from '../services/pg.service.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = 3300; // Asigna el puerto directamente o importa desde tus configuraciones
    }

    async connectionDB() {
        new pgService();
    }

    middleware() {
        // Configura el middleware de bodyParser para manejar JSON
        this.app.use(bodyParser.json());
        // Configura el middleware de CORS para permitir solicitudes desde localhost:4200
        this.app.use(cors({
            origin: 'http://localhost:4200',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.app.use(middleware);
    }

    route() {
        this.app.use(router);
    }

    runServer() {
        this.app.listen(this.port, () => {
            console.log("Server on!!", this.port);
        });
    }

    load() {
        this.connectionDB();
        this.middleware();
        this.route();
        this.runServer();
    }
}
