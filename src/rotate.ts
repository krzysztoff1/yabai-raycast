import { Toast, showHUD, showToast } from "@raycast/api";
import { runYabaiCommand } from ".";

const ERROR_MESSAGE = "Failed to rotate window tree.";
const SUCCESS_MESSAGE = "Window tree rotated.";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m space --rotate 90");

    if (stderr) {
      throw new Error();
    }

    showHUD(SUCCESS_MESSAGE);
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: ERROR_MESSAGE,
    });
  }
};
