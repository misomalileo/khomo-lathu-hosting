'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ArrowLeft, Plus, Image, MapPin, Bed, Bath, DollarSign, 
  Home, CheckCircle, AlertCircle, Upload, X
} from 'lucide-react';

export default function CreateWebsitePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
  // Form fields
  const [subdomain, setSubdomain] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);

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
      setMessageType('error');
      return;
    }

    if (!propertyName) {
      setMessage('Please enter a property name');
      setMessageType('error');
      return;
    }

    setIsCreating(true);
    setMessage('Creating your website and listing...');
    setMessageType('');

    try {
      // Step 1: Create website
      const { data: websiteData, error: websiteError } = await supabase
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

      if (websiteError) throw new Error(websiteError.message);

      // Step 2: Create listing
      const { error: listingError } = await supabase
        .from('listings')
        .insert([
          {
            user_id: user?.id,
            website_id: websiteData[0].id,
            title: propertyName,
            description: description,
            price: parseFloat(price) || 0,
            bedrooms: parseInt(bedrooms) || 0,
            bathrooms: parseInt(bathrooms) || 0,
            location: location,
            images: images,
            status: 'active'
          }
        ]);

      if (listingError) throw new Error(listingError.message);

      setMessage('✅ Success! Website and property listing created!');
      setMessageType('success');
      
      setTimeout(() => {
        router.push('/dashboard/listings');
      }, 2000);

    } catch (error: any) {
      setMessage('❌ Error: ' + error.message);
      setMessageType('error');
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Light Theme */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1 sm:p-2"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="w-px h-5 sm:h-6 bg-gray-300"></div>
            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Create New Property Listing</h1>
          </div>
        </div>
      </header>

      {/* Main Content - Light Theme */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-5 sm:p-6 md:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Property Details</h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Fill in the information about your property</p>

          {/* Subdomain */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Website Address <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                placeholder="myproperty"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base bg-white"
              />
              <span className="text-gray-500 text-sm sm:text-base text-center sm:text-left">.khomolathu.com</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Only lowercase letters, numbers, and hyphens</p>
          </div>

          {/* Property Name */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Property Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Sunset Villa Apartments"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base bg-white"
            />
          </div>

          {/* Description */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Description
            </label>
            <textarea
              placeholder="Describe your property - location, amenities, features, etc."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base resize-none bg-white"
            ></textarea>
          </div>

          {/* Price, Bedrooms, Bathrooms - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-5 sm:mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> Price / Month
              </label>
              <input
                type="number"
                placeholder="1500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base flex items-center gap-1">
                <Bed className="w-4 h-4" /> Bedrooms
              </label>
              <input
                type="number"
                placeholder="3"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base flex items-center gap-1">
                <Bath className="w-4 h-4" /> Bathrooms
              </label>
              <input
                type="number"
                placeholder="2"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base bg-white"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Location
            </label>
            <input
              type="text"
              placeholder="e.g., Lilongwe, Malawi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base bg-white"
            />
          </div>

          {/* Preview Card - Light Theme */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
            <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Preview</h3>
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="w-full h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3 flex items-center justify-center">
                <Image className="w-8 h-8 sm:w-10 sm:h-10 text-white/50" />
              </div>
              <h4 className="font-bold text-gray-900 text-base sm:text-lg">{propertyName || 'Your Property Name'}</h4>
              <p className="text-gray-500 text-xs sm:text-sm">{location || 'Your Location'}</p>
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {bedrooms || '?'} beds</span>
                <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {bathrooms || '?'} baths</span>
                <span className="font-bold text-blue-600 flex items-center gap-1"><DollarSign className="w-3 h-3" /> ${price || '?'}/month</span>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
              messageType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
              messageType === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 
              'bg-blue-50 text-blue-600 border border-blue-200'
            }`}>
              {messageType === 'success' ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : 
               messageType === 'error' ? <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : null}
              {message}
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreateWebsite}
            disabled={isCreating}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 text-sm sm:text-base"
          >
            {isCreating ? 'Creating...' : 'Create Website & Listing →'}
          </button>

          <p className="text-center text-gray-400 text-xs sm:text-sm mt-5 sm:mt-6">
            Your website will be live at: <span className="text-blue-600 font-medium">{subdomain || 'your-name'}.khomolathu.com</span>
          </p>
        </div>
      </main>
    </div>
  );
}