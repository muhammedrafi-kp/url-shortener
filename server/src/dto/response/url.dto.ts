import { IURL } from "../../models/url.model";
import { Types } from "mongoose";


export class ShortURLDto {
    public readonly id: string;
    public readonly shortCode: string;
    public readonly originalUrl: string;
    public readonly userId: string;
    public readonly createdAt: Date;

    constructor(url: IURL) {
        this.id = url._id.toString();
        this.shortCode = url.shortCode;
        this.originalUrl = url.originalUrl;
        this.userId = url.userId.toString();
        this.createdAt = url.createdAt;
    }

    public static from(url: IURL): ShortURLDto {
        return new ShortURLDto(url);
    }

    public static fromArray(urls: IURL[]): ShortURLDto[] {
        return urls.map(url => new ShortURLDto(url));
    }
}
