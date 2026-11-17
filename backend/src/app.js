import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { verifyAppleToken, verifyGoogleToken } from './services/providerAuth.js';
import { BANDUNG_RESTAURANTS, THEMATIC_COLLECTIONS } from './data/restaurants.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const tokenSchema = z.object({ token: z.string().min(20) });
const waRequestSchema = z.object({ phone: z.string().min(9) });
const waVerifySchema = z.object({ phone: z.string().min(9), otp: z.string().length(6) });

function issueAppToken(user) {
  const secret = process.env.JWT_SECRET || 'ejakmakan-super-secret-jwt-key-2026';
  return jwt.sign(
    { sub: user.providerId || user.id, provider: user.provider, email: user.email },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' },
  );
}

// Health Check
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'ejakmakan-api' });
});

// Provider Auth (Google & Apple)
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

// WhatsApp OTP Authentication
app.post('/api/auth/whatsapp/request-otp', (request, response) => {
  const parsed = waRequestSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ message: 'Nomor WhatsApp tidak valid (min 9 digit)' });
  }

  // Demo OTP simulation (fixed 123456)
  return response.json({
    success: true,
    message: 'Kode OTP verifikasi telah dikirimkan ke WhatsApp Anda.',
    expiresInSeconds: 300,
  });
});

app.post('/api/auth/whatsapp/verify-otp', (request, response) => {
  const parsed = waVerifySchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ message: 'Nomor WhatsApp dan 6 digit OTP wajib diisi' });
  }

  const { phone, otp } = parsed.data;

  // In demo environment, valid OTP is 123456
  if (otp !== '123456') {
    return response.status(401).json({ message: 'Kode OTP yang dimasukkan salah. Gunakan 123456 untuk demo.' });
  }

  const user = {
    id: `user-wa-${phone.slice(-4)}`,
    name: 'Dimas Pratama',
    phone: phone,
    email: 'dimas.pratama@ejakmakan.id',
    provider: 'whatsapp',
    foodieLevel: 4,
    foodieTitle: 'Foodie Explorer',
  };

  const token = issueAppToken(user);
  return response.json({
    token,
    user,
    message: 'Verifikasi WhatsApp berhasil.',
  });
});

// Restaurants API
app.get('/api/restaurants', (request, response) => {
  const { category, search, halal } = request.query;

  let results = [...BANDUNG_RESTAURANTS];

  if (category && category !== 'Semua') {
    results = results.filter((r) => r.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (halal === 'true') {
    results = results.filter((r) => r.isHalal);
  }

  return response.json({
    total: results.length,
    restaurants: results,
  });
});

app.get('/api/restaurants/:id', (request, response) => {
  const { id } = request.params;
  const restaurant = BANDUNG_RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) {
    return response.status(404).json({ message: 'Restoran tidak ditemukan' });
  }

  return response.json(restaurant);
});

// Recommendations API
app.get('/api/recommendations', (request, response) => {
  const { mood, budget } = request.query;

  let recommendations = [...BANDUNG_RESTAURANTS];

  if (budget && budget !== 'Semua') {
    recommendations = recommendations.filter((r) => r.budgetCategory === budget);
  }

  return response.json({
    mood: mood || 'Nongkrong Santai',
    budget: budget || 'Semua',
    topPicks: recommendations.slice(0, 4),
  });
});

// Collections API
app.get('/api/collections', (_request, response) => {
  return response.json({
    collections: THEMATIC_COLLECTIONS,
  });
});

export default app;
