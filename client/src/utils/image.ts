import type { WikipediaResponse } from "../types/wikipedia";

export const getWikipediaImageUrl = async (title: string): Promise<string> => {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;

    try {
        const response = await fetch(endpoint);
        const data: WikipediaResponse = await response.json();

        const pages = data.query?.pages;
        const firstPage = pages ? Object.values(pages)[0] : null;

        return firstPage?.thumbnail?.source ?? '';
    } catch (err) {
        console.error(`[🔴] Wikipedia error: ${err}`);
        return '';
    }
};

export default getWikipediaImageUrl;