import { Request, Response, NextFunction } from "express";
import {JWT_SECRET} from "../config"
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
    user?: any
}
export const auth  = (req:  AuthRequest, res: Response,  next: NextFunction) => {
    const header = req.headers.authorization;
    if(!header) {
        return res.status(401).json({
            msg: "Missing value"
        })
    }
    const token = header.split(" ")[1];
    
    if(!token) {
        return res.status(401).json({
            msg: "Invalid token format"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string);
        req.user = decoded;

        next();

    } catch (e){
         return res.status(401).json({ error: "Invalid token" })
    } 
}