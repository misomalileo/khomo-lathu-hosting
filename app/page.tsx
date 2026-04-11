import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '12px' }}></div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Khomo Lathu Hosting</h1>
            </div>
            <span style={{ padding: '4px 8px', backgroundColor: '#dcfce7', color: '#166534', fontSize: '12px', borderRadius: '999px', border: '1px solid #bbf7d0' }}>
              PREMIUM FREE
            </span>
          </div>
          <Link href="/login">
            <button style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', backgroundColor: '#dbeafe', borderRadius: '999px', marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '999px', marginRight: '8px' }}></span>
            <span style={{ fontSize: '14px', color: '#1d4ed8' }}>100% Free • No Credit Card Required</span>
          </div>
          
          <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>
            Host Your Property
            <span style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Listings for Free</span>
          </h1>
          
          <p style={{ fontSize: '20px', color: '#475569', maxWidth: '672px', margin: '0 auto 40px' }}>
            Get a professional website with custom domain, SSL, and global CDN — completely free. No hidden fees.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/login">
              <button style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
                Get Started Free →
              </button>
            </Link>
            <button style={{ padding: '12px 32px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>
              View Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '80px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚀</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>10 GB</div>
            <div style={{ color: '#64748b' }}>Free Storage</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌐</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>100 GB</div>
            <div style={{ color: '#64748b' }}>Monthly Bandwidth</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a' }}>Free SSL</div>
            <div style={{ color: '#64748b' }}>Global CDN Included</div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ marginTop: '96px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#0f172a', marginBottom: '48px' }}>
            Everything You Need, <span style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Completely Free</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔗</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Custom Domains</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Connect your own domain or use your free subdomain</p>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔒</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Free SSL</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Automatic SSL certificates for all your websites</p>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚡</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Global CDN</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Lightning fast loading worldwide with Cloudflare CDN</p>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Analytics</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Track your visitors, views, and engagement</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}