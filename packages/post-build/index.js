import fs from "fs-extra";

const VERSIONS = [
    "current",
    "v2-2-0",
    "v2-3-0",
    "v2-4-x",
    "v2-6-0-v2-9-x",
];

for (const version of VERSIONS) {
    if (await fs.pathExists(`../${version}/docs`)) {
        await fs.move(`../${version}/docs`, `../../docs/${version}`, { overwrite: true });
    }
}