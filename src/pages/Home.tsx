import {client} from "../../sanity/client"
import {useEffect, useState} from 'react'
import imageUrlBuilder from "@sanity/image-url";
// import {SanityDocument} from "@sanity/client";
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";


interface Image {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    dimensions: {
        width: number;
        height: number;
    };
}

interface Album {
    _id: string;
    name: string;
    year: string;
    description: string;
    albumImage: Image;
    caption?: string;
}

// More specific query to ensure we get the right data
const ALBUMS_QUERY = `*[_type == "album"] {
    _id,
    name,
    year,
    description,
    albumImage,
    caption,
} | order(_createdAt desc)`

const {projectId, dataset} = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({projectId, dataset}).image(source)
        : null;

const Home = () => {
    const [albums, setAlbums] = useState<Album[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                if (!client.config().token) {
                    throw new Error('Sanity token is not configured')
                }
                const fetchedAlbums = await client.fetch<Album[]>(ALBUMS_QUERY)
                setAlbums(fetchedAlbums)
            } catch (err) {
                console.error('Error fetching albums:', err)
                setError(err instanceof Error ? err.message : 'Failed to fetch albums')
            } finally {
                setLoading(false)
            }
        }

        fetchAlbums()
    }, [])

    const getPostUrl = (image: Image) => {
        return urlFor(image)?.width(5317).height(3992).url()
    }

    return (
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 ">
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-light opacity-60">Loading albums...</div>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-danger">{error}</div>
                </div>
            ) : albums.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-light opacity-60">No albums found</div>
                </div>
            ) : (
                <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
                    {albums.map(album => (
                        <div
                            key={album._id}
                            className="group relative aspect-[3/2] overflow-hidden  shadow-md sm:shadow-lg"
                        >
                            {/* Overlay for dimming image on hover */}
                            <div
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"/>
                            {album.albumImage && (
                                <img
                                    src={getPostUrl(album.albumImage) || ''}
                                    alt={album.name}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                                />
                            )}
                            {/* Album info, hidden by default, shown on hover */}
                            <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-6 w-full flex flex-col items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <p className="font-display text-sm font-medium uppercase tracking-wider text-light/80 mb-2 text-left">
                                    {album.year}
                                </p>
                                <h3 className="font-display text-5xl font-bold highlight text-left">
                                    {album.name}
                                </h3>
                                {album.description && (
                                    <p className="mt-2 line-clamp-2 text-sm highlight text-left">
                                        {album.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
