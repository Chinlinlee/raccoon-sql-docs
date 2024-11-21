import fs from "fs-extra";

const VERSIONS = [
    "current",
    "v2-2-0",
    "v2-3-0",
    "v2-4-x",
];

for (const version of VERSIONS) {
    await fs.move(`../${version}/docs`, `../../docs/${version}`, { overwrite: true, directoryMode: 0o755 });
}

fs.copySync("../../mocha-report/current", "../../docs/current/mocha-report", { overwrite: true, directoryMode: 0o755 });