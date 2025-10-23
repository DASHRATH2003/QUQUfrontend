import React, { useEffect, useState } from 'react';
import adminApi from '../../utils/adminAxios';
import { toast } from 'react-hot-toast';

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', linkUrl: '', order: 0, isActive: true, imageUrl: '' });
  const [file, setFile] = useState(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.get('/api/admin/banners');
      setBanners(data.banners || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('linkUrl', form.linkUrl);
      fd.append('order', form.order);
      fd.append('isActive', form.isActive);
      if (file) {
        fd.append('image', file);
      } else if (form.imageUrl) {
        fd.append('imageUrl', form.imageUrl);
      }

      const { data } = await adminApi.post('/api/admin/banners', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Banner created');
      setForm({ title: '', description: '', linkUrl: '', order: 0, isActive: true, imageUrl: '' });
      setFile(null);
      setBanners([data.banner, ...banners]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create banner');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, update) => {
    try {
      const { data } = await adminApi.put(`/api/admin/banners/${id}`, update);
      setBanners((prev) => prev.map((b) => (b._id === id ? data.banner : b)));
      toast.success('Banner updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this banner?')) return;
    try {
      await adminApi.delete(`/api/admin/banners/${id}`);
      setBanners((prev) => prev.filter((b) => b._id !== id));
      toast.success('Banner deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Banners</h2>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
        <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Link URL (optional)" value={form.linkUrl} onChange={(e)=>setForm({...form,linkUrl:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Image URL (optional)" value={form.imageUrl} onChange={(e)=>setForm({...form,imageUrl:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Order" type="number" value={form.order} onChange={(e)=>setForm({...form,order:e.target.value})} />
        <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.isActive} onChange={(e)=>setForm({...form,isActive:e.target.checked})} /> Active
          </label>
          <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded" disabled={loading}>Create</button>
      </form>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((b)=>(
          <div key={b._id} className="border rounded p-3">
            <img src={b.imageUrl} alt={b.title} className="w-full h-40 object-cover rounded" />
            <div className="mt-2">
              <div className="font-medium">{b.title}</div>
              <div className="text-sm text-gray-600">Order: {b.order}</div>
              <div className="text-sm">Active: {b.isActive ? 'Yes' : 'No'}</div>
              {b.linkUrl && <a href={b.linkUrl} target="_blank" className="text-pink-600 text-sm">Preview link</a>}
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-gray-800 text-white rounded" onClick={()=>handleUpdate(b._id,{ isActive: !b.isActive })}>{b.isActive?'Disable':'Enable'}</button>
              <button className="px-3 py-1 bg-gray-200 rounded" onClick={()=>handleUpdate(b._id,{ order: (b.order||0)+1 })}>Order +1</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={()=>handleDelete(b._id)}>Delete</button>
            </div>
          </div>
        ))}
        {!banners.length && <div className="text-gray-500">No banners yet.</div>}
      </div>
    </div>
  );
};

export default AdminBanners;