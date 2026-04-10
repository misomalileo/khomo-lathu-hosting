'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'black', fontSize: '20px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'white', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563eb, #9333ea)', borderRadius: '12px' }}></div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Khomo Lathu Hosting</h1>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Enterprise Grade Hosting</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #2563eb, #9333ea)', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>{user?.email?.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p style={{ color: '#111827', fontSize: '14px', fontWeight: '500', margin: 0 }}>{user?.email}</p>
                <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>Free Plan</p>
              </div>
            </div>
            <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Welcome back, <span style={{ background: 'linear-gradient(135deg, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.email?.split('@')[0]}</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>Manage your websites and track your growth</p>
        </div>

        {/* Stats - 4 boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '16px' }}>🌐</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>0</div>
            <div style={{ color: '#6b7280' }}>Active Websites</div>
          </div>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '16px' }}>👁️</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>0</div>
            <div style={{ color: '#6b7280' }}>Total Views</div>
          </div>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '16px' }}>💾</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>0 MB</div>
            <div style={{ color: '#6b7280' }}>Storage Used / 10GB</div>
          </div>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '16px' }}>📊</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>0 MB</div>
            <div style={{ color: '#6b7280' }}>Bandwidth / 100GB</div>
          </div>
        </div>

        {/* Create Website Button */}
        <div style={{ background: 'linear-gradient(135deg, #2563eb, #9333ea)', borderRadius: '16px', padding: '32px', marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Create Your First Website</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>Launch your property website in minutes. No coding required.</p>
          <button style={{ padding: '12px 24px', backgroundColor: 'white', color: '#9333ea', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
            + Create Website
          </button>
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📋</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Property Listings</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>Create and manage your property listings</p>
            <button style={{ color: '#2563eb', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Manage Listings →</button>
          </div>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚙️</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Website Settings</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>Customize your website appearance</p>
            <button style={{ color: '#2563eb', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Configure →</button>
          </div>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Team Members</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>Invite team members to manage your site</p>
            <button style={{ color: '#2563eb', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Invite →</button>
          </div>
        </div>
      </div>
    </div>
  );
}