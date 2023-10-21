import { Toast, showHUD, showToast } from "@raycast/api";
import { runYabaiCommand } from ".";

const handleError = (errorMessage: string) => {
  showToast({
    style: Toast.Style.Failure,
    title: "Error, cannot run Yabai command",
    message: errorMessage.slice(0, 100),
  });
};

const restart = async () => {
  try {
    const { stderr } = await runYabaiCommand("--restart-service");

    if (stderr) {
      handleError(stderr);

      return;
    }
  } catch (error) {
    handleError(String(error));
  }
};

export default async () => {
  showToast({
    style: Toast.Style.Animated,
    title: "Yabai",
    message: "Starting Yabai...",
  });

  try {
    const { stdout, stderr } = await runYabaiCommand("--start-service");

    if (stdout.includes("already started")) {
      showToast({
        style: Toast.Style.Failure,
        title: "Yabai",
        message: "Yabai is already running. Restart?",
        primaryAction: {
          title: "Restart Yabai",
          onAction: async () => {
            await restart();
            showToast({
              style: Toast.Style.Success,
              title: "Yabai",
              message: "Yabai has been restarted.",
            });
          },
        },
      });

      return;
    }

    if (stderr) {
      handleError(stderr);
      return;
    }

    showHUD("Yabai has been started.");
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: "An error occurred while starting Yabai.",
    });
  }
};
