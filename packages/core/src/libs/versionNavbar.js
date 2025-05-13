import myDotenvConfig from "./dotenv.js";

myDotenvConfig();

export default {
    "title": "Version",
    "items": [
        {
            "title": "v3.2.x (current)",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/current/`
        },
        {
            "title": "v2.6.0-v2.9.x",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-6-0-v2-9-x/`
        },
        {
            "title": "v2.4.x",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-4-x/`
        },
        {
            "title": "v2.3.0",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-3-0/`
        },
        {
            "title": "v2.2.0",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-2-0/`
        }
    ]
};