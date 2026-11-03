import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { verifyAppleToken, verifyGoogleToken } from './services/providerAuth.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const tokenSchema = z.object({ token: z.string().min(20) });

function issueAppToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET belum dikonfigurasi');
  }

  return jwt.sign(
    { sub: user.providerId, provider: user.provider, email: user.email },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' },
  );
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'ejakmakan-api' });
});

async function handleProviderLogin(request, response, providerVerifier) {
  const parsed = tokenSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ message: 'Token provider wajib diisi' });
  }

  try {
    const user = await providerVerifier(parsed.data.token);
    const token = issueAppToken(user);
    return response.json({ token, user });
  } catch (error) {
    return response.status(401).json({
      message: error instanceof Error ? error.message : 'Token provider tidak valid',
    });
  }
}

app.post('/api/auth/google', (request, response) =>
  handleProviderLogin(request, response, verifyGoogleToken),
);

app.post('/api/auth/apple', (request, response) =>
  handleProviderLogin(request, response, verifyAppleToken),
);

export default app;
