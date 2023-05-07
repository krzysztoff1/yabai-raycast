import { execaCommand } from "execa";
import { getPreferenceValues } from "@raycast/api";
import { cpus, userInfo } from "os";

const preferences = getPreferenceValues();

export const BREW_PATH: string =
  preferences.brewPath && preferences.brewPath.length > 0
    ? preferences.brewPath
    : cpus()[0].model.includes("Apple")
    ? "/opt/homebrew/bin/brew"
    : "/usr/local/bin/brew";

export const YABAI_PATH = `env USER=${userInfo().username} ./opt/homebrew/bin/yabai`;

export async function runShellScript(command: string) {
  return await execaCommand(command);
}

export const runYabaiCommand = async (command: string) => {
  return await runShellScript(`${YABAI_PATH} -m ${command}`);
};
