import { Document } from 'mongoose';

interface UserPreferences {
  location?: string;
  salaryRange?: {
    min: number;
    max: number;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        name: string;
        skills?: string[];
        preferences?: UserPreferences;
      } & Document;
    }
  }
} 