import type { Plugin } from 'vite';

/**
 * Vite plugin that replaces %SITE_URL% in HTML with the appropriate URL:
 * - Uses VERCEL_URL (with https://) for all Vercel deployments (production & preview)
 * - Falls back to localhost for local development
 */
export function ogUrlPlugin(): Plugin {
  return {
    name: 'og-url-replace',
    transformIndexHtml(html) {
      const vercelUrl = process.env.VERCEL_URL;

      // VERCEL_URL is automatically provided by Vercel for all deployments
      // It includes the actual deployment URL (custom domain or vercel.app subdomain)
      const siteUrl = vercelUrl
        ? `https://${vercelUrl}`
        : 'http://localhost:3000'; // Fallback for local development

      // Replace all instances of %SITE_URL% with the actual URL
      return html.replace(/%SITE_URL%/g, siteUrl);
    },
  };
}
