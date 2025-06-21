import type { AddressInfo } from "node:net";
import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

export class ServerHelper {
  public readonly app: OpenAPIHono = new OpenAPIHono({ strict: true });

  constructor(appName: string) {
    this.app.get(
      "/ui",
      swaggerUI({
        title: appName,
        url: "/doc",
      }),
    );

    this.app.doc("/doc", {
      info: {
        title: appName,
        version: "v1",
      },
      openapi: "3.1.0",
    });
  }

  public static buildUrl(info: AddressInfo): string {
    return `http://localhost:${info.port.toString()}`;
  }

  public async start(port: number): Promise<AddressInfo> {
    const info = await new Promise<AddressInfo>((resolve) => {
      serve({ fetch: this.app.fetch, port }, resolve);
    });

    console.log(`🚀 server running on ${ServerHelper.buildUrl(info)}`);
    console.log(`🚀 Swagger UI running on ${ServerHelper.buildUrl(info)}/ui`);

    return info;
  }
}
