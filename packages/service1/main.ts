import "reflect-metadata";

import { hc } from "hono/client";
import { container } from "tsyringe";
import { ServerHelper } from "../libs/service-helper/index.ts";
import { register } from "./src/register.ts";

const appContainer = container.createChildContainer();

const routes = await register(appContainer);

export const client = hc<typeof routes>(
  ServerHelper.buildUrl(appContainer.resolve("AddressInfo")),
);
