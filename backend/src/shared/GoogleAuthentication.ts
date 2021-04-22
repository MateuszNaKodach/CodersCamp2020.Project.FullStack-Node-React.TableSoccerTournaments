import { OAuth2Client, TokenPayload } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (token: string | undefined) => {
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
