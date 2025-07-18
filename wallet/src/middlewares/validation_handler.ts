import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../errors/validation_error";


export const validationHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    next();
}