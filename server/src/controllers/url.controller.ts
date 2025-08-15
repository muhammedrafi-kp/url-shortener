
import { Request, Response } from "express";
import { Types } from "mongoose";
import { UrlService } from "../services/url.service";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/http";
import { HttpError } from "../utils/HttpError";

export class UrlController {

    constructor(private _urlService: UrlService) { };

    async createShortURL(req: Request, res: Response) {
        try {
            const { originalUrl } = req.body;

            const userId = new Types.ObjectId(req.user?.userId);

            const shortUrl = await this._urlService.createShortURL(userId, originalUrl);

            res.status(HTTP_STATUS.CREATED).json({ success: true, message: HTTP_MESSAGE.CREATED, data: shortUrl });

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }

    async redirect(req: Request, res: Response) {
        try {

            const { shortCode } = req.params;

            if (!shortCode) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: HTTP_MESSAGE.URL_NOT_FOUND });
            }

            const urlDoc = await this._urlService.getOriginalURL(shortCode);

            if (!urlDoc) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: HTTP_MESSAGE.URL_NOT_FOUND });
            }

            res.redirect(urlDoc.originalUrl);

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }

    async listUserURLs(req: Request, res: Response) {
        try {

            const userId = new Types.ObjectId(req.user?.userId);

            const urls = await this._urlService.getUserURLs(userId);

            res.status(HTTP_STATUS.OK).json({ success: true, data: urls })

        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }
}