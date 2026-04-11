'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ArrowLeft, Image, MapPin, Bed, Bath, DollarSign, 
  Home, CheckCircle, AlertCircle
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
      <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#064e3b', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      {/* Header - Green Theme */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #dcfce7', padding: '16px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => router.push('/dashboard')}
            style={{ color: '#047857', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft style={{ width: '20px', height: '20px' }} />
            <span>Back</span>
          </button>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#dcfce7' }}></div>
          <Home style={{ width: '20px', height: '20px', color: '#059669' }} />
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#064e3b', margin: 0 }}>Create New Property Listing</h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #dcfce7', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#064e3b', marginBottom: '8px' }}>Property Details</h2>
          <p style={{ color: '#047857', marginBottom: '32px' }}>Fill in the information about your property</p>

          {/* Subdomain */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#064e3b', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Website Address <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="text"
                placeholder="myproperty"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                style={{ flex: 1, padding: '12px 16px', border: '1px solid #dcfce7', borderRadius: '12px', fontSize: '16px', outline: 'none', backgroundColor: 'white', color: '#064e3b' }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#dcfce7'}
              />
              <span style={{ color: '#047857', fontSize: '14px' }}>.khomolathu.com</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Only lowercase letters, numbers, and hyphens</p>
          </div>

          {/* Property Name */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#064e3b', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Property Name <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Sunset Villa Apartments"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #dcfce7', borderRadius: '12px', fontSize: '16px', outline: 'none', backgroundColor: 'white', color: '#064e3b' }}
              onFocus={(e) => e.target.style.borderColor = '#059669'}
              onBlur={(e) => e.target.style.borderColor = '#dcfce7'}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#064e3b', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              Description
            </label>
            <textarea
              placeholder="Describe your property - location, amenities, features, etc."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #dcfce7', borderRadius: '12px', fontSize: '16px', outline: 'none', resize: 'vertical', backgroundColor: 'white', color: '#064e3b', fontFamily: 'inherit' }}
              onFocus={(e) => e.target.style.borderColor = '#059669'}
              onBlur={(e) => e.target.style.borderColor = '#dcfce7'}
            />
          </div>

          {/* Price, Bedrooms, Bathrooms Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#064e3b', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                <DollarSign style={{ width: '14px', height: '14px', display: 'inline' }} /> Price / Month
              </label>
              <input
                type="number"
                placeholder="1500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #dcfce7', borderRadius: '12px', fontSize: '16px', outline: 'none', backgroundColor: 'white', color: '#064e3b' }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#dcfce7'}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#064e3b', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                <Bed style={{ width: '14px', height: '14px', display: 'inline' }} /> Bedrooms
              </label>
              <input
                type="number"
                placeholder="3"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #dcfce7', borderRadius: '12px', fontSize: '16px', outline: 'none', backgroundColor: 'white', color: '#064e3b' }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#dcfce7'}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#064e3b', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                <Bath style={{ width: '14px', height: '14px', display: 'inline' }} /> Bathrooms
              </label>
              <input
                type="number"
                placeholder="2"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #dcfce7', borderRadius: '12px', fontSize: '16px', outline: 'none', backgroundColor: 'white', color: '#064e3b' }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#dcfce7'}
              />
            </div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: '#064e3b', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
              <MapPin style={{ width: '14px', height: '14px', display: 'inline' }} /> Location
            </label>
            <input
              type="text"
              placeholder="e.g., Lilongwe, Malawi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #dcfce7', borderRadius: '12px', fontSize: '16px', outline: 'none', backgroundColor: 'white', color: '#064e3b' }}
              onFocus={(e) => e.target.style.borderColor = '#059669'}
              onBlur={(e) => e.target.style.borderColor = '#dcfce7'}
            />
          </div>

          {/* Preview Card */}
          <div style={{ backgroundColor: '#f0fdf4', borderRadius: '12px', padding: '20px', border: '1px solid #dcfce7', marginBottom: '32px' }}>
            <h3 style={{ fontWeight: '600', color: '#064e3b', marginBottom: '16px', fontSize: '14px' }}>Preview</h3>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #dcfce7' }}>
              <div style={{ width: '100%', height: '120px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: '40px', height: '40px', color: 'rgba(255,255,255,0.5)' }} />
              </div>
              <h4 style={{ fontWeight: 'bold', color: '#064e3b', fontSize: '18px', marginBottom: '4px' }}>{propertyName || 'Your Property Name'}</h4>
              <p style={{ color: '#047857', fontSize: '14px', marginBottom: '8px' }}>{location || 'Your Location'}</p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#064e3b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bed style={{ width: '14px', height: '14px' }} /> {bedrooms || '?'} beds</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bath style={{ width: '14px', height: '14px' }} /> {bathrooms || '?'} baths</span>
                <span style={{ fontWeight: 'bold', color: '#059669' }}>${price || '?'}/month</span>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div style={{ marginBottom: '24px', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: messageType === 'success' ? '#dcfce7' : messageType === 'error' ? '#fee2e2' : '#dbeafe', color: messageType === 'success' ? '#166534' : messageType === 'error' ? '#991b1b' : '#1e40af', border: `1px solid ${messageType === 'success' ? '#bbf7d0' : messageType === 'error' ? '#fecaca' : '#bfdbfe'}` }}>
              {messageType === 'success' ? <CheckCircle style={{ width: '20px', height: '20px' }} /> : messageType === 'error' ? <AlertCircle style={{ width: '20px', height: '20px' }} /> : null}
              {message}
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreateWebsite}
            disabled={isCreating}
            style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', opacity: isCreating ? 0.5 : 1 }}
          >
            {isCreating ? 'Creating...' : 'Create Website & Listing →'}
          </button>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginTop: '20px' }}>
            Your website will be live at: <span style={{ color: '#059669', fontWeight: '500' }}>{subdomain || 'your-name'}.khomolathu.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}