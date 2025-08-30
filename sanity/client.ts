import {createClient} from "@sanity/client"

export const client = createClient({
    projectId: "ews3httd",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true, // Enable CDN for faster reads
    perspective: "published", // Only fetch published content
    token: import.meta.env.VITE_SANITY_TOKEN, // Use Vite's env variable
    ignoreBrowserTokenWarning: true
})
