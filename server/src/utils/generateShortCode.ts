import crypto from "crypto";

const generateShortCode = async (): Promise<string> => {
    try {
        const shortCode = crypto.randomBytes(4).toString('hex');
        return shortCode;
    } catch (error) {
        throw error;
    }
}