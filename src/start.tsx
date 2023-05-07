import { Toast, showHUD, showToast } from "@raycast/api";
import { BREW_PATH, runShellScript } from ".";

const start = async () => {
  const cmd = `${BREW_PATH} services start yabai`;
  return await runShellScript(cmd);
};

const restart = async () => {
  try {
    const cmd = `${BREW_PATH} services restart yabai`;
    await runShellScript(cmd);
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: "An error occurred while restarting Yabai.",
    });
  }
};

export default async () => {
  showToast({
    style: Toast.Style.Animated,
    title: "Yabai",
    message: "Starting Yabai...",
  });

  try {
    const { stdout, stderr } = await start();

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
      showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: stderr,
      });

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
