import type { Response } from 'express';
import type { AuthRequest } from '../types/index.js';
export declare const getProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
