'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Globe, 
  Eye, 
  HardDrive, 
  TrendingUp,
  Plus,
  LogOut,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  Crown,
  Rocket,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Khomo Lathu Hosting
                </h1>
                <p className="text-xs text-gray-500">Enterprise Grade Platform</p>
              </div>
            </div>
            
            {/* User Section */}
            <div className="flex items-center gap-4">
              <div className="group relative">
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50"></div>
                    <div className="relative w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm text-white font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-gray-900 text-sm font-semibold">{user?.email?.split('@')[0]}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                      <Crown className="w-3 h-3 text-yellow-500" />
                      Free Plan
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all text-sm font-medium flex items-center gap-2 border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section with 3D Effect */}
        <div className="mb-10 transform transition-all duration-500 hover:translate-x-2">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.email?.split('@')[0]}</span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-11">Manage your websites and track your growth in real-time</p>
        </div>

        {/* Stats Grid with 3D Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">This month</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-gray-600">Active Websites</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+0 from last month</span>
              </div>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">All time</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-gray-600">Total Views</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <BarChart3 className="w-3 h-3" />
                <span>Start getting traffic</span>
              </div>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <HardDrive className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Limit 10 GB</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">0 MB</p>
              <p className="text-gray-600">Storage Used</p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-0"></div>
              </div>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Limit 100 GB</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">0 MB</p>
              <p className="text-gray-600">Bandwidth Used</p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-0"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Website Banner with 3D Effect */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-5 h-5 text-white animate-bounce" />
                  <span className="text-white/90 text-sm font-medium">Get started in minutes</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Create Your First Website</h2>
                <p className="text-white/80">Launch your property website in minutes. No coding required.</p>
              </div>
              <button 
                onClick={() => router.push('/dashboard/create-website')}
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group/btn"
              >
                <Plus className="w-5 h-5" />
                Create Website
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative transform transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <LayoutDashboard className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Listings</h3>
              <p className="text-gray-600 mb-4">Create and manage your property listings with ease.</p>
              <button className="text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Manage Listings
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Website Settings</h3>
              <p className="text-gray-600 mb-4">Customize your website appearance and branding.</p>
              <button className="text-purple-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Configure
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Members</h3>
              <p className="text-gray-600 mb-4">Invite team members to manage your websites.</p>
              <button className="text-green-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Invite Members
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Free SSL Certificate</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span>Global CDN Network</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <HardDrive className="w-4 h-4 text-blue-600" />
              <span>10GB Free Storage</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}