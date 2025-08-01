export interface Iuser {
  id:string,
      name: string;
  playcount?: string;
  listeners?: string;
  mbid?: string;
  url?: string;
  streamable?: string;
  artist:string,
  image: {
    text: string;
    size?: string;
  }[];
}


export interface Response {
      artists: {
    artist: Iuser[];
    '@attr': {
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}