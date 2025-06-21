import type { AddressInfo } from "node:net";
import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

export class ServerHelper {
  public readonly app: OpenAPIHono;

  constructor(appName: string) {
    this.app = new OpenAPIHono({ strict: true });

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

  public async start(port: number): Promise<AddressInfo> {
    const info = await new Promise<AddressInfo>((resolve) => {
      serve({ fetch: this.app.fetch, port }, resolve);
    });

    console.log(
      `🚀 server running on http://localhost:${info.port.toString()}`,
    );

    return info;
  }
}
