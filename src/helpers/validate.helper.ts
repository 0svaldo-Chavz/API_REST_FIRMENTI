import { validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";


export const validateResult = (validations: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      status: 400,
      message: `Validation failed`,
      errors: errors.array(),
    });
  };
};