import { Request, Response } from "express";

export const indexWelcome = (_req: Request, res: Response): Response => {
  return res.json('Welcome to my API')
}