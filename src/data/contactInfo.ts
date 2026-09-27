export const SITE_URL = 'https://lanettix101.github.io/lanetting-web';

export const contactInfo = {
  fullName: 'Luis Antonio de Jesús Lanetti Rodríguez',
  shortName: 'Eng. Luis Lanetti',
  country: 'Venezuela',
  countryCode: 'VE',
  email: 'lanettix101@gmail.com',
  phoneDisplay: '+57 310 303 2400',
  phoneE164: '573103032400',
  get whatsappUrl(): string {
    return `https://wa.me/${this.phoneE164}`;
  },
  calendlyUrl: 'https://calendly.com/lanettix101/30min',
  social: {
    github: 'https://github.com/lanettix101',
    instagram: 'https://instagram.com/lanetting_',
    telegram: 'https://t.me/luiggilr',
    linkedin: 'https://www.linkedin.com/in/luis-lanetti/',
  },
} as const;
