import { IPasswordEncryptor } from './IPasswordEncryptor';
import bcrypt from 'bcrypt';

export class PasswordEncryptor implements IPasswordEncryptor {
  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(firstPassword: string, secondPassword: string): Promise<boolean> {
    return await bcrypt.compare(firstPassword, secondPassword);
  }
}
