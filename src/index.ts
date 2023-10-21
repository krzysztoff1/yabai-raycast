import { execaCommand } from "execa";
import { userInfo } from "os";

export async function runShellScript(command: string) {
  return await execaCommand(command);
}

const YABAI_PATH = `env USER=${userInfo().username} ./opt/homebrew/bin/yabai`;

export const runYabaiCommand = async (command: string) => {
  return await runShellScript([YABAI_PATH, command].join(" "));
};
