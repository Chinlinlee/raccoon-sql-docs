import fs from "fs-extra";

const DOCS = [
    "../current"
];

await fs.move("../current/docs", "../../docs/current", { overwrite: true, directoryMode: 0o755 });