import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("--start-service");

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("Yabai has been started.");
  } catch (error) {
    showFailureToast("An error occurred while starting Yabai.");
  }
};
