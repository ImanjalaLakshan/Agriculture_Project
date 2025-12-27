import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User, Lock, Sprout } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Language = 'en' | 'si' | 'ta';

interface Translations {
  title: string;
  subtitle: string;
  username: string;
  password: string;
  login: string;
  welcome: string;
  description: string;
}

const translations: Record<Language, Translations> = {
  en: {
    title: 'AgroEye',
    subtitle: 'Smart Farming Solutions',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    welcome: 'Welcome Back',
    description: 'Monitor your paddy fields with real-time IoT sensors',
  },
  si: {
    title: 'AgroEye',
    subtitle: 'බුද්ධිමත් ගොවිතැන් විසඳුම්',
    username: 'පරිශීලක නාමය',
    password: 'මුරපදය',
    login: 'ඇතුල් වන්න',
    welcome: 'නැවත පිළිගනිමු',
    description: 'තත්‍ය කාලීන IoT සංවේදක සමඟ ඔබේ කුඹුරු නිරීක්ෂණය කරන්න',
  },
  ta: {
    title: 'AgroEye',
    subtitle: 'புத்திசாலி விவசாய தீர்வுகள்',
    username: 'பயனர் பெயர்',
    password: 'கடவுச்சொல்',
    login: 'உள்நுழைய',
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    description: 'நேரடி IoT சென்சார்கள் மூலம் உங்கள் நெல் வயல்களை கண்காணிக்கவும்',
  },
};

const languageNames: Record<Language, string> = {
  en: 'English',
  si: 'සිංහල',
  ta: 'தமிழ்',
};

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const t = translations[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1655903724829-37b3cd3d4ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRkeSUyMHJpY2UlMjBmaWVsZCUyMGdyZWVufGVufDF8fHx8MTc2Mzk1Mjc0OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Paddy Field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-600/60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Sprout className="w-10 h-10" />
            </div>
            <h1 className="text-white mb-4">AgroEye</h1>
            <p className="text-white/90 text-xl mb-2">Smart Paddy Monitoring</p>
            <p className="text-white/80">Real-time IoT solutions for modern farming</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-green-50 to-white">
        <div className="w-full max-w-md">
          {/* Language Switcher */}
          <div className="flex justify-center gap-2 mb-8">
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-full transition-all text-sm ${
                  language === lang
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-green-700 hover:bg-green-50 border border-green-200'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-green-100">
            {/* Logo and Title - Mobile Only */}
            <div className="text-center mb-8 lg:hidden">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-green-800 mb-2">{t.title}</h1>
              <p className="text-green-600">{t.subtitle}</p>
            </div>

            {/* Welcome Text */}
            <div className="mb-8">
              <h2 className="text-green-800 mb-2">{t.welcome}</h2>
              <p className="text-green-600">{t.description}</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-green-800">
                  {t.username}
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
                    <User className="w-5 h-5" />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
                    placeholder={t.username}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-800">
                  {t.password}
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
                    placeholder={t.password}
                    required
                  />
                </div>
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-green-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-green-300 text-green-600 focus:ring-green-500"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {t.login}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-green-600">
              Don't have an account?{' '}
              <button className="text-green-700 hover:underline">
                Sign up
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-green-700">
            <p className="text-sm">© 2025 AgroEye. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
