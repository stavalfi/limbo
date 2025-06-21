import path from "path";
import { type DependencyContainer } from "tsyringe";
import { ServerHelper } from "#libs/server-helper";
import { Server1Handler } from "./handler.ts";

export function register(appContainer: DependencyContainer): void {
  appContainer.register("AppName", {
    useValue: path.basename(path.dirname(import.meta.dirname)),
  });
  appContainer.register(ServerHelper, {
    useFactory: (c) => new ServerHelper(c.resolve("AppName")),
  });
  appContainer.register(Server1Handler, {
    useFactory: (c) => new Server1Handler(c.resolve(ServerHelper)),
  });
}
