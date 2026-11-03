import { OAuth2Client } from 'google-auth-library';
import appleSigninAuth from 'apple-signin-auth';

const googleClient = new OAuth2Client();

export async function verifyGoogleToken(token) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID belum dikonfigurasi');
  }

  const ticket = await googleClient.verifyIdToken({ idToken: token, audience: clientId });
  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email) {
    throw new Error('Token Google tidak valid');
  }

  return {
    provider: 'google',
    providerId: payload.sub,
    email: payload.email,
    name: payload.name ?? payload.email.split('@')[0],
    avatarUrl: payload.picture ?? null,
  };
}

export async function verifyAppleToken(token) {
  const audience = process.env.APPLE_CLIENT_ID;
  if (!audience) {
    throw new Error('APPLE_CLIENT_ID belum dikonfigurasi');
  }

  const payload = await appleSigninAuth.verifyIdToken(token, { audience });
  if (!payload.sub) {
    throw new Error('Token Apple tidak valid');
  }

  return {
    provider: 'apple',
    providerId: payload.sub,
    email: payload.email ?? null,
    name: payload.email?.split('@')[0] ?? 'Pengguna Apple',
    avatarUrl: null,
  };
}
