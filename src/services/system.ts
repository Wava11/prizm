import { MongoClient, MongoClientConfig, RunningMongoClient } from './mongo.client';
import { RunningServer, Server, ServerConfig } from './server';
import { Service, RunningService } from './service';

export interface SystemConfig {
    mongoClientConfig: MongoClientConfig;
    serverConfig: ServerConfig;
}

export class System implements Service {
    private readonly mongoClient: MongoClient;
    private readonly server: Server;
    constructor(private readonly config: SystemConfig) {
        this.mongoClient = new MongoClient(config.mongoClientConfig);
        this.server = new Server(config.serverConfig);
    }
    async start() {
        const runningMongoClient = await this.mongoClient.start();
        const runningServer = await this.server.start();
        return new RunningSystem(runningMongoClient, runningServer);
    }
}

export class RunningSystem implements RunningService {
    constructor(
        private readonly runningMongoClient: RunningMongoClient,
        private readonly runningServer: RunningServer
    ) { }

    async stop() {
        await this.runningMongoClient.stop();
        await this.runningServer.stop();
    }
}