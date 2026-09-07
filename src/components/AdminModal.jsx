import React, { useState } from 'react';
import { Lock, X, Check, Save, RotateCcw, DollarSign, Phone, Shield, Edit, Plus, Trash2 } from 'lucide-react';
import { resetStoredData } from '../utils/initialData';

export default function AdminModal({ isOpen, onClose, siteData, onSaveData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('videography');
  const [formData, setFormData] = useState(siteData);
  const [saveMessage, setSaveMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === formData.adminPassword || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect admin password. Default is "admin".');
    }
  };

  const handleSave = () => {
    onSaveData(formData);
    setSaveMessage('✅ Changes saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all prices, package text, and contact details to original defaults?')) {
      const reset = resetStoredData();
      setFormData(reset);
      onSaveData(reset);
      setSaveMessage('🔄 Reset to default prices and packages.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-gold-500/40 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-obsidian-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Pilot Admin Control Panel</h3>
              <p className="text-xs text-slate-400">Manage package prices, contact info, and site content</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGIN FORM IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-2xl text-white">Admin Authentication</h4>
            <p className="text-slate-400 text-xs mt-1 mb-6">
              Enter your admin password to edit prices and website details. <br />
              <span className="text-gold-400 font-semibold">(Default password: admin)</span>
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-sm focus:border-gold-500 focus:outline-none"
                autoFocus
              />

              {authError && (
                <p className="text-xs text-red-400 font-semibold">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-gold-gradient text-obsidian-950 shadow-lg hover:opacity-95"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="p-6 md:p-8">
            
            {/* Dashboard Tabs & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'videography', label: '🎬 Videography Prices' },
                  { id: 'photography', label: '📸 Photography Prices' },
                  { id: 'contact', label: '📞 Contact & Policy' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === t.id
                        ? 'bg-gold-gradient text-obsidian-950 shadow-md'
                        : 'bg-obsidian-850 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-obsidian-950 flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>

            {saveMessage && (
              <div className="my-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center">
                {saveMessage}
              </div>
            )}

            {/* TAB CONTENT: VIDEOGRAPHY */}
            {activeTab === 'videography' && (
              <div className="space-y-6 mt-6 max-h-[60vh] overflow-y-auto pr-2">
                {formData.videographyPackages.map((pkg, idx) => (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-obsidian-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400">Package #{idx + 1} ({pkg.badge})</span>
                      <span className="text-xs text-slate-500">ID: {pkg.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-900 border border-slate-700 text-white text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gold-400">Price Display (e.g. £100)</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].price = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-900 border border-gold-500/50 text-gold-400 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Duration Tag</label>
                        <input
                          type="text"
                          value={pkg.duration}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].duration = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400">Tagline Description</label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => {
                          const updated = [...formData.videographyPackages];
                          updated[idx].tagline = e.target.value;
                          setFormData({ ...formData, videographyPackages: updated });
                        }}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: PHOTOGRAPHY */}
            {activeTab === 'photography' && (
              <div className="space-y-6 mt-6 max-h-[60vh] overflow-y-auto pr-2">
                {formData.photographyPackages.map((pkg, idx) => (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-obsidian-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-skyline-400">Photography Package #{idx + 1}</span>
                      <span className="text-xs text-slate-500">ID: {pkg.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-900 border border-slate-700 text-white text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gold-400">Price Display (e.g. £30)</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].price = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-900 border border-gold-500/50 text-gold-400 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400">Photo Count Tag</label>
                        <input
                          type="text"
                          value={pkg.count}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].count = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: CONTACT & POLICY */}
            {activeTab === 'contact' && (
              <div className="space-y-4 mt-6 max-h-[60vh] overflow-y-auto pr-2">
                <div>
                  <label className="text-xs font-bold text-slate-300">WhatsApp Display Number</label>
                  <input
                    type="text"
                    value={formData.contact.whatsapp}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsapp: e.target.value }
                    })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Base Location (Postcode / City)</label>
                  <input
                    type="text"
                    value={formData.contact.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, location: e.target.value }
                    })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-amber-400">1-Week Advance Notice Policy Text</label>
                  <textarea
                    rows={3}
                    value={formData.contact.bookingNotice}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, bookingNotice: e.target.value }
                    })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
