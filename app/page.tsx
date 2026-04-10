// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="border-b border-gray-700/50 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Khomo Lathu Hosting
              </h1>
              <span className="ml-2 px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                PREMIUM FREE
              </span>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm text-blue-300">100% Free • No Credit Card Required</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Host Your Property
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Listings for Free</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Get a professional website with custom domain, SSL, and global CDN — completely free. No hidden fees.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all">
              Get Started Free →
            </button>
            <button className="px-8 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 font-semibold hover:bg-gray-800 transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-2xl font-bold text-white">10 GB</div>
            <div className="text-gray-400">Free Storage</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🌐</div>
            <div className="text-2xl font-bold text-white">100 GB</div>
            <div className="text-gray-400">Monthly Bandwidth</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-2xl font-bold text-white">Free SSL</div>
            <div className="text-gray-400">Global CDN Included</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Everything You Need, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Completely Free</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-lg font-semibold text-white mb-2">Custom Domains</h3>
              <p className="text-gray-400 text-sm">Connect your own domain or use your free subdomain</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Free SSL</h3>
              <p className="text-gray-400 text-sm">Automatic SSL certificates for all your websites</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Global CDN</h3>
              <p className="text-gray-400 text-sm">Lightning fast loading worldwide with Cloudflare CDN</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">Track your visitors, views, and engagement</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}