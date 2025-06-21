import "reflect-metadata";

import { hc } from "hono/client";
import { container } from "tsyringe";
import { ServerHelper } from "#libs/server-helper";
import { Server1Handler } from "./src/handler.ts";
import { register } from "./src/register.ts";

const appContainer = container.createChildContainer();

register(appContainer);

const severHelper = appContainer.resolve(ServerHelper);
const serverHandler = appContainer.resolve(Server1Handler);

const routes = serverHandler.registerRoutes();

const info = await severHelper.start(3000);

export const server1AppClient = hc<typeof routes>(ServerHelper.buildUrl(info));
