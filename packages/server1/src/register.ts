import path from "path";
import { type DependencyContainer } from "tsyringe";
import { ServerHelper } from "#libs/server-helper";
import { Server1Handler } from "./handler.ts";

export async function register(appContainer: DependencyContainer) {
  appContainer.register("AppName", {
    useValue: path.basename(path.dirname(import.meta.dirname)),
  });
  appContainer.register(ServerHelper, {
    useValue: new ServerHelper(appContainer.resolve("AppName")),
  });
  appContainer.register(Server1Handler, {
    useValue: new Server1Handler(appContainer.resolve(ServerHelper)),
  });

  const severHelper = appContainer.resolve(ServerHelper);
  const serverHandler = appContainer.resolve(Server1Handler);

  const routes = serverHandler.registerRoutes();

  const info = await severHelper.start(3000);

  appContainer.register("AddressInfo", {
    useValue: info,
  });

  return routes;
}
