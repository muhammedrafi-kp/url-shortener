import crypto from "crypto";
import { Types } from "mongoose";
import { URL } from "../models/url.model";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/http";
import { HttpError } from "../utils/HttpError";
import { ShortURLDto } from "../dto/response/url.dto";
import { Console } from "console";

export class UrlService {
    async createShortURL(userId: Types.ObjectId, originalUrl: string): Promise<string> {
        try {
            const shortCode = crypto.randomBytes(4).toString("hex");
            console.log("shortCode : ",shortCode);
            

            const shortUrlDoc = new URL({
                shortCode: shortCode,
                originalUrl,
                userId
            });

            await shortUrlDoc.save();

            const BASE_URL = process.env.BASE_URL || "https://shorturl.mhdrafi.online";
            const shortUrl = `${BASE_URL}/${shortCode}`;
            
            return shortUrl;

        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }

    async getOriginalURL(shortCode: string): Promise<ShortURLDto | null>{
        try {

            const urlDoc =await URL.findOne({shortCode});

            if (!urlDoc) return null;

            return ShortURLDto.from(urlDoc);

        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while fetching URL:", message);
            throw error;
        }
    }

    async getUserURLs(userId: Types.ObjectId, page: number, limit: number): Promise<{ items: ShortURLDto[]; total: number; page: number; limit: number; totalPages: number }> {
        try {
            const safePage = Math.max(1, Math.floor(page) || 1);
            const safeLimit = Math.max(1, Math.floor(limit) || 5);

            const total = await URL.countDocuments({ userId });

            const urls = await URL.find({ userId })
                .sort({ createdAt: -1 })
                .skip((safePage - 1) * safeLimit)
                .limit(safeLimit);

            const items = ShortURLDto.fromArray(urls);
            const totalPages = Math.max(1, Math.ceil(total / safeLimit));

            return { items, total, page: safePage, limit: safeLimit, totalPages };

        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }
}