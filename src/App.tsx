import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainLayout } from './components/MainLayout';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        <PWAInstallPrompt />
      </>
    );
  }

  return (
    <>
      <MainLayout onLogout={() => setIsLoggedIn(false)} />
      <PWAInstallPrompt />
    </>
  );
}