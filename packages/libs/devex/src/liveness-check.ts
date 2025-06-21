import { exec } from "child_process";
import nodeCleanup from "node-cleanup";
import { setInterval } from "timers/promises";
import { promisify, styleText } from "util";
import { z } from "zod";

const execAsync = promisify(exec);

type RunStatus =
  | {
      status: "success";
    }
  | {
      status: "failure";
      stdout: string;
    };

const envSchema = z.object({
  GOSS_FILE: z.string().nonempty().readonly(),
  SHOW_FIRST_ERROR_AFTER_SECONDS: z.coerce
    .number()
    .int()
    .min(0)
    .max(200)
    .default(5),
});

export class LivenessChecks {
  private readonly abortController = new AbortController();
  private readonly gossConfigPath;
  private readonly showFistErrorAfterSeconds;

  constructor() {
    nodeCleanup(() => {
      this.abortController.abort();
    });
    const env = envSchema.parse(process.env);
    this.gossConfigPath = env.GOSS_FILE;
    this.showFistErrorAfterSeconds = env.SHOW_FIRST_ERROR_AFTER_SECONDS;
  }

  private showSuccess() {
    console.log(
      styleText(["bgGreen", "black"], "All services are up and running"),
    );
  }

  private showFailure(error: string, startedMs: number): boolean {
    if (startedMs + this.showFistErrorAfterSeconds * 1000 < Date.now()) {
      console.error(styleText(["bgRed"], `Some services are down`));
      console.error(styleText(["red"], error));
      return true;
    } else {
      return false;
    }
  }

  private cleanError(error: string) {
    return error
      .split("\n")
      .slice(1)
      .filter(Boolean)
      .filter((line) => !line.includes("Total Duration:"))
      .join("\n");
  }

  private async runGoss(): Promise<RunStatus | { status: "cancel-signal" }> {
    try {
      await execAsync(`goss validate`, {
        env: {
          ...process.env,
          GOSS_USE_ALPHA: "1",
          GOSS_FILE: this.gossConfigPath,
        },
        signal: this.abortController.signal,
      });

      return {
        status: "success",
      };
    } catch (error) {
      if (this.abortController.signal.aborted) {
        return { status: "cancel-signal" };
      } else {
        const parsedError = z
          .object({
            stdout: z.string(),
            stderr: z.string(),
          })
          .parse(error);

        return {
          status: "failure",
          stdout:
            this.cleanError(parsedError.stdout) ||
            parsedError.stdout.split("\n").filter(Boolean).join("\n") ||
            parsedError.stderr.split("\n").filter(Boolean).join("\n"),
        };
      }
    }
  }

  public async run(): Promise<void> {
    let lastRunStatus:
      | RunStatus
      | {
          status: "not-run-yet";
        } = { status: "not-run-yet" };

    const startedMs = Date.now();
    let shownLivenessTimeoutError = false;

    console.log("Running liveness checks...");

    const check = async () => {
      const currentRunStatus = await this.runGoss();
      switch (currentRunStatus.status) {
        case "success":
          switch (lastRunStatus.status) {
            case "success":
              break;
            case "failure":
            case "not-run-yet":
              this.showSuccess();
              break;
          }
          break;
        case "failure":
          switch (lastRunStatus.status) {
            case "success":
              this.showFailure(currentRunStatus.stdout, startedMs);
              break;
            case "failure":
              if (currentRunStatus.stdout !== lastRunStatus.stdout) {
                this.showFailure(currentRunStatus.stdout, startedMs);
              } else {
                if (!shownLivenessTimeoutError) {
                  shownLivenessTimeoutError = this.showFailure(
                    currentRunStatus.stdout,
                    startedMs,
                  );
                }
              }
              break;
            case "not-run-yet":
              this.showFailure(currentRunStatus.stdout, startedMs);
              break;
          }
          break;
        case "cancel-signal":
          // I did this to avoid printing the same error twice when the developer stops the process
          return;
      }

      lastRunStatus = currentRunStatus;
    };

    void check();

    for await (const _ of setInterval(100, {
      signal: this.abortController.signal,
    })) {
      await check();
    }
  }
}

const livenessChecks = new LivenessChecks();
await livenessChecks.run();
