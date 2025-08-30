import { Link } from "react-router-dom";
import { getPostUrl } from "../utils";
import { useAlbums } from "../hooks";
import ErrorBoundary from "../components/ErrorBoundary";
import AlbumErrorFallback from "../components/AlbumErrorFallback";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useCallback, useMemo } from "react";
import type { Album, Image as ImageType } from "../types";

// Skeleton loader for albums
const AlbumSkeleton = () => {
    return (
        <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
            {[1, 2, 3].map((item) => (
                <div 
                    key={item}
                    className="group relative aspect-[3/2] overflow-hidden shadow-md sm:shadow-lg bg-gray-800 animate-pulse"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-6 w-full flex flex-col items-start">
                        <div className="h-4 w-20 bg-gray-700 rounded mb-4"></div>
                        <div className="h-8 w-48 bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 w-full max-w-xs bg-gray-700 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const AlbumsList = memo(() => {
    const { data, isLoading, error, isError } = useAlbums();
    
    // Memoize albums array to prevent unnecessary re-renders
    const albums = useMemo(() => data || [], [data]);
    
    if (isLoading) {
        return <AlbumSkeleton />;
    }
    
    if (isError) {
        throw error;
    }
    
    if (albums.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-light opacity-60">No albums found</div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
            {albums.map((album: Album) => (
                <Link
                    to={`/album/${album.name.toLowerCase().replace(/ /g, '-')}`}
                    state={{posts: album.posts}}
                    key={album._id}
                    className="group relative aspect-[3/2] overflow-hidden shadow-md sm:shadow-lg"
                >
                    {/* Overlay for dimming image on hover */}
                    <div
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"/>
                    {album.albumImage && (
                        <AlbumImage image={album.albumImage} alt={album.name} />
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
                </Link>
            ))}
        </div>
    );
});

// Memoized album image component to prevent unnecessary re-renders
const AlbumImage = memo(({ image, alt }: { image: ImageType; alt: string }) => {
    return (
        <img
            src={getPostUrl(image) || ''}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
            onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
            }}
        />
    );
});

const Home = () => {
    const queryClient = useQueryClient();
    
    // Memoize the reset handler to prevent unnecessary re-renders
    const handleReset = useCallback(() => {
        // Invalidate and refetch albums query
        queryClient.invalidateQueries({ queryKey: ['albums'] });
    }, [queryClient]);

    return (
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
            <ErrorBoundary
                fallback={
                    <AlbumErrorFallback 
                        error={new Error("Failed to load albums")} 
                        resetErrorBoundary={handleReset} 
                    />
                }
            >
                <AlbumsList />
            </ErrorBoundary>
        </div>
    )
}

export default Home
