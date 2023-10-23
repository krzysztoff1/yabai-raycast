import { execaCommand } from "execa";
import { userInfo } from "os";

const YABAI_PATH = `env USER=${userInfo().username} ./opt/homebrew/bin/yabai`;

export const runYabaiCommand = async (command: string) => {
  return await execaCommand([YABAI_PATH, command].join(" "));
};
