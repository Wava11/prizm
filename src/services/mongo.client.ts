import { Service, RunningService } from './service';

export interface MongoClientConfig {
    
}

export class MongoClient implements Service {
    // dependencies declarations
    constructor(private readonly config: MongoClientConfig) {
        
    }
    async start() {
        // start all dependencies
        return new RunningMongoClient(/* running dependencies */)
    }
}

export class RunningMongoClient implements RunningService {
    constructor(/* running dependencies */) {}
    async stop() {
        // stop all dependencies
    }
}