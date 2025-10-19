
export interface WikipediaResponse {
    batchcomplete?: string;
    query?: WikipediaQuery;
}

export interface WikipediaQuery {
    pages: Record<string, WikipediaPage>;
}

export interface WikipediaPage {
    pageid: number;
    ns: number;
    title: string;
    thumbnail?: WikipediaThumbnail;
    pageimage?: string;
}


export interface WikipediaThumbnail {
    source: string;
    width: number;
    height: number;
}