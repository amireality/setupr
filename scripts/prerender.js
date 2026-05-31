// Post-build prerender: writes per-route dist/<path>/index.html files
// with unique <title>, meta description, canonical, og:*, twitter:*, and a
// minimal SEO body fallback inside <div id="root"> so crawlers see unique
// content per URL. React 18 createRoot().render() replaces the root content
// at hydration, so this never affects users.

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { loadEnv } from 'vite';

const BASE_URL = 'https://setupr.com';
const DIST = path.resolve('dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.warn('[prerender] dist/index.html not found, skipping prerender.');
  process.exit(0);
}

const env = loadEnv('production', process.cwd());
const supabaseUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.VITE_SUPABASE_ANON_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
if (!supabase) {
  console.warn('[prerender] Supabase credentials missing, only static routes will be prerendered.');
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stripMarkdown = (s = '') =>
  String(s)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_`~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const clamp = (s, n) => {
  const t = (s || '').trim();
  if (t.length <= n) return t;
  return t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
};

function buildHtml({ pathname, title, description, ogType = 'website', bodyIntro, jsonLd }) {
  const canonical = `${BASE_URL}${pathname}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(clamp(description, 160));

  let html = template;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);

  // description
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${safeDesc}" />`,
  );

  // canonical
  html = html.replace(
    /<link\s+rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );

  // og:title / og:description / og:url / og:type / twitter equivalents
  const replaceMeta = (re, replacement) => {
    if (re.test(html)) html = html.replace(re, replacement);
    else html = html.replace(/<\/head>/, `    ${replacement}\n  </head>`);
  };
  replaceMeta(
    /<meta\s+property="og:title"[^>]*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  );
  replaceMeta(
    /<meta\s+property="og:description"[^>]*\/>/,
    `<meta property="og:description" content="${safeDesc}" />`,
  );
  replaceMeta(
    /<meta\s+property="og:url"[^>]*\/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  replaceMeta(
    /<meta\s+property="og:type"[^>]*\/>/,
    `<meta property="og:type" content="${ogType}" />`,
  );
  replaceMeta(
    /<meta\s+name="twitter:title"[^>]*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  );
  replaceMeta(
    /<meta\s+name="twitter:description"[^>]*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`,
  );

  // Optional JSON-LD before </head>
  if (jsonLd) {
    const block = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;
    html = html.replace(/<\/head>/, `    ${block}\n  </head>`);
  }

  // SEO body fallback inside <div id="root">. React 18 createRoot replaces
  // this on mount, so it never shows for real users, only for crawlers
  // that read raw HTML (Googlebot, Bing, LinkedIn preview, etc.).
  const introHtml = `
      <main style="max-width:780px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,sans-serif;color:#fff;background:#000;">
        <h1>${safeTitle}</h1>
        <p>${escapeHtml(clamp(bodyIntro || description, 600))}</p>
        <p><a href="${canonical}" style="color:#f97316;">${escapeHtml(canonical)}</a></p>
      </main>`;
  html = html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${introHtml}</div>`,
  );

  return html;
}

function writeRoute(pathname, html) {
  const cleanPath = pathname.replace(/^\//, '').replace(/\/$/, '');
  const outDir = cleanPath === '' ? DIST : path.join(DIST, cleanPath);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html);
}

