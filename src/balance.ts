import { Toast, showHUD, showToast } from "@raycast/api";
import { runYabaiCommand } from ".";

const ERROR_MESSAGE = "Failed to balance space";
const SUCCESS_MESSAGE = "Balanced space";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("space --balance");

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
