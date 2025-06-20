import path from "node:path";
import { generateApi } from "swagger-typescript-api";
import tsconfig from "../../../../tsconfig.json" with { type: "json" };
import { rootDirPath } from "./root-dir-path.ts";

await generateApi({
  input: path.join(rootDirPath, "packages/server1/swagger.json"),
  output: path.join(rootDirPath, "output/packages/server1/swagger"),
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
});
