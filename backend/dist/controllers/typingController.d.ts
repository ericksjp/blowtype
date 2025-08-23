import type { Response } from 'express';
import type { AuthRequest } from '../types/index.js';
export declare const submitTypingResult: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTypingHistory: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTypingStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
