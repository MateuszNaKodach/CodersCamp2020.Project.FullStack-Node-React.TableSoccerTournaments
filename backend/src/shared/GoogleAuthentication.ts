import { OAuth2Client, TokenPayload } from 'google-auth-library';

export const googleAuth: (token: string | undefined) => Promise<void> = async (token: string | undefined) => {
  if (process.env.GOOGLE_CLIENT_ID === undefined) {
    return;
  }
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  if (token === undefined) {
    throw new Error("Token doesn't exists!.");
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload: TokenPayload | undefined = ticket.getPayload();

  if (payload === undefined) {
    throw new Error("Such account doesn't exists!.");
  }

  // const {sub, email, name, picture} = payload;
  // const userId = sub;
  // return {userId, email, fullName: name, photoUrl: picture};
};
