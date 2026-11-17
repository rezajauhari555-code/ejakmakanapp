import * as SecureStore from 'expo-secure-store';
import { UserSession } from '../types';
import { requestApi } from './api';

const SESSION_KEY = 'ejakmakan_user_session';

export async function loginWithProvider(
  provider: 'google' | 'apple',
  idToken: string,
): Promise<UserSession> {
  const result = await requestApi<{
    token: string;
    user: {
      providerId: string;
      provider: 'google' | 'apple';
      email: string | null;
      name: string;
      avatarUrl: string | null;
    };
  }>(`/api/auth/${provider}`, {
    method: 'POST',
    body: JSON.stringify({ token: idToken }),
  });

  const session: UserSession = {
    token: result.token,
    name: result.user.name,
    email: result.user.email,
    provider: result.user.provider,
    avatarUrl: result.user.avatarUrl,
  };

  await saveStoredSession(session);
  return session;
}

export async function saveStoredSession(session: UserSession): Promise<void> {
  try {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.warn('Gagal menyimpan sesi di SecureStore:', error);
  }
}

export async function getStoredSession(): Promise<UserSession | null> {
  try {
    const raw = await SecureStore.getItemAsync(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserSession;
  } catch (error) {
    console.warn('Gagal membaca sesi dari SecureStore:', error);
    return null;
  }
}

export async function clearStoredSession(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  } catch (error) {
    console.warn('Gagal menghapus sesi dari SecureStore:', error);
  }
}

