export const DEFAULT_SITE_DATA = {
  contact: {
    whatsapp: '+44 7432266867',
    cleanNumber: '447432266867',
    location: 'Newcastle NE3',
    coverage: 'Newcastle • Sunderland • Newcastle Sixer Cricket Match & surrounding areas',
    bookingNotice: 'Please book your appointment at least 1 week in advance to allow for CAA airspace pre-flight safety checks.'
  },
  adminPassword: 'admin',
  videographyPackages: [
    {
      id: 'essential',
      name: 'Essential',
      price: '£100',
      tagline: 'Perfect for smaller events and special moments.',
      duration: '2 Hours Coverage',
      badge: 'Starter',
      featured: false,
      features: [
        'Up to 2 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '2 edited videos',
        '50 edited photos',
        'Social-media-ready videos',
        'High-quality digital delivery'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '£250',
      tagline: 'Ideal for larger celebrations & full party coverage.',
      duration: '4 Hours Coverage',
      badge: 'Most Popular',
      featured: true,
      features: [
        'Up to 4 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '3 edited videos',
        '100 edited photos',
        'Longer highlight video',
        'Social-media-ready content',
        'High-quality digital delivery'
      ]
    },
    {
      id: 'fullevent',
      name: 'Full Event',
      price: '£400',
      tagline: 'Complete package from start to finish.',
      duration: 'Up to 6 Hours Coverage',
      badge: 'Complete VIP',
      featured: false,
      features: [
        'Up to 6 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '5 edited videos',
        '200 edited photos',
        'Cinematic highlight video',
        'Social-media-ready content',
        'High-quality digital delivery'
      ]
    }
  ],
  photographyPackages: [
    {
      id: 'drone-photo',
      name: 'Drone Photography',
      price: '£30',
      tagline: 'Stunning 50MP aerial drone photos',
      count: '10 Edited Photos',
      badge: '50MP Aerial',
      features: [
        'Professional aerial drone photography',
        '10 high-quality drone photos',
        '50MP Dual Camera resolution',
        'Professional photo editing',
        'Digital delivery'
      ]
    },
    {
      id: 'iphone-photo',
      name: 'iPhone Photography',
      price: '£25',
      tagline: 'High-quality ground event photography',
      count: '10 Edited Photos',
      badge: 'iPhone 17 Pro',
      features: [
        'Professional photography using iPhone 17 Pro',
        '10 high-quality photos',
        'Ground-level portraits & candid moments',
        'Professional photo editing',
        'Digital delivery'
      ]
    }
  ]
};

const STORAGE_KEY = 'airvibe_site_config_v1';

export function getStoredData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_SITE_DATA;
  } catch (e) {
    console.error('Failed to load local config', e);
    return DEFAULT_SITE_DATA;
  }
}

export function saveStoredData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save config', e);
  }
}

export function resetStoredData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset config', e);
  }
  return DEFAULT_SITE_DATA;
}