async function main() {
  let seoMap = {};
  let services = [];
  let blogs = [];
  let products = [];
  let authors = [];

  if (supabase) {
    const [seoRes, sRes, bRes, pRes, aRes] = await Promise.all([
      supabase.from('site_settings').select('key, value').like('key', 'seo_%'),
      supabase.from('services').select('service_id, service_name, description_short, category, sub_category'),
      supabase.from('blog_posts').select('slug, title, excerpt, content, category, author_name, published_at').eq('is_published', true),
      supabase.from('store_products').select('slug, name, short_description, long_description, vendor').eq('is_active', true),
      supabase.from('authors').select('slug, name, title, bio').eq('is_active', true),
    ]);
    seoMap = Object.fromEntries((seoRes.data || []).map((r) => [r.key, r.value]));
    services = sRes.data || [];
    blogs = bRes.data || [];
    products = pRes.data || [];
    authors = aRes.data || [];
  }

  const seo = (page, fallbackTitle, fallbackDesc) => ({
    title: seoMap[`seo_${page}_title`] || fallbackTitle,
    description: seoMap[`seo_${page}_description`] || fallbackDesc,
  });

  const routes = [];

  // Static routes
  const staticDefs = [
    ['/', seo('homepage', 'Setupr | Business Registration & Setup Services in India', 'Company registration, GST, MSME, website, and compliance. All handled for freelancers, consultants, and startups in India.')],
    ['/services', seo('services', 'Business Setup Services | Setupr', 'Explore all business setup services: company registration, GST, MSME, website development, compliance, and more.')],
    ['/about', seo('about', 'About Setupr', "Learn about Setupr's mission to simplify business registration and compliance for Indian entrepreneurs.")],
    ['/blog', seo('blog', 'Setupr Blog', 'Expert guides on company registration, GST, MSME, compliance, and building credibility for Indian founders.')],
    ['/contact', seo('contact', 'Contact Setupr', 'Have questions about business registration or our services? Reach out to the Setupr team.')],
    ['/intake', { title: 'Get Started with Setupr', description: 'Tell us about your business and get a tailored setup plan: registration, GST, MSME, website, and compliance.' }],
    ['/career', seo('career', 'Careers at Setupr', 'Explore fellowship and career opportunities at Setupr. Work directly with founders on real business challenges.')],
    ['/team', seo('team', 'Meet the Setupr Team', 'The experts behind Setupr. Experienced professionals in business registration, compliance, and digital setup.')],
    ['/guides', seo('guides', 'Business Guides | Setupr', 'Step-by-step guides for starting, registering, and growing your business in India.')],
    ['/guides/starting-business-india', { title: 'How to Start a Business in India: Step-by-Step Guide', description: 'Complete walk-through for starting a business in India: structure, registration, GST, MSME, bank account, and compliance.' }],
    ['/guides/business-types', { title: 'Business Types in India: Pvt Ltd, LLP, OPC, Proprietorship', description: 'Compare Indian business structures: Private Limited, LLP, OPC, and Proprietorship. Pick the right one for your goals.' }],
    ['/store', { title: 'Setupr Store: Software & Cloud for Indian Businesses', description: 'Microsoft 365, Google Workspace, Adobe, AWS, Zoho, and more. Software and cloud subscriptions for Indian businesses.' }],
    ['/store/products', { title: 'All Products | Setupr Store', description: 'Browse all software and cloud subscriptions for Indian businesses, billed in INR with GST.' }],
    ['/apply-loan', { title: 'Apply for a Business Loan | Setupr', description: 'Apply for a business loan tailored to Indian startups and small businesses.' }],
    ['/terms', { title: 'Terms of Service | Setupr', description: 'Read the Setupr terms of service.' }],
    ['/privacy', { title: 'Privacy Policy | Setupr', description: 'Read the Setupr privacy policy.' }],
    ['/refund', { title: 'Refund Policy | Setupr', description: 'Read the Setupr refund policy.' }],
  ];
  for (const [p, meta] of staticDefs) {
    routes.push({ pathname: p, title: meta.title, description: meta.description, bodyIntro: meta.description });
  }

  // Services
  for (const s of services) {
    routes.push({
      pathname: `/services/${s.service_id}`,
      title: `${s.service_name} | Setupr`,
      description: s.description_short,
      bodyIntro: s.description_short,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.service_name,
        description: s.description_short,
        provider: { '@type': 'Organization', name: 'Setupr', url: BASE_URL },
        areaServed: 'IN',
        category: s.category,
      },
    });
  }

  // Blog posts
  for (const b of blogs) {
    const intro = b.excerpt || stripMarkdown(b.content).slice(0, 600);
    routes.push({
      pathname: `/blog/${b.slug}`,
      title: `${b.title} | Setupr Blog`,
      description: b.excerpt || stripMarkdown(b.content).slice(0, 160),
      bodyIntro: intro,
      ogType: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: b.title,
        description: b.excerpt,
        author: { '@type': 'Person', name: b.author_name || 'Setupr' },
        datePublished: b.published_at,
        articleSection: b.category,
        mainEntityOfPage: `${BASE_URL}/blog/${b.slug}`,
        publisher: { '@type': 'Organization', name: 'Setupr', url: BASE_URL },
      },
    });
  }

  // Store products
  for (const p of products) {
    const desc = p.short_description || p.long_description?.slice(0, 160) || '';
    routes.push({
      pathname: `/store/products/${p.slug}`,
      title: `${p.name} | Setupr Store`,
      description: desc,
      bodyIntro: p.long_description || desc,
      ogType: 'product',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: desc,
        brand: { '@type': 'Brand', name: p.vendor || 'Setupr' },
      },
    });
  }

  // Authors / team
  for (const a of authors) {
    routes.push({
      pathname: `/team/${a.slug}`,
      title: `${a.name}${a.title ? ` — ${a.title}` : ''} | Setupr`,
      description: a.bio || `${a.name} at Setupr.`,
      bodyIntro: a.bio,
      ogType: 'profile',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: a.name,
        jobTitle: a.title,
        description: a.bio,
        worksFor: { '@type': 'Organization', name: 'Setupr', url: BASE_URL },
        url: `${BASE_URL}/team/${a.slug}`,
      },
    });
  }

  for (const r of routes) {
    const html = buildHtml(r);
    writeRoute(r.pathname, html);
  }
  console.log(`[prerender] wrote ${routes.length} static HTML files into dist/`);
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  // Don't fail the build; the SPA still works without prerender.
  process.exit(0);
});
