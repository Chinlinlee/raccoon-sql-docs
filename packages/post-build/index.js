import fs from "fs-extra";

const DOCS = [
    "../current"
];

await fs.move("../current/docs", "../../docs/current", { overwrite: true, directoryMode: 0o755 });
await fs.move("../v2-2-0/docs", "../../docs/v2-2-0", { overwrite: true, directoryMode: 0o755 });

fs.copySync("../../mocha-report/current", "../../docs/current/mocha-report", { overwrite: true, directoryMode: 0o755 });