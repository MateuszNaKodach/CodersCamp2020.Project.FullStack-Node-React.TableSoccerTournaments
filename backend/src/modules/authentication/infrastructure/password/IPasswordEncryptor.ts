export interface IPasswordEncryptor {
  encryptPassword(password: string): Promise<string>;

  comparePasswords(firstPassword: string, secondPassword: string): Promise<boolean>;
}
