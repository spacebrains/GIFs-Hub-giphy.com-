export type search_type = 'gifs' | 'stickers' | 'myGifs';

export interface IGifBlock {
    id: string
    src: string;
    title: string;
    import_datetime: string;
    saved: boolean;
}

export type content_type = 'gifs' | 'myGifs';