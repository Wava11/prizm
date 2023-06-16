import { Service, RunningService } from './service';
import express from 'express';
import http from 'http';
export interface ServerConfig {
    port: number;
}

export class Server implements Service {
    isActive: boolean = false;
    constructor(private readonly config: ServerConfig) {

    }
    async start() {
        const { isActive } = this;
        const app = express();
        app.get("/", (_, res) => {
            res.json({ isActive });
        });
        app.put("/", (_, res) => {
            this.isActive = true;
            res.sendStatus(200);
        });
        app.delete("/", (_, res) => {
            this.isActive = false;
            res.sendStatus(200);
        });
        const server = app.listen(this.config.port, () => {

        });
        return new RunningServer(server);
    }
}

export class RunningServer implements RunningService {
    constructor(private readonly server: http.Server) { }
    async stop() {
        this.server.close();
    }
}