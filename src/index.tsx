import { Detail, Toast, ToastStyle, environment, showToast } from "@raycast/api";
import { exec, execSync } from "child_process";
import path, { join as path_join } from "path";
import { existsSync, constants as fs_constants } from "fs";
import * as fs from "fs/promises";
import { execPath } from "process";
import { promisify } from "util";

import { execaCommand } from "execa";

import { getPreferenceValues } from "@raycast/api";
import { cpus } from "os";
import { useEffect } from "react";

const preferences = getPreferenceValues();

const brewPath: string =
  preferences.brewPath && preferences.brewPath.length > 0
    ? preferences.brewPath
    : cpus()[0].model.includes("Apple")
    ? "/opt/homebrew/bin/brew"
    : "/usr/local/bin/brew";

export async function runShellScript(command: string) {
  const { stdout, stderr } = await execaCommand(command);
  return { stdout, stderr };
}

export type serviceType = { name: string; status: string; user: string; path: string };

export async function getServices(): Promise<serviceType[]> {
  if (!existsSync(brewPath)) {
    await showToast(ToastStyle.Failure, "Brew Executable Not Found", `Is brew installed at ${brewPath}?`);
    return [];
  }
  const brewServicesData = await runShellScript(`${brewPath} services list`);

  const lines = brewServicesData.stdout.split("\n");
  if (lines.length <= 1) {
    showToast(ToastStyle.Failure, "Error Parsing Service Data", "There are no services.");
    return [];
  }
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].startsWith("Name")) {
      lines.splice(0, i + 1);
      break;
    }
  }

  const data: serviceType[] = [];
  for (const line of lines) {
    const split = line.trim().split(/ +/g);
    if (split.length < 2) {
      showToast(ToastStyle.Failure, "Error Parsing Service Data", "Service data could not be parsed.");
      return [];
    }
    let status = split[1];
    if (status === "none") status = "stopped";
    if (split.length !== 4 && split[1] === "started") status = "running";
    data.push({
      name: split[0],
      status: status,
      user: split.length === 4 ? split[2] : "",
      path: split.at(-1) ?? "",
    });
  }
  return data;
}

export default function Command() {
  useEffect(() => {
    getServices()
      .then((services) => {
        console.log(services);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <Detail markdown={`# Hello World`} />;
}
