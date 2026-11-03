import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000';

export default function App() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function handleProviderLogin(provider: 'google' | 'apple') {
    setLoadingProvider(provider);

    try {
      const response = await fetch(`${API_URL}/api/auth/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: 'native-provider-token' }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message ?? 'Login gagal');
      }

      Alert.alert('Login berhasil', `Selamat datang, ${result.user.name}`);
    } catch (error) {
      Alert.alert(
        'Login belum siap',
        error instanceof Error ? error.message : 'Tidak dapat terhubung ke server',
      );
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>EJAKMAKAN</Text>
      <Text style={styles.title}>Makan enak, lebih dekat.</Text>
      <Text style={styles.subtitle}>Masuk untuk menemukan pilihan makanan favoritmu.</Text>

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.googleButton]}
          disabled={loadingProvider !== null}
          onPress={() => handleProviderLogin('google')}
        >
          <Text style={styles.googleButtonText}>
            {loadingProvider === 'google' ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.appleButton]}
          disabled={loadingProvider !== null}
          onPress={() => handleProviderLogin('apple')}
        >
          <Text style={styles.appleButtonText}>
            {loadingProvider === 'apple' ? 'Menghubungkan...' : 'Lanjutkan dengan Apple'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.endpoint}>API: {API_URL}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1E8',
    padding: 28,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#D85B3F',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    color: '#201C1A',
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 44,
    maxWidth: 310,
  },
  subtitle: {
    color: '#6E6259',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14,
    maxWidth: 300,
  },
  actions: {
    gap: 12,
    marginTop: 42,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DED4C9',
    borderWidth: 1,
  },
  googleButtonText: {
    color: '#201C1A',
    fontSize: 16,
    fontWeight: '700',
  },
  appleButton: {
    backgroundColor: '#201C1A',
  },
  appleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  endpoint: {
    color: '#A3978D',
    fontSize: 11,
    marginTop: 28,
  },
});
