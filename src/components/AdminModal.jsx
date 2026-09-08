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
      setAuthError('Incorrect admin password. Default password is "admin".');
    }
  };

  const handleSave = () => {
    onSaveData(formData);
    setSaveMessage('✅ Changes saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all prices, package details, and contact settings to original defaults?')) {
      const reset = resetStoredData();
      setFormData(reset);
      onSaveData(reset);
      setSaveMessage('🔄 Reset to default prices and packages.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel-cinematic rounded-3xl overflow-hidden border border-blue-500/40 shadow-[0_0_60px_rgba(37,99,235,0.3)] my-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-obsidian-950 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.25)]">
              <i className="ri-lock-2-line"></i>
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white">Pilot Admin Command Dashboard</h3>
              <p className="text-xs font-mono text-slate-300">Manage packages, prices, contact telemetry & site content</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* AUTHENTICATION PROMPT */}
        {!isAuthenticated ? (
          <div className="p-10 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-400 mx-auto mb-4 text-3xl shadow-[0_0_20px_rgba(59,130,246,0.25)]">
              <i className="ri-shield-keyhole-line"></i>
            </div>
            <h4 className="font-display font-black text-2xl text-white">Pilot Access Verification</h4>
            <p className="text-slate-300 text-xs font-mono mt-1 mb-6">
              Enter admin password to update flight package rates and details. <br />
              <span className="text-blue-400 font-bold">(Default Password: admin)</span>
            </p>

            <form onSubmit={handleLogin} className="space-y-4 font-mono">
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-xs font-bold focus:border-blue-400 focus:outline-none"
                autoFocus
              />

              {authError && (
                <p className="text-xs text-red-400 font-bold">{authError}</p>
              )}

              <button
                type="submit"
                className="btn-shimmer w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.65)] transition-all border border-blue-400/30"
              >
                Unlock Command Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="p-6 md:p-8">
            
            {/* Dashboard Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'videography', label: '🎬 Videography Rates', icon: 'ri-movie-2-line' },
                  { id: 'photography', label: '📸 Photography Rates', icon: 'ri-camera-3-line' },
                  { id: 'contact', label: '📞 Telemetry & Policy', icon: 'ri-phone-line' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                      activeTab === t.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/30'
                        : 'bg-obsidian-900 text-slate-300 hover:text-white border border-white/15'
                    }`}
                  >
                    <i className={`${t.icon} text-sm`}></i>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 border border-white/10"
                >
                  <i className="ri-refresh-line text-sm"></i>
                  Reset Defaults
                </button>

                <button
                  onClick={handleSave}
                  className="btn-shimmer px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center gap-1.5 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30"
                >
                  <i className="ri-save-3-line text-sm"></i>
                  Save Changes
                </button>
              </div>
            </div>

            {saveMessage && (
              <div className="my-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold text-center">
                {saveMessage}
              </div>
            )}

            {/* TAB CONTENT: VIDEOGRAPHY */}
            {activeTab === 'videography' && (
              <div className="space-y-6 mt-6 max-h-[60vh] overflow-y-auto pr-2 font-mono">
                {formData.videographyPackages.map((pkg, idx) => (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-obsidian-900 border border-white/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400">Package #{idx + 1} ({pkg.badge})</span>
                      <span className="text-xs text-slate-400">ID: {pkg.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-300 uppercase">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white text-xs font-bold focus:border-blue-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-blue-400 uppercase">Price Tag (e.g. £100)</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].price = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-blue-500/50 text-blue-400 text-xs font-bold focus:border-blue-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-300 uppercase">Duration Tag</label>
                        <input
                          type="text"
                          value={pkg.duration}
                          onChange={(e) => {
                            const updated = [...formData.videographyPackages];
                            updated[idx].duration = e.target.value;
                            setFormData({ ...formData, videographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white text-xs focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-300 uppercase">Tagline Description</label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) => {
                          const updated = [...formData.videographyPackages];
                          updated[idx].tagline = e.target.value;
                          setFormData({ ...formData, videographyPackages: updated });
                        }}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white text-xs focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: PHOTOGRAPHY */}
            {activeTab === 'photography' && (
              <div className="space-y-6 mt-6 max-h-[60vh] overflow-y-auto pr-2 font-mono">
                {formData.photographyPackages.map((pkg, idx) => (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-obsidian-900 border border-white/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400">Photography Package #{idx + 1}</span>
                      <span className="text-xs text-slate-400">ID: {pkg.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-300 uppercase">Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white text-xs font-bold focus:border-blue-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-blue-400 uppercase">Price Tag (e.g. £30)</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].price = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-blue-500/50 text-blue-400 text-xs font-bold focus:border-blue-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-300 uppercase">Photo Count Tag</label>
                        <input
                          type="text"
                          value={pkg.count}
                          onChange={(e) => {
                            const updated = [...formData.photographyPackages];
                            updated[idx].count = e.target.value;
                            setFormData({ ...formData, photographyPackages: updated });
                          }}
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white text-xs focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: CONTACT & POLICY */}
            {activeTab === 'contact' && (
              <div className="space-y-4 mt-6 max-h-[60vh] overflow-y-auto pr-2 font-mono">
                <div>
                  <label className="text-xs font-bold text-slate-200 uppercase">WhatsApp Display Number</label>
                  <input
                    type="text"
                    value={formData.contact.whatsapp}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsapp: e.target.value }
                    })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-white text-sm font-bold focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 uppercase">Base Location</label>
                  <input
                    type="text"
                    value={formData.contact.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, location: e.target.value }
                    })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-white text-sm font-bold focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-blue-400 uppercase">1-Week Advance Notice Policy</label>
                  <textarea
                    rows={3}
                    value={formData.contact.bookingNotice}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, bookingNotice: e.target.value }
                    })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-white text-xs focus:border-blue-400 focus:outline-none"
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

