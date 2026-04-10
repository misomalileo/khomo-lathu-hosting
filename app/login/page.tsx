// app/login/page.tsx
'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Shield, 
  Zap, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard');
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">Khomo Lathu</span>
          </div>
          
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                Launch Your Property
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Business Online
                </span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Join thousands of property owners who trust Khomo Lathu for professional hosting
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "10 GB free storage included",
                "100 GB monthly bandwidth",
                "Free SSL certificate",
                "Global CDN network",
                "24/7 security monitoring"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-2">Trusted by 5,000+ users</span>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to manage your hosting</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-400">Sign in to your account</p>
            </div>
            
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3b82f6',
                      brandAccent: '#8b5cf6',
                      brandButtonText: 'white',
                      defaultButtonBackground: 'transparent',
                      defaultButtonBackgroundHover: 'rgba(255,255,255,0.05)',
                      inputBackground: 'rgba(15, 23, 42, 0.6)',
                      inputBorder: 'rgba(255,255,255,0.1)',
                      inputBorderHover: 'rgba(59,130,246,0.5)',
                      inputBorderFocus: '#3b82f6',
                      inputText: '#ffffff',
                      inputPlaceholder: '#64748b',
                    },
                    space: {
                      buttonPadding: '14px',
                      inputPadding: '14px',
                    },
                    borderWidths: {
                      buttonBorderWidth: '0px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '12px',
                      inputBorderRadius: '12px',
                    },
                    fonts: {
                      bodyFontFamily: 'Inter, sans-serif',
                      buttonFontFamily: 'Inter, sans-serif',
                      inputFontFamily: 'Inter, sans-serif',
                      labelFontFamily: 'Inter, sans-serif',
                    },
                  },
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                },
              }}
              localization={{
                variables: {
                  sign_up: {
                    email_label: 'Email Address',
                    password_label: 'Create Password',
                    button_label: 'Create Account',
                    loading_button_label: 'Creating account...',
                    email_input_placeholder: 'you@example.com',
                    password_input_placeholder: 'Create a strong password',
                  },
                  sign_in: {
                    email_label: 'Email Address',
                    password_label: 'Your Password',
                    button_label: 'Sign In',
                    loading_button_label: 'Signing in...',
                    email_input_placeholder: 'you@example.com',
                    password_input_placeholder: 'Enter your password',
                  },
                },
              }}
              providers={[]}
            />
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}