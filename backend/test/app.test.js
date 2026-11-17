import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Ejakmakan Backend API', () => {
  it('GET /api/health mengembalikan status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', service: 'ejakmakan-api' });
  });

  it('POST /api/auth/google menolak request tanpa token', async () => {
    const res = await request(app).post('/api/auth/google').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Token provider wajib diisi');
  });

  it('POST /api/auth/apple menolak request tanpa token', async () => {
    const res = await request(app).post('/api/auth/apple').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Token provider wajib diisi');
  });

  it('POST /api/auth/whatsapp/request-otp mengirim OTP sukses', async () => {
    const res = await request(app)
      .post('/api/auth/whatsapp/request-otp')
      .send({ phone: '08123456789' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/auth/whatsapp/verify-otp memverifikasi demo OTP 123456', async () => {
    const res = await request(app)
      .post('/api/auth/whatsapp/verify-otp')
      .send({ phone: '08123456789', otp: '123456' });
    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe('Dimas Pratama');
    expect(res.body.token).toBeDefined();
  });

  it('GET /api/restaurants mengembalikan daftar restoran Bandung', async () => {
    const res = await request(app).get('/api/restaurants');
    expect(res.status).toBe(200);
    expect(res.body.total).toBeGreaterThanOrEqual(5);
    expect(res.body.restaurants.length).toBeGreaterThanOrEqual(5);
  });

  it('GET /api/restaurants/kopi-sapa mengembalikan detail Kopi Sapa dengan menu editor', async () => {
    const res = await request(app).get('/api/restaurants/kopi-sapa');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Kopi Sapa & Roastery');
    expect(res.body.editorChoiceMenu.length).toBe(3);
  });
});
