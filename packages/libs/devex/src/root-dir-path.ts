import * as fs from "node:fs";
import findRoot from "find-root";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const rootDirPath = findRoot(__dirname, (currentDir: string) =>
  fs.existsSync(path.resolve(currentDir, "root-dir"))
);
