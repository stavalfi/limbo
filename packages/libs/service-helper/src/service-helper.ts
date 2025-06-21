import type { AddressInfo } from "node:net";
import path from "node:path";
import { config } from "@dotenvx/dotenvx";
import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { rootDirPath } from "#libs/devex";

export class ServerHelper {
  public readonly app: OpenAPIHono = new OpenAPIHono({ strict: true });
  public readonly appName: string;
  constructor(appName: string) {
    this.appName = appName;

    config({
      path: path.join(rootDirPath, ".env"),
      strict: true,
      quiet: true,
    });
  }

  public static buildUrl(info: AddressInfo): string {
    return `http://${info.address}:${info.port.toString()}`;
  }

  public async start(port: number): Promise<AddressInfo> {
    this.app.openapi(
      createRoute({
        method: "get",
        path: "/",
        responses: {
          200: {
            description: "liveness",
            content: {
              "application/json": {
                schema: z.object({
                  status: z.string(),
                }),
              },
            },
          },
        },
      }),
      (c) => {
        return c.json({
          status: "OK",
        });
      },
    );

    this.app.get(
      "/ui",
      swaggerUI({
        title: this.appName,
        url: "/doc",
      }),
    );

    this.app.doc("/doc", {
      info: {
        title: this.appName,
        version: "v1",
      },
      openapi: "3.1.0",
    });

    const info = await new Promise<AddressInfo>((resolve) => {
      serve({ hostname: "localhost", fetch: this.app.fetch, port }, resolve);
    });

    console.log(`🚀 server running on ${ServerHelper.buildUrl(info)}`);
    console.log(`🚀 Swagger UI running on ${ServerHelper.buildUrl(info)}/ui`);

    return info;
  }
}
