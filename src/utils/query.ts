export const ALBUMS_QUERY = `*[_type == "album"] {
    _id,
    name,
    year,
    description,
    albumImage{
        asset,
        "dimensions": asset->metadata.dimensions
    },
    caption,
    posts[]->{_id, title, image {
        asset,
        "dimensions": asset->metadata.dimensions
    }}
} | order(_createdAt desc)`