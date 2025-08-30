import {createClient} from "@sanity/client"

export const client = createClient({
    projectId: import.meta.env.VITE_PROJECT_ID,
    dataset: import.meta.env.VITE_DATASET,
    apiVersion: import.meta.env.VITE_API_VERSION,
    useCdn: true, // Enable CDN for faster reads
    perspective: "published", // Only fetch published content
    token: import.meta.env.VITE_SANITY_TOKEN, // Use Vite's env variable
    ignoreBrowserTokenWarning: true
})
