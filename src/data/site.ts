// Central site config — contact info and social links live here only.

export const WHATSAPP_NUMBER = '5548991618686';

export const GITHUB_URL = 'https://github.com/carvalhxlucas';
export const LINKEDIN_URL = 'https://linkedin.com/in/carvalhxlucas';

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
