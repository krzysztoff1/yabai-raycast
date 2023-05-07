import { runYabaiCommand } from ".";
import { showToast, showHUD, LaunchProps } from "@raycast/api";

interface MirrorArguments {
  axis: "x" | "y";
}

const ERROR_MESSAGE = "Failed to mirror space";

export default async (props: LaunchProps<{ arguments: MirrorArguments }>) => {
  const axis = props?.arguments?.axis ? props.arguments.axis : "y";
  const cmd = `space --mirror ${axis}-axis`;

  try {
    const { stderr } = await runYabaiCommand(cmd);

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("Mirrored space");
  } catch (error) {
    showToast({ title: "Error", message: ERROR_MESSAGE });
  }
};
