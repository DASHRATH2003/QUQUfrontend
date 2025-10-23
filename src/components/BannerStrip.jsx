import React, { useEffect, useRef, useState } from 'react';
import api from '../utils/axios';

const BannerStrip = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/api/banners');
        setBanners(data.banners || []);
      } catch (error) {
        console.error('Failed to load banners', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Auto scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const id = setInterval(() => {
      pos += 1;
      if (pos >= el.scrollWidth - el.clientWidth) pos = 0;
      el.scrollLeft = pos;
    }, 20);
    return () => clearInterval(id);
  }, [banners.length]);

  if (!banners.length) return null;

  return (
    <div className="w-full bg-white py-4 border-y">
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar px-4">
        {banners.map((b) => (
          <div key={b._id} className="flex-shrink-0 w-[320px] md:w-[420px] border rounded-lg shadow-sm bg-gray-50">
            <img src={b.imageUrl} alt={b.title || 'Banner image'} className="h-40 w-full rounded-t-lg object-cover" />
            <div className="p-3">
              {b.title && <h3 className="text-lg font-semibold text-gray-900">{b.title}</h3>}
              {b.description && <p className="mt-1 text-sm text-gray-600 line-clamp-3">{b.description}</p>}
              <div className="mt-3">
                <a
                  href={b.linkUrl || '/shop'}
                  target={b.linkUrl ? '_blank' : undefined}
                  rel={b.linkUrl ? 'noopener noreferrer' : undefined}
                  className="inline-block px-4 py-2 rounded-md bg-pink-200 text-black font-medium hover:bg-pink-300 transition-colors"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerStrip;