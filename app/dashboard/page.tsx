// app/dashboard/page.tsx
'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  Eye, 
  HardDrive, 
  Plus, 
  Settings, 
  LogOut,
  Home,
  TrendingUp,
  Users,
  Calendar,
  ChevronRight
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Khomo Lathu Hosting
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-slate-300 text-sm hidden sm:inline">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-all group"
              >
                <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Welcome back, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-slate-400 mt-1">Here's what's happening with your websites today</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Globe}
            label="Active Websites"
            value="0"
            trend="+0 this month"
            color="blue"
          />
          <StatCard 
            icon={Eye}
            label="Total Views"
            value="0"
            trend="No views yet"
            color="purple"
          />
          <StatCard 
            icon={HardDrive}
            label="Storage Used"
            value="0 MB"
            trend="of 10 GB"
            color="green"
          />
          <StatCard 
            icon={TrendingUp}
            label="Bandwidth"
            value="0 MB"
            trend="of 100 GB"
            color="orange"
          />
        </div>

        {/* Create Website Card */}
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Create Your First Website</h2>
              <p className="text-slate-300">Launch your property website in minutes. No coding required.</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 group">
              <Plus className="w-5 h-5" />
              Create Website
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard 
            icon={LayoutDashboard}
            title="Property Listings"
            description="Create and manage your property listings"
            action="Manage Listings"
          />
          <QuickActionCard 
            icon={Settings}
            title="Website Settings"
            description="Customize your website appearance"
            action="Configure"
          />
          <QuickActionCard 
            icon={Users}
            title="Team Members"
            description="Invite team members to manage your site"
            action="Invite"
          />
        </div>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, trend, color }: any) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
    green: "from-green-500/20 to-green-600/10 border-green-500/20",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-500/20",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm rounded-xl p-6 border`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-6 h-6 text-white/70" />
        <span className="text-xs text-slate-400">{trend}</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}

// Quick Action Card Component
function QuickActionCard({ icon: Icon, title, description, action }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all group cursor-pointer">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <button className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        {action} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}