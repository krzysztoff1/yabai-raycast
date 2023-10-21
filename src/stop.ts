import { Toast, showHUD, showToast } from "@raycast/api";
import { runYabaiCommand } from ".";

export default async () => {
  showToast({
    style: Toast.Style.Animated,
    title: "Yabai",
    message: "Stopping Yabai...",
  });

  try {
    const { stdout, stderr } = await runYabaiCommand("--stop-service");

    if (stdout.includes("not running")) {
      showToast({
        style: Toast.Style.Failure,
        title: "Yabai",
        message: "Yabai is already stopped.",
      });

      return;
    }

    if (stderr) {
      showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: stderr,
      });

      return;
    }

    showHUD("Yabai has been stopped.");
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: "An error occurred while stopping Yabai.",
    });
  }
};
