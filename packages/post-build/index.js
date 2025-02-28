import fs from "fs-extra";

const VERSIONS = [
    "current",
    "v2-2-0",
    "v2-3-0",
    "v2-4-x",
    "v3-0-0-alpha",
];

for (const version of VERSIONS) {
    if (await fs.pathExists(`../${version}/docs`)) {
        await fs.move(`../${version}/docs`, `../../docs/${version}`, { overwrite: true });
    }
}