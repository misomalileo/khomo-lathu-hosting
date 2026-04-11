'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Globe, Eye, HardDrive, TrendingUp, Plus, LogOut, Home,
  LayoutDashboard, Settings, Users, ChevronRight, Sparkles,
  Shield, Zap, Crown, Rocket, BarChart3, Menu, X
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    websites: 0,
    views: 0,
    storage: 0,
    bandwidth: 0
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        fetchStats(session.user.id);
      }
      setLoading(false);
    });
  }, [router]);

  const fetchStats = async (userId: string) => {
    const { data: websites } = await supabase
      .from('websites')
      .select('*')
      .eq('user_id', userId);
    
    const { data: listings } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId);

    setStats({
      websites: websites?.length || 0,
      views: listings?.reduce((sum, l) => sum + (l.views || 0), 0) || 0,
      storage: (listings?.length || 0) * 0.5,
      bandwidth: 0
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Header Navigation - Responsive */}
      <nav className="relative z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo - Mobile Optimized */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => router.push('/')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl blur-md opacity-50"></div>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
              <div className="hidden xs:block">
                <h1 className="text-sm sm:text-base lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Khomo Lathu
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Enterprise Platform</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
                <div className="relative">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs lg:text-sm text-white font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <p className="text-gray-900 text-sm font-semibold">{user?.email?.split('@')[0]}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <Crown className="w-3 h-3 text-yellow-500" />
                    Free Plan
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 lg:px-4 lg:py-2 bg-red-50 text-red-600 rounded-lg lg:rounded-xl hover:bg-red-100 transition-all text-xs lg:text-sm font-medium flex items-center gap-1 lg:gap-2"
              >
                <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="px-4 space-y-3">
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{user?.email}</p>
                  <p className="text-gray-500 text-sm">Free Plan</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Fully Responsive */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500" />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.email?.split('@')[0]}</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 ml-7 sm:ml-8 md:ml-11">Manage your websites and track your growth</p>
        </div>

        {/* Stats Grid - Responsive 2x2 on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          <div className="group relative transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">Total</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.websites}</p>
              <p className="text-xs sm:text-sm text-gray-600">Active Websites</p>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">All time</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.views}</p>
              <p className="text-xs sm:text-sm text-gray-600">Total Views</p>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">/10 GB</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.storage} MB</p>
              <p className="text-xs sm:text-sm text-gray-600">Storage Used</p>
              <div className="mt-2 sm:mt-3 w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 sm:h-2 rounded-full" style={{ width: `${(stats.storage / 10000) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">/100 GB</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.bandwidth} MB</p>
              <p className="text-xs sm:text-sm text-gray-600">Bandwidth</p>
              <div className="mt-2 sm:mt-3 w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 sm:h-2 rounded-full w-0"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Website Banner - Responsive */}
        <div className="relative mb-8 sm:mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 relative z-10">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" />
                  <span className="text-white/90 text-xs sm:text-sm font-medium">Get started in minutes</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">Create Your First Website</h2>
                <p className="text-white/80 text-xs sm:text-sm">Launch your property website in minutes. No coding required.</p>
              </div>
              <button 
                onClick={() => router.push('/dashboard/create-website')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-purple-600 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Website
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions - Responsive Grid */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="group relative transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Property Listings</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Create and manage your property listings with ease.</p>
              <button 
                onClick={() => router.push('/dashboard/listings')}
                className="text-blue-600 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 group-hover:gap-2 sm:group-hover:gap-3 transition-all"
              >
                Manage Listings
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Website Settings</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Customize your website appearance and branding.</p>
              <button className="text-purple-600 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                Configure
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          <div className="group relative transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer sm:col-span-2 lg:col-span-1">
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Team Members</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Invite team members to manage your websites.</p>
              <button className="text-green-600 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                Invite Members
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Footer - Responsive */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="hidden xs:inline">Free SSL</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
              <span className="hidden xs:inline">Global CDN</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm">
              <HardDrive className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="hidden xs:inline">10GB Storage</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="hidden xs:inline">Analytics</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}