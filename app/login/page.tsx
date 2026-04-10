'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, CheckCircle, Star, Crown, Rocket } from 'lucide-react';

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Simple Grid Overlay */}
      <div className="absolute inset-0 opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Premium Brand Section */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"
        >
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-32 right-20 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"></div>
              <div>
                <div className="text-white font-semibold">Premium Plan</div>
                <div className="text-white/60 text-sm">2,345 users</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-32 left-20 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-white font-semibold">99.9% Uptime</div>
                <div className="text-white/60 text-sm">Global CDN</div>
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">Khomo Lathu</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">Enterprise</span>
            </motion.div>
            
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                  Launch Your
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Digital Empire
                  </span>
                </h1>
                <p className="text-white/70 text-xl leading-relaxed">
                  Join the future of property hosting with enterprise-grade infrastructure
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                {[
                  { icon: Rocket, text: "10 GB Free Storage" },
                  { icon: Zap, text: "100 GB Monthly Bandwidth" },
                  { icon: Shield, text: "Free SSL + DDoS Protection" },
                  { icon: Globe, text: "Global CDN Network" }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-white/80 text-lg">{feature.text}</span>
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-4 text-white/40 text-sm"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>Trusted by 10,000+ creators worldwide</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8"
        >
          <div className="w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8 lg:hidden"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/60">Sign in to your account</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="hidden lg:block text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-white/60">Sign in to continue your journey</p>
              </div>
              
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#8b5cf6',
                        brandAccent: '#ec4899',
                        brandButtonText: 'white',
                        defaultButtonBackground: 'rgba(255,255,255,0.05)',
                        defaultButtonBackgroundHover: 'rgba(255,255,255,0.1)',
                        inputBackground: 'rgba(255,255,255,0.05)',
                        inputBorder: 'rgba(255,255,255,0.1)',
                        inputBorderHover: 'rgba(139,92,246,0.5)',
                        inputBorderFocus: '#8b5cf6',
                        inputText: '#ffffff',
                        inputPlaceholder: 'rgba(255,255,255,0.4)',
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
                        borderRadiusButton: '16px',
                        inputBorderRadius: '12px',
                      },
                    },
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
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-white/40 text-sm mt-6"
            >
              By continuing, you agree to our Terms of Service and Privacy Policy
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}