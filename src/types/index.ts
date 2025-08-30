export interface Image {
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

export interface Post {
    _id: string;
    title: string;
    image: Image;
}

export interface Album {
    _id: string;
    name: string;
    year: string;
    description: string;
    albumImage: Image;
    caption?: string;
    posts?: Post[];
}