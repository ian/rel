"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGraphbackServer = exports.GraphbackServer = void 0;
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const getPort = require("get-port");
const cors = require("cors");
const express = require("express");
const http = require("http");
const runtime_1 = require("./runtime");
const ENDPOINT = "/graphql";
class GraphbackServer {
    constructor(httpServer, graphqlSchema, dbClient) {
        this.httpServer = httpServer;
        this.graphqlSchema = graphqlSchema;
        this.db = dbClient;
    }
    start(port) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.httpServer.listening) {
                // the server is already running
                return;
            }
            if (port === undefined) {
                // if no port is passed, use the previous port
                // or get a new available port
                if (this.serverPort !== undefined) {
                    port = this.serverPort;
                }
                else {
                    port = yield getPort();
                }
            }
            this.httpServer.listen({ port });
            this.serverPort = port;
            console.log(`Listening at: ${this.getHttpUrl()}`);
        });
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const server = this.httpServer;
            if (!server.listening) {
                return;
            }
            // convert server close to a promise
            yield new Promise((resolve, reject) => {
                server.close(e => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    getDb() {
        return this.db;
    }
    getHttpUrl() {
        if (this.serverPort === undefined) {
            throw new Error(`can not retrieve the httpUrl because the server has not been started yet`);
        }
        return `http://localhost:${this.serverPort}${ENDPOINT}`;
    }
    getHttpPort() {
        return this.serverPort;
    }
    getWsUrl() {
        if (this.serverPort === undefined) {
            throw new Error(`can not retrieve the subscriptions url because the server has not been started yet`);
        }
        return `ws://localhost:${this.serverPort}${ENDPOINT}`;
    }
    getSchema() {
        return this.graphqlSchema;
    }
}
exports.GraphbackServer = GraphbackServer;
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
function buildGraphbackServer(modelDir, dataSyncServeConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = express();
        app.use(cors());
        const dbClient = yield runtime_1.createMongoDBClient();
        const db = dbClient.db('test');
        const graphbackApi = runtime_1.createRuntime(modelDir, db, dataSyncServeConfig);
        const apolloConfig = {
            typeDefs: graphbackApi.typeDefs,
            resolvers: graphbackApi.resolvers,
            // eslint-disable-next-line @typescript-eslint/unbound-method
            context: graphbackApi.contextCreator,
            playground: true,
            resolverValidationOptions: {
                requireResolversForResolveType: false
            }
        };
        const apolloServer = new apollo_server_express_1.ApolloServer(apolloConfig);
        apolloServer.applyMiddleware({ app });
        const httpServer = http.createServer(app);
        apolloServer.installSubscriptionHandlers(httpServer);
        return new GraphbackServer(httpServer, graphbackApi.typeDefs, dbClient);
    });
}
exports.buildGraphbackServer = buildGraphbackServer;
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
//# sourceMappingURL=GraphbackServer.js.map