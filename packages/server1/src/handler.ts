import { createRoute, z } from "@hono/zod-openapi";
import { type ServerHelper } from "#libs/server-helper";

export class Server1Handler {
  public readonly serverHelper: ServerHelper;
  constructor(serverHelper: ServerHelper) {
    this.serverHelper = serverHelper;
  }

  public registerRoutes() {
    return this.serverHelper.app
      .openapi(
        createRoute({
          method: "get",
          path: "/hello",
          responses: {
            200: {
              description: "Respond a message",
              content: {
                "application/json": {
                  schema: z.object({
                    message: z.string(),
                  }),
                },
              },
            },
          },
        }),
        (c) => {
          return c.json({
            message: "hello",
          });
        },
      )
      .openapi(
        createRoute({
          method: "get",
          path: "/hello1",
          responses: {
            200: {
              description: "Respond a message1",
              content: {
                "application/json": {
                  schema: z.object({
                    message: z.string(),
                  }),
                },
              },
            },
          },
        }),
        (c) => {
          return c.json({
            message: "hello1",
          });
        },
      );
  }
}
