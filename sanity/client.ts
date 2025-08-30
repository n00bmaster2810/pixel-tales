import {createClient} from "@sanity/client"

export const client = createClient({
    projectId: "ews3httd",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false, // Must be false when using a token or private dataset
    token: import.meta.env.VITE_SANITY_TOKEN, // Use Vite's env variable
    ignoreBrowserTokenWarning: true
})
