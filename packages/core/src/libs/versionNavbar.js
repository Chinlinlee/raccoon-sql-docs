import myDotenvConfig from "./dotenv.js";

myDotenvConfig();

export default {
    "title": "Version",
    "items": [
        {
            "title": "v2.6.x (current)",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/current/`
        },
        {
            "title": "v2.4.x",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-4-x/`
        },
        {
            "title": "v2.3.0 (current)",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-3-0/`
        },
        {
            "title": "v2.2.0",
            "to": `${process.env.VERSION_PAGE_BASE_URL}/v2-2-0/`
        }
    ]
};