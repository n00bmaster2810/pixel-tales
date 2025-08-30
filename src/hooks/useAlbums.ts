import { useQuery } from '@tanstack/react-query';
import { client } from '../../sanity/client';
import type { Album } from '../types';
import { ALBUMS_QUERY } from '../utils/query';

// Function to fetch albums from Sanity
const fetchAlbums = async (): Promise<Album[]> => {
  if (!client.config().token) {
    throw new Error('Sanity token is not configured');
  }
  return await client.fetch<Album[]>(ALBUMS_QUERY);
};

// React Query hook for albums
const useAlbums = () => {
  return useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });
};

export default useAlbums;