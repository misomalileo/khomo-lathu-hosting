'use client';

import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Home, MapPin, Bed, Bath, DollarSign, Eye, Calendar,
  ArrowLeft, Edit, Trash2, Share2, Heart, Phone, Mail,
  CheckCircle, XCircle
} from 'lucide-react';

export default function ListingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [params.id]);

  const fetchListing = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!error && data) {
      setListing(data);
      // Increment view count
      await supabase
        .from('listings')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', params.id);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    await supabase.from('listings').delete().eq('id', params.id);
    router.push('/dashboard/listings');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Property not found</h2>
          <button
            onClick={() => router.push('/dashboard/listings')}
            className="mt-4 px-4 py-2 text-blue-600"
          >
            ← Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard/listings')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Listings
            </button>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl h-64 md:h-96 mb-8 flex items-center justify-center">
          {listing.images && listing.images[0] ? (
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <Home className="w-20 h-20 text-white/50" />
          )}
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-5 h-5" />
              <span>{listing.location || 'Location not specified'}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">${listing.price}</p>
            <p className="text-gray-500">per month</p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{listing.bedrooms || '?'}</p>
            <p className="text-gray-600 text-sm">Bedrooms</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Bath className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{listing.bathrooms || '?'}</p>
            <p className="text-gray-600 text-sm">Bathrooms</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{listing.views || 0}</p>
            <p className="text-gray-600 text-sm">Total Views</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {new Date(listing.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-600 text-sm">Listed Date</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {listing.description || 'No description provided.'}
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Interested in this property?</h2>
          <p className="text-white/80 mb-6">Contact the landlord for more information</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold flex items-center gap-2 justify-center">
              <Phone className="w-5 h-5" />
              Call Now
            </button>
            <button className="px-6 py-3 bg-white/20 border border-white rounded-xl font-semibold flex items-center gap-2 justify-center">
              <Mail className="w-5 h-5" />
              Send Email
            </button>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Property?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone. This property will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}