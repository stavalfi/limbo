import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { generateApi } from "swagger-typescript-api";
import tsconfig from "../../../../tsconfig.json" with { type: "json" };
import { rootDirPath } from "./root-dir-path.ts";

const execAsync = promisify(exec);

const swaggerJsonPath = path.join(
  rootDirPath,
  "packages/service1/swagger.json",
);
const serverOutputDir = path.join(
  rootDirPath,
  "output/packages/service1/swagger/server",
);

await fs.promises.mkdir(serverOutputDir, { recursive: true });

await Promise.all([
  execAsync(
    `bunx openapi-glue --project-name=service1 --base-dir=${serverOutputDir} ${swaggerJsonPath}`,
    { cwd: rootDirPath },
  ),
  generateApi({
    input: swaggerJsonPath,
    output: path.join(rootDirPath, "output/packages/service1/swagger/client"),
    addReadonly: true,
    anotherArrayType: true,
    compilerTsConfig: tsconfig.compilerOptions,
    defaultResponseAsSuccess: true,
    defaultResponseType: "void",
    enumNamesAsValues: true,
    extractEnums: true,
    extractRequestBody: true,
    extractRequestParams: true,
    extractResponseBody: true,
    extractResponseError: true,
    extractResponses: true,
    httpClientType: "axios",
    generateUnionEnums: true,
  }),
]);
