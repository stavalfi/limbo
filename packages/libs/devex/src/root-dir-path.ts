import * as fs from "node:fs";
import findRoot from "find-root";
import * as path from "path";

export const rootDirPath = findRoot(import.meta.dirname, (currentDir: string) =>
  fs.existsSync(path.resolve(currentDir, "bun.lock")),
);
