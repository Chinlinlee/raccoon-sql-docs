import { config as dotConfig } from 'dotenv';
import { join } from "desm";

export default function () {
    dotConfig({
        path: join(import.meta.url, "../../.env")
    });
}