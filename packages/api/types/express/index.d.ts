import { Express } from 'express-serve-static-core';
import { User } from 'src/schemas/user.schema';
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}