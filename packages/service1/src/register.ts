import path from "path";
import { type DependencyContainer } from "tsyringe";
import { ServerHelper } from "../../libs/service-helper/index.ts";
import { processEnv } from "./envs.ts";
import { Service1Handler } from "./handler.ts";

export async function register(appContainer: DependencyContainer) {
  appContainer.register("AppName", {
    useValue: path.basename(path.dirname(import.meta.dirname)),
  });
  appContainer.register(ServerHelper, {
    useValue: new ServerHelper(appContainer.resolve("AppName")),
  });
  appContainer.register(Service1Handler, {
    useValue: new Service1Handler(appContainer.resolve(ServerHelper)),
  });

  const severHelper = appContainer.resolve(ServerHelper);
  const serverHandler = appContainer.resolve(Service1Handler);

  const routes = serverHandler.registerRoutes();

  const info = await severHelper.start(processEnv.SERVICE1_PORT);

  appContainer.register("AddressInfo", {
    useValue: info,
  });

  return routes;
}
