import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateRequest(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body || typeof req.body !== "object") {
            return res.status(400).json({ errors: ["Invalid or missing request body"] });
        }

        const instance = plainToInstance(dtoClass, req.body);
        const errors = await validate(instance);

        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {})).flat();
            return res.status(400).json({ errors: messages });
        }

        req.body = instance;
        next();
    };
}

// export function validateRequest(
//     dtoClass: any,
//     source: "body" | "params" = "body"
// ) {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const data = source === "body" ? req.body : req.params;

//         if (!data || typeof data !== "object") {
//             return res.status(400).json({ errors: ["Invalid or missing request data"] });
//         }

//         const instance = plainToInstance(dtoClass, data);
//         const errors = await validate(instance);

//         if (errors.length > 0) {
//             const messages = errors
//                 .map(err => Object.values(err.constraints || {}))
//                 .flat();
//             return res.status(400).json({ errors: messages });
//         }

//         // Replace the original data with the validated instance
//         if (source === "body") req.body = instance;
//         else req.params = instance as any;

//         next();
//     };
// }

