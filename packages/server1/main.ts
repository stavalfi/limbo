import { ServerHelper } from "#libs/server-helper";
import { hc } from "hono/client";
import { Server1Handler } from "./src/handler.ts";
import path from "node:path";

const appName = path.basename(import.meta.dirname);

const server = new ServerHelper(appName);

const handler = new Server1Handler(server);

const routes = handler.registerRoutes();

const info = await server.start(3000);

export const server1AppClient = hc<typeof routes>(
  `${info.family}://${info.address}:${info.port.toString()}`,
);
