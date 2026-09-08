import React, { useState } from 'react';
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
      setAuthError('Incorrect pilot access key. (Default: "admin")');
    }
  };

  const handleSave = () => {
    onSaveData(formData);
    setSaveMessage('✓ Changes saved successfully');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all prices, package details, and contact settings to original defaults?')) {
      const reset = resetStoredData();
      setFormData(reset);
      onSaveData(reset);
      setSaveMessage('↺ Reset to default rates and packages.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-white/15 bg-[#0F1217] text-white shadow-2xl my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#12151B]">
          <div className="flex items-center gap-3">
            <div className="btn-liquid w-9 h-9 rounded-full p-0 flex items-center justify-center text-warm-200 text-sm">
              <i className="ri-shield-keyhole-line"></i>
            </div>
            <div>
              <h3 className="font-display font-medium text-base text-white tracking-tight">Studio Administration</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">Rates, specifications, and operational parameters</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-liquid w-8 h-8 rounded-full p-0 flex items-center justify-center text-zinc-300 hover:text-white"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* AUTHENTICATION PROMPT */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 max-w-sm mx-auto text-center">
            <div className="btn-liquid w-12 h-12 rounded-full p-0 flex items-center justify-center text-warm-200 mx-auto mb-4 text-xl">
              <i className="ri-lock-line"></i>
            </div>
            <h4 className="font-display font-medium text-xl text-white">Pilot Verification</h4>
            <p className="text-zinc-400 text-xs mt-1.5 mb-6">
              Enter password to adjust flight packages and client parameters.
              <span className="block mt-1 text-[11px] font-mono text-zinc-500">Default password: admin</span>
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Access key"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#161A22] border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:border-white/30 focus:outline-none transition-colors"
                autoFocus
              />

              {authError && (
                <p className="text-xs text-rose-400 font-medium">{authError}</p>
              )}

              <button
                type="submit"
                className="btn-liquid-primary w-full py-3.5 text-xs font-semibold tracking-wide"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="p-5 sm:p-8">
            
            {/* Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {[
                  { id: 'videography', label: 'Videography Rates' },
                  { id: 'photography', label: 'Photography Rates' },
                  { id: 'contact', label: 'Contact & Policy' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-4 py-2 text-xs font-semibold transition-all ${
                      activeTab === t.id
                        ? 'btn-liquid-primary shadow-sm'
                        : 'btn-liquid text-zinc-300 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="btn-liquid px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Reset Defaults
                </button>

                <button
                  onClick={handleSave}
                  className="btn-liquid-primary px-4 py-2 text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {saveMessage && (
              <div className="my-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono text-center">
                {saveMessage}
              </div>
            )}

            {/* TAB CONTENT: VIDEOGRAPHY */}
            {activeTab === 'videography' && (
              <div className="space-y-4 mt-6 max-h-[55vh] overflow-y-auto pr-2">
                {formData.videographyPackages.map((pkg, idx) => (
                  <div key={pkg.id} className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">Tier {idx + 1}: {pkg.name}</span>
                      <span className="font-mono text-[11px] text-zinc-500">ID: {pkg.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs focus:border-white/30 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Price (e.g. £100)</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].price = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs font-semibold focus:border-white/30 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Duration</label>
                        <input
                          type="text"
                          value={pkg.duration}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].duration = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs focus:border-white/30 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Tagline / Overview</label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => {
                          const updated = [...formData.videographyPackages];
                          updated[idx].tagline = e.target.value;
                          setFormData({ ...formData, videographyPackages: updated });
                        }}
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: PHOTOGRAPHY */}
            {activeTab === 'photography' && (
              <div className="space-y-4 mt-6 max-h-[55vh] overflow-y-auto pr-2">
                {formData.photographyPackages.map((pkg, idx) => (
                  <div key={pkg.id} className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">Package {idx + 1}: {pkg.name}</span>
                      <span className="font-mono text-[11px] text-zinc-500">ID: {pkg.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs focus:border-white/30 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Price</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].price = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs font-semibold focus:border-white/30 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Photo Count</label>
                        <input
                          type="text"
                          value={pkg.count}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].count = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs focus:border-white/30 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: CONTACT & POLICY */}
            {activeTab === 'contact' && (
              <div className="space-y-4 mt-6 max-h-[55vh] overflow-y-auto pr-2">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">WhatsApp Display Number</label>
                  <input
                    type="text"
                    value={formData.contact.whatsapp}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsapp: e.target.value }
                    })}
                    className="w-full mt-1 px-3.5 py-3 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs font-mono focus:border-white/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Base Location</label>
                  <input
                    type="text"
                    value={formData.contact.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, location: e.target.value }
                    })}
                    className="w-full mt-1 px-3.5 py-3 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs focus:border-white/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Advance Notice Policy</label>
                  <textarea
                    rows={3}
                    value={formData.contact.bookingNotice}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, bookingNotice: e.target.value }
                    })}
                    className="w-full mt-1 px-3.5 py-3 rounded-xl bg-[#161A22] border border-white/10 text-white text-xs focus:border-white/30 focus:outline-none leading-relaxed"
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
