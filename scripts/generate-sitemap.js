import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { loadEnv } from 'vite';

// Load env vars via Vite
const env = loadEnv('production', process.cwd());
const supabaseUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found in env. Falling back to static sitemap generation.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSitemap() {
  const baseUrl = 'https://setupr.com';
  
  // Static routes
  const staticRoutes = [
    '', '/services', '/about', '/blog', '/contact', '/intake', 
    '/career', '/team', '/guides', '/guides/starting-business-india', 
    '/guides/business-types', '/store', '/store/products', '/apply-loan',
    '/terms', '/privacy', '/refund'
  ];

  console.log('Fetching dynamic data from Supabase...');

  // Fetch dynamic routes concurrently
  const [
    { data: services },
    { data: blogs },
    { data: products },
    { data: authors }
  ] = await Promise.all([
    supabase.from('services').select('service_id'),
    supabase.from('blog_posts').select('slug').eq('is_published', true),
    supabase.from('store_products').select('slug').eq('is_active', true),
    supabase.from('authors').select('slug').eq('is_active', true)
  ]);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const addUrl = (path, priority = '0.8', changefreq = 'monthly') => {
    xml += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  };

  // Add static
  staticRoutes.forEach(route => {
    const priority = route === '' ? '1.0' : (['/terms', '/privacy', '/refund'].includes(route) ? '0.3' : '0.8');
    addUrl(route, priority, 'weekly');
  });

  // Add dynamic services
  if (services) {
    console.log(`Adding ${services.length} services to sitemap`);
    services.forEach(s => addUrl(`/services/${s.service_id}`, '0.9', 'monthly'));
  }

  // Add blogs
  if (blogs) {
    console.log(`Adding ${blogs.length} blog posts to sitemap`);
    blogs.forEach(b => addUrl(`/blog/${b.slug}`, '0.7', 'weekly'));
  }

  // Add store products
  if (products) {
    console.log(`Adding ${products.length} store products to sitemap`);
    products.forEach(p => addUrl(`/store/products/${p.slug}`, '0.8', 'weekly'));
  }

  // Add team members
  if (authors) {
    console.log(`Adding ${authors.length} authors to sitemap`);
    authors.forEach(a => addUrl(`/team/${a.slug}`, '0.6', 'monthly'));
  }

  xml += `</urlset>`;

  fs.writeFileSync('public/sitemap.xml', xml);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
});
