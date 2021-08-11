export interface ITokenGenerator {
  generateToken(email: string, userId: string): string;
}
