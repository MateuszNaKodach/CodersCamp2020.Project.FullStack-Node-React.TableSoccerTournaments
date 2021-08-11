import { ITokenGenerator } from './ITokenGenerator';
import jwt from 'jsonwebtoken';

export class TokenGenerator implements ITokenGenerator {
  generateToken(email: string, userId: string): string {
    return jwt.sign({ email: email, userId: userId }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });
  }
}
