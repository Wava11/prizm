import { System } from './services/system';
new System({ mongoClientConfig: {}, serverConfig: { port: 3333 } }).start();