'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateWebsitePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subdomain, setSubdomain] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [location, setLocation] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });
  }, [router]);

  const handleCreateWebsite = async () => {
    if (!subdomain) {
      setMessage('Please enter a subdomain name');
      return;
    }

    setIsCreating(true);
    setMessage('Creating your website...');

    // Save to Supabase
    const { data, error } = await supabase
      .from('websites')
      .insert([
        {
          user_id: user?.id,
          subdomain: subdomain.toLowerCase(),
          template_id: 'property-listing',
          published: false,
        },
      ])
      .select();

    if (error) {
      setMessage('Error: ' + error.message);
      setIsCreating(false);
    } else {
      setMessage(`✅ Website created! Your site will be at: ${subdomain}.khomolathu.com`);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-900">Create New Website</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Listing Website</h2>
          <p className="text-gray-600 mb-8">Create a beautiful website for your property in minutes.</p>

          {/* Subdomain */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Your Website Address <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="myproperty"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-500">.khomolathu.com</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Only lowercase letters, numbers, and hyphens</p>
          </div>

          {/* Property Name */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Property Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Sunset Villa Apartments"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your property..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Price, Bedrooms, Bathrooms Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price / Month</label>
              <input
                type="text"
                placeholder="$1,500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                placeholder="3"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                placeholder="2"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., Lilongwe, Malawi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preview Card */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">Preview</h3>
            <div className="bg-white rounded-lg p-4 border">
              <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3"></div>
              <h4 className="font-bold text-gray-900">{propertyName || 'Your Property Name'}</h4>
              <p className="text-gray-500 text-sm">{location || 'Your Location'}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>{bedrooms || '?'} beds</span>
                <span>{bathrooms || '?'} baths</span>
                <span className="font-bold text-blue-600">{price || '$?'}/month</span>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {message}
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreateWebsite}
            disabled={isCreating}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create Website →'}
          </button>

          <p className="text-center text-gray-400 text-sm mt-6">
            Your website will be live at: <span className="text-blue-600">{subdomain || 'your-name'}.khomolathu.com</span>
          </p>
        </div>
      </main>
    </div>
  );
}