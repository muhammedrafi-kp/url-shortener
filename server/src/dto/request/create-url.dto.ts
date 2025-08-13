import { IsString, IsUrl } from "class-validator";

export class UrlDto {
    @IsString({ message: "originalUrl must be a string" })
    @IsUrl({}, { message: "originalUrl must be a valid URL" })
    originalUrl!: string;
}
