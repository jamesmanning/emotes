export = IEmoteDataEntry;

interface IEmoteDataEntry {
    apng_url: string;
    "background-image": string;
    height: number;
    nsfw: boolean;
    names: string[];
    sr: string;
    tags: string[];
    width: number;
    "background-position": string[];
}