import { IsString, Matches, Length } from "class-validator";

export class ShortCodeParamsDto {
    @IsString()
    @Length(8, 8, { message: "shortCode must be 8 characters long" })
    @Matches(/^[a-f0-9]{8}$/, { message: "shortCode must be a valid hex string" })
    shortCode!: string;
}
