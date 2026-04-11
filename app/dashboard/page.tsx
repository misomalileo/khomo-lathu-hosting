'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Globe, Eye, HardDrive, TrendingUp, Plus, LogOut, Home,
  LayoutDashboard, Settings, Users, ChevronRight, Sparkles,
  Shield, Zap, Crown, Rocket, BarChart3
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
      <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#166534', fontSize: '20px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #dcfce7', padding: '16px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Home style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#064e3b', margin: 0 }}>Khomo Lathu Hosting</h1>
              <p style={{ fontSize: '12px', color: '#047857', margin: 0 }}>Enterprise Grade Platform</p>
            </div>
            <span style={{ padding: '4px 8px', backgroundColor: '#dcfce7', color: '#166534', fontSize: '12px', borderRadius: '999px', border: '1px solid #bbf7d0' }}>PREMIUM FREE</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #dcfce7' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>{user?.email?.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p style={{ color: '#064e3b', fontSize: '14px', fontWeight: '500', margin: 0 }}>{user?.email}</p>
                <p style={{ color: '#047857', fontSize: '12px', margin: 0 }}>Free Plan</p>
              </div>
            </div>
            <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#064e3b', marginBottom: '8px' }}>
            Welcome back, <span style={{ background: 'linear-gradient(135deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.email?.split('@')[0]}</span>
          </h1>
          <p style={{ color: '#047857', fontSize: '18px' }}>Manage your websites and track your growth</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #dcfce7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '16px' }}>🌐</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#064e3b', marginBottom: '4px' }}>{stats.websites}</div>
            <div style={{ color: '#047857' }}>Active Websites</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #dcfce7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '16px' }}>👁️</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#064e3b', marginBottom: '4px' }}>{stats.views}</div>
            <div style={{ color: '#047857' }}>Total Views</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #dcfce7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '16px' }}>💾</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#064e3b', marginBottom: '4px' }}>{stats.storage} MB</div>
            <div style={{ color: '#047857' }}>Storage Used / 10GB</div>
            <div style={{ marginTop: '12px', width: '100%', backgroundColor: '#dcfce7', borderRadius: '999px', height: '8px' }}>
              <div style={{ width: `${(stats.storage / 10000) * 100}%`, backgroundColor: '#10b981', height: '8px', borderRadius: '999px' }}></div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #dcfce7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '16px' }}>📊</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#064e3b', marginBottom: '4px' }}>{stats.bandwidth} MB</div>
            <div style={{ color: '#047857' }}>Bandwidth / 100GB</div>
            <div style={{ marginTop: '12px', width: '100%', backgroundColor: '#dcfce7', borderRadius: '999px', height: '8px' }}>
              <div style={{ width: '0%', backgroundColor: '#f59e0b', height: '8px', borderRadius: '999px' }}></div>
            </div>
          </div>
        </div>

        {/* Create Website Banner */}
        <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '16px', padding: '32px', marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Create Your First Website</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>Launch your property website in minutes. No coding required.</p>
          <button 
            onClick={() => router.push('/dashboard/create-website')}
            style={{ padding: '12px 24px', backgroundColor: 'white', color: '#059669', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
          >
            + Create Website
          </button>
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#064e3b', marginBottom: '24px' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #dcfce7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📋</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#064e3b', marginBottom: '8px' }}>Property Listings</h3>
            <p style={{ color: '#047857', marginBottom: '16px' }}>Create and manage your property listings</p>
            <button 
              onClick={() => router.push('/dashboard/listings')}
              style={{ color: '#059669', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Manage Listings →
            </button>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #dcfce7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚙️</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#064e3b', marginBottom: '8px' }}>Website Settings</h3>
            <p style={{ color: '#047857', marginBottom: '16px' }}>Customize your website appearance</p>
            <button style={{ color: '#059669', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Configure →</button>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #dcfce7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#064e3b', marginBottom: '8px' }}>Team Members</h3>
            <p style={{ color: '#047857', marginBottom: '16px' }}>Invite team members to manage your site</p>
            <button style={{ color: '#059669', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Invite →</button>
          </div>
        </div>
      </div>
    </div>
  );
}