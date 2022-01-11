// src/loadListeners.js
import RedisStreamHelper from "redis-stream-helper";
import path from "path";
import * as fsWalk from "@nodelib/fs.walk";
import { packageDirectorySync } from "pkg-dir";
import Logger from "@ptkdev/logger";
var {
  listenForMessages,
  createStreamGroup,
  addListener,
  addStreamData,
  client
} = RedisStreamHelper(process.env.REDIS_PORT, process.env.REDIS_HOST);
var logger = new Logger({
  debug: !!process.env.REL_DEBUG
});
var dir = packageDirectorySync();
var listeners = {};
var files = fsWalk.walkSync(dir + "/listeners", { entryFilter: (entry) => entry.name.endsWith(".js") });
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const streamKey = `rel:${file.path.replace(dir + "/listeners/", "").replace("/" + file.name, "")}:${path.basename(file.name, ".js")}`;
  listeners[streamKey] = await import(file.path);
  await createStreamGroup(streamKey);
  addListener(streamKey);
  logger.info("Found a listener for the stream key: " + streamKey, "INIT");
}
var run = () => {
  listenForMessages((key, streamId, data) => {
    if (listeners[key]) {
      listeners[key].default(key, streamId, data);
    }
  }).then(run);
};
var loadListeners_default = run;

// src/server.js
import AltairFastify from "altair-fastify-plugin";

// src/generateGQLClient.js
import { generate } from "@genql/cli";
import fs from "fs";
import { packageDirectorySync as packageDirectorySync2 } from "pkg-dir";
var dir2 = packageDirectorySync2();
var generateGQLClient_default = () => {
  generate({
    schema: fs.readFileSync(dir2 + "/schema/schema.graphql").toString(),
    output: dir2 + "/gql-client"
  }).catch(console.error);
};

// src/generateGQLServer.js
import { buildGraphbackAPI, createCRUDService } from "graphback";
import { createRedisGraphProvider } from "runtime-redisgraph";
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import fs2 from "fs";
import { packageDirectorySync as packageDirectorySync3 } from "pkg-dir";
import { RedisPubSub } from "graphql-redis-subscriptions";
var dir3 = packageDirectorySync3();
var generateGQLServer_default = () => {
  const dataProviderCreator = createRedisGraphProvider();
  const schema_ = fs2.readFileSync(dir3 + "/schema.graphql");
  const { typeDefs, resolvers, schema, services, contextCreator } = buildGraphbackAPI(schema_.toString(), {
    dataProviderCreator,
    serviceCreator: createCRUDService({
      pubSub: new RedisPubSub()
    }),
    plugins: [
      new SchemaCRUDPlugin({
        outputPath: dir3 + "/schema/schema.graphql"
      })
    ]
  });
  return { typeDefs, schema, resolvers, services, contextCreator };
};

// src/server.js
import { packageDirectorySync as packageDirectorySync4 } from "pkg-dir";
import Fastify from "fastify";
import goTrace from "@go-trace/tracer";
import Logger2 from "@ptkdev/logger";
import fastifyCors from "fastify-cors";
import * as yoga from "graphql-yoga";
var server_default = () => {
  const logger2 = new Logger2({
    debug: !!process.env.REL_DEBUG
  });
  const port = Number(process.env.REL_PORT) || 4e3;
  const host = process.env.REL_HOST || "localhost";
  const app = Fastify();
  const dir4 = packageDirectorySync4();
  app.register(fastifyCors);
  app.register(AltairFastify, {
    path: "/altair",
    baseURL: "/altair/",
    endpointURL: "/graphql",
    decorateReply: false
  });
  const { schema, contextCreator } = generateGQLServer_default();
  logger2.info(`Schema generated at ${dir4 + "/schema"}`, "INIT");
  const graphQLServer = new yoga.GraphQLServer({
    schema,
    context: contextCreator,
    enableLogging: false
  });
  if (process.env.REL_TRACE) {
    logger2.info("Tracer enabled at http://localhost:2929", "INIT");
  }
  app.route({
    url: "/graphql",
    method: ["GET", "POST", "OPTIONS"],
    handler: async (req, reply) => {
      let response;
      if (process.env.REL_TRACE && req.headers.accept !== "text/event-stream") {
        const hasQuery = Object.keys(req.query).length > 0;
        response = await goTrace(schema, hasQuery ? req.query.query : req.body.query, null, contextCreator(), hasQuery ? JSON.parse(req.query.variables) : req.body.variables);
        reply.status(200);
        reply.send(response);
      } else {
        response = await graphQLServer.handleIncomingMessage(req);
        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });
        reply.status(response.status);
        reply.send(response.body);
      }
    }
  });
  app.listen({ port, host });
  logger2.info(`Rel Server started in http://${host}:${port}`, "INIT");
  logger2.info(`Svelte example enabled at http://${host}:${port}/svelte`, "INIT");
  logger2.info(`Altair GraphQL Client enabled at http://${host}:${port}/altair`, "INIT");
  loadListeners_default();
  generateGQLClient_default();
  logger2.info(`GraphQL Client generated at ${dir4 + "/gql-client"}`, "INIT");
  return app;
};

// src/index.ts
var src_default = server_default;
export {
  src_default as default
};
//# sourceMappingURL=index.js.map