
-- Step 1: Add metadata columns to site_settings
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS label text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS field_type text NOT NULL DEFAULT 'text',
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';

-- Step 2: Backfill existing rows with proper labels, field_types, sort_order, descriptions

-- === HOMEPAGE ===
UPDATE site_settings SET label='Hero Headline Prefix', field_type='text', sort_order=1, description='Text before the typer effect (e.g. "Set up your")' WHERE key='homepage_hero_headline_prefix';
UPDATE site_settings SET label='Hero Headline Suffix', field_type='text', sort_order=2, description='Text after the typer effect (e.g. "The right way.")' WHERE key='homepage_hero_headline_suffix';
UPDATE site_settings SET label='Hero Typer Words', field_type='json', sort_order=3, description='JSON array of words for the rotating typer effect' WHERE key='homepage_hero_typer_words';
UPDATE site_settings SET label='Hero Subtitle', field_type='textarea', sort_order=4, description='Paragraph below the hero headline' WHERE key='homepage_hero_subtitle';
UPDATE site_settings SET label='Primary CTA Text', field_type='text', sort_order=5, description='Main call-to-action button text' WHERE key='homepage_cta_primary';
UPDATE site_settings SET label='Secondary CTA Text', field_type='text', sort_order=6, description='Secondary call-to-action button text' WHERE key='homepage_cta_secondary';
UPDATE site_settings SET label='How It Works Title', field_type='text', sort_order=10, description='Section heading for the 3-step process' WHERE key='homepage_how_it_works_title';
UPDATE site_settings SET label='How It Works Subtitle', field_type='textarea', sort_order=11, description='Paragraph below the How It Works title' WHERE key='homepage_how_it_works_subtitle';
UPDATE site_settings SET label='Step 1 Title', field_type='text', sort_order=12, description='' WHERE key='homepage_step1_title';
UPDATE site_settings SET label='Step 1 Description', field_type='textarea', sort_order=13, description='' WHERE key='homepage_step1_desc';
UPDATE site_settings SET label='Step 2 Title', field_type='text', sort_order=14, description='' WHERE key='homepage_step2_title';
UPDATE site_settings SET label='Step 2 Description', field_type='textarea', sort_order=15, description='' WHERE key='homepage_step2_desc';
UPDATE site_settings SET label='Step 3 Title', field_type='text', sort_order=16, description='' WHERE key='homepage_step3_title';
UPDATE site_settings SET label='Step 3 Description', field_type='textarea', sort_order=17, description='' WHERE key='homepage_step3_desc';
UPDATE site_settings SET label='Goal Section Title', field_type='text', sort_order=20, description='' WHERE key='homepage_goal_section_title';
UPDATE site_settings SET label='Goal Section Subtitle', field_type='textarea', sort_order=21, description='' WHERE key='homepage_goal_section_subtitle';
UPDATE site_settings SET label='Goal 1 Title', field_type='text', sort_order=22, description='' WHERE key='homepage_goal_1_title';
UPDATE site_settings SET label='Goal 1 Description', field_type='textarea', sort_order=23, description='' WHERE key='homepage_goal_1_desc';
UPDATE site_settings SET label='Goal 1 Link', field_type='url', sort_order=24, description='' WHERE key='homepage_goal_1_link';
UPDATE site_settings SET label='Goal 1 Skeleton Title', field_type='text', sort_order=25, description='' WHERE key='homepage_goal_1_skeleton_title';
UPDATE site_settings SET label='Goal 1 Skeleton Subtitle', field_type='text', sort_order=26, description='' WHERE key='homepage_goal_1_skeleton_subtitle';
UPDATE site_settings SET label='Goal 2 Title', field_type='text', sort_order=27, description='' WHERE key='homepage_goal_2_title';
UPDATE site_settings SET label='Goal 2 Description', field_type='textarea', sort_order=28, description='' WHERE key='homepage_goal_2_desc';
UPDATE site_settings SET label='Goal 2 Link', field_type='url', sort_order=29, description='' WHERE key='homepage_goal_2_link';
UPDATE site_settings SET label='Goal 2 Skeleton Title', field_type='text', sort_order=30, description='' WHERE key='homepage_goal_2_skeleton_title';
UPDATE site_settings SET label='Goal 2 Skeleton Subtitle', field_type='text', sort_order=31, description='' WHERE key='homepage_goal_2_skeleton_subtitle';
UPDATE site_settings SET label='Goal 3 Title', field_type='text', sort_order=32, description='' WHERE key='homepage_goal_3_title';
UPDATE site_settings SET label='Goal 3 Description', field_type='textarea', sort_order=33, description='' WHERE key='homepage_goal_3_desc';
UPDATE site_settings SET label='Goal 3 Link', field_type='url', sort_order=34, description='' WHERE key='homepage_goal_3_link';
UPDATE site_settings SET label='Goal 3 Skeleton Title', field_type='text', sort_order=35, description='' WHERE key='homepage_goal_3_skeleton_title';
UPDATE site_settings SET label='Goal 3 Skeleton Subtitle', field_type='text', sort_order=36, description='' WHERE key='homepage_goal_3_skeleton_subtitle';
UPDATE site_settings SET label='Service Pillars JSON', field_type='json', sort_order=40, description='JSON array of service pillar cards' WHERE key='homepage_service_pillars';
UPDATE site_settings SET label='Service Pillars Title', field_type='text', sort_order=39, description='Heading above service pillars section' WHERE key='homepage_service_pillars_title';
UPDATE site_settings SET label='Category Highlights JSON', field_type='json', sort_order=41, description='JSON object of category highlight data' WHERE key='homepage_category_highlights';
UPDATE site_settings SET label='Collapsible Services Title', field_type='text', sort_order=42, description='Main heading for collapsible services section' WHERE key='homepage_collapsible_title';
UPDATE site_settings SET label='Collapsible Services Subtitle', field_type='textarea', sort_order=43, description='Subtitle below collapsible services heading' WHERE key='homepage_collapsible_subtitle';
UPDATE site_settings SET label='Bundles Section Title', field_type='text', sort_order=50, description='Heading for recommended bundles' WHERE key='homepage_bundles_title';
UPDATE site_settings SET label='Bundles Section Subtitle', field_type='textarea', sort_order=51, description='Subtitle for recommended bundles' WHERE key='homepage_bundles_subtitle';
UPDATE site_settings SET label='Testimonials Badge', field_type='text', sort_order=55, description='Badge text above testimonials' WHERE key='homepage_testimonials_badge';
UPDATE site_settings SET label='Testimonials Title', field_type='text', sort_order=56, description='Main testimonials heading' WHERE key='homepage_testimonials_title';
UPDATE site_settings SET label='Testimonials Subtitle', field_type='textarea', sort_order=57, description='Subtitle below testimonials heading' WHERE key='homepage_testimonials_subtitle';
UPDATE site_settings SET label='Testimonials Tagline', field_type='text', sort_order=58, description='Tagline shown in testimonials section' WHERE key='homepage_testimonials_tagline';
UPDATE site_settings SET label='Stat 1 Value', field_type='text', sort_order=60, description='' WHERE key='homepage_stat_1_value';
UPDATE site_settings SET label='Stat 1 Label', field_type='text', sort_order=61, description='' WHERE key='homepage_stat_1_label';
UPDATE site_settings SET label='Stat 1 Description', field_type='text', sort_order=62, description='' WHERE key='homepage_stat_1_desc';
UPDATE site_settings SET label='Stat 2 Value', field_type='text', sort_order=63, description='' WHERE key='homepage_stat_2_value';
UPDATE site_settings SET label='Stat 2 Label', field_type='text', sort_order=64, description='' WHERE key='homepage_stat_2_label';
UPDATE site_settings SET label='Stat 2 Description', field_type='text', sort_order=65, description='' WHERE key='homepage_stat_2_desc';
UPDATE site_settings SET label='Stat 3 Value', field_type='text', sort_order=66, description='' WHERE key='homepage_stat_3_value';
UPDATE site_settings SET label='Stat 3 Label', field_type='text', sort_order=67, description='' WHERE key='homepage_stat_3_label';
UPDATE site_settings SET label='Stat 3 Description', field_type='text', sort_order=68, description='' WHERE key='homepage_stat_3_desc';
UPDATE site_settings SET label='Stat 4 Value', field_type='text', sort_order=69, description='' WHERE key='homepage_stat_4_value';
UPDATE site_settings SET label='Stat 4 Label', field_type='text', sort_order=70, description='' WHERE key='homepage_stat_4_label';
UPDATE site_settings SET label='Stat 4 Description', field_type='text', sort_order=71, description='' WHERE key='homepage_stat_4_desc';
UPDATE site_settings SET label='FAQ Section Title', field_type='text', sort_order=80, description='' WHERE key='homepage_faq_title';
UPDATE site_settings SET label='FAQ - Getting Started', field_type='json', sort_order=81, description='JSON array of FAQ items for Getting Started' WHERE key='homepage_faq_getting_started';
UPDATE site_settings SET label='FAQ - Pricing & Process', field_type='json', sort_order=82, description='JSON array of FAQ items for Pricing' WHERE key='homepage_faq_pricing_process';
UPDATE site_settings SET label='FAQ - After Setup', field_type='json', sort_order=83, description='JSON array of FAQ items for After Setup' WHERE key='homepage_faq_after_setup';
UPDATE site_settings SET label='Final CTA Title', field_type='text', sort_order=90, description='' WHERE key='homepage_final_cta_title';
UPDATE site_settings SET label='Final CTA Subtitle', field_type='textarea', sort_order=91, description='' WHERE key='homepage_final_cta_subtitle';
UPDATE site_settings SET label='Hero Title (Legacy)', field_type='text', sort_order=0, description='Legacy field - use Hero Headline Prefix/Suffix instead' WHERE key='homepage_hero_title';
UPDATE site_settings SET label='Trust Badges JSON', field_type='json', sort_order=7, description='JSON array of trust badge objects' WHERE key='homepage_trust_badges';

-- === ABOUT ===
UPDATE site_settings SET label='Hero Title', field_type='text', sort_order=1, description='' WHERE key='about_hero_title';
UPDATE site_settings SET label='Hero Subtitle', field_type='textarea', sort_order=2, description='' WHERE key='about_hero_subtitle';
UPDATE site_settings SET label='Stat 1 Value', field_type='text', sort_order=10, description='' WHERE key='about_stat_1_value';
UPDATE site_settings SET label='Stat 1 Label', field_type='text', sort_order=11, description='' WHERE key='about_stat_1_label';
UPDATE site_settings SET label='Stat 2 Value', field_type='text', sort_order=12, description='' WHERE key='about_stat_2_value';
UPDATE site_settings SET label='Stat 2 Label', field_type='text', sort_order=13, description='' WHERE key='about_stat_2_label';
UPDATE site_settings SET label='Stat 3 Value', field_type='text', sort_order=14, description='' WHERE key='about_stat_3_value';
UPDATE site_settings SET label='Stat 3 Label', field_type='text', sort_order=15, description='' WHERE key='about_stat_3_label';
UPDATE site_settings SET label='Stat 4 Value', field_type='text', sort_order=16, description='' WHERE key='about_stat_4_value';
UPDATE site_settings SET label='Stat 4 Label', field_type='text', sort_order=17, description='' WHERE key='about_stat_4_label';
UPDATE site_settings SET label='Mission Title', field_type='text', sort_order=20, description='' WHERE key='about_mission_title';
UPDATE site_settings SET label='Mission Content', field_type='textarea', sort_order=21, description='' WHERE key='about_mission_content';
UPDATE site_settings SET label='Founder Name', field_type='text', sort_order=30, description='' WHERE key='about_founder_name';
UPDATE site_settings SET label='Founder Title', field_type='text', sort_order=31, description='' WHERE key='about_founder_title';
UPDATE site_settings SET label='Founder Bio', field_type='textarea', sort_order=32, description='' WHERE key='about_founder_bio';
UPDATE site_settings SET label='Value 1 Title', field_type='text', sort_order=40, description='' WHERE key='about_value_1_title';
UPDATE site_settings SET label='Value 1 Description', field_type='textarea', sort_order=41, description='' WHERE key='about_value_1_desc';
UPDATE site_settings SET label='Value 2 Title', field_type='text', sort_order=42, description='' WHERE key='about_value_2_title';
UPDATE site_settings SET label='Value 2 Description', field_type='textarea', sort_order=43, description='' WHERE key='about_value_2_desc';
UPDATE site_settings SET label='Value 3 Title', field_type='text', sort_order=44, description='' WHERE key='about_value_3_title';
UPDATE site_settings SET label='Value 3 Description', field_type='textarea', sort_order=45, description='' WHERE key='about_value_3_desc';
UPDATE site_settings SET label='Value 4 Title', field_type='text', sort_order=46, description='' WHERE key='about_value_4_title';
UPDATE site_settings SET label='Value 4 Description', field_type='textarea', sort_order=47, description='' WHERE key='about_value_4_desc';

-- === CONTACT ===
UPDATE site_settings SET label='Page Title', field_type='text', sort_order=1, description='' WHERE key='contact_title';
UPDATE site_settings SET label='Page Subtitle', field_type='textarea', sort_order=2, description='' WHERE key='contact_subtitle';
UPDATE site_settings SET label='Success Title', field_type='text', sort_order=3, description='Shown after form submission' WHERE key='contact_success_title';
UPDATE site_settings SET label='Success Message', field_type='textarea', sort_order=4, description='Shown after form submission' WHERE key='contact_success_message';

-- === CAREER ===
UPDATE site_settings SET label='Fellowship Title', field_type='text', sort_order=1, description='Main heading for the career page' WHERE key='career_title';
UPDATE site_settings SET label='Fellowship Subtitle', field_type='textarea', sort_order=2, description='Paragraph below the career heading' WHERE key='career_subtitle';
UPDATE site_settings SET label='Disclaimer Text', field_type='textarea', sort_order=3, description='Warning/disclaimer shown below subtitle' WHERE key='career_disclaimer';

-- === SERVICES ===
UPDATE site_settings SET label='Intro Title', field_type='text', sort_order=1, description='' WHERE key='services_intro_title';
UPDATE site_settings SET label='Intro Subtitle', field_type='textarea', sort_order=2, description='' WHERE key='services_intro_subtitle';
UPDATE site_settings SET label='Intro Note', field_type='text', sort_order=3, description='' WHERE key='services_intro_note';

-- === TEAM ===
UPDATE site_settings SET label='Page Title', field_type='text', sort_order=1, description='' WHERE key='team_page_title';
UPDATE site_settings SET label='Page Subtitle', field_type='textarea', sort_order=2, description='' WHERE key='team_page_subtitle';
UPDATE site_settings SET label='About Setupr Footer', field_type='textarea', sort_order=3, description='Text shown in the footer area of team page' WHERE key='team_about_setupr';

-- === AUTHOR ===
UPDATE site_settings SET label='Articles Heading Template', field_type='text', sort_order=1, description='Use {name} as placeholder for author name' WHERE key='author_articles_heading';
UPDATE site_settings SET label='About Setupr Footer', field_type='textarea', sort_order=2, description='Text shown in the footer area of author pages' WHERE key='author_about_setupr';

-- === FOOTER ===
UPDATE site_settings SET label='Tagline', field_type='text', sort_order=1, description='Footer tagline text' WHERE key='footer_tagline';
UPDATE site_settings SET label='Email', field_type='text', sort_order=2, description='Contact email shown in footer' WHERE key='footer_email';
UPDATE site_settings SET label='Ownership Text', field_type='text', sort_order=3, description='Copyright / ownership line' WHERE key='footer_ownership';
UPDATE site_settings SET label='LinkedIn URL', field_type='url', sort_order=10, description='' WHERE key='footer_linkedin';
UPDATE site_settings SET label='Twitter URL', field_type='url', sort_order=11, description='' WHERE key='footer_twitter';
UPDATE site_settings SET label='Instagram URL', field_type='url', sort_order=12, description='' WHERE key='footer_instagram';

-- === CONTENT (blog) ===
UPDATE site_settings SET label='Blog Page Title', field_type='text', sort_order=1, description='Main heading on the blog listing page' WHERE key='blog_page_title';
UPDATE site_settings SET label='Blog Page Subtitle', field_type='textarea', sort_order=2, description='Subtitle on the blog listing page' WHERE key='blog_page_subtitle';
UPDATE site_settings SET label='Blog Page Badge', field_type='text', sort_order=3, description='Badge text above blog title' WHERE key='blog_page_badge';

-- === SEO rows ===
UPDATE site_settings SET label='Homepage Title', field_type='text', sort_order=1, description='Browser tab title for homepage' WHERE key='seo_homepage_title';
UPDATE site_settings SET label='Homepage Description', field_type='textarea', sort_order=2, description='Meta description for homepage' WHERE key='seo_homepage_description';
UPDATE site_settings SET label='Homepage OG Title', field_type='text', sort_order=3, description='Open Graph title for social sharing' WHERE key='seo_homepage_og_title';
UPDATE site_settings SET label='Homepage OG Description', field_type='textarea', sort_order=4, description='Open Graph description for social sharing' WHERE key='seo_homepage_og_description';
UPDATE site_settings SET label='About Title', field_type='text', sort_order=5, description='' WHERE key='seo_about_title';
UPDATE site_settings SET label='About Description', field_type='textarea', sort_order=6, description='' WHERE key='seo_about_description';
UPDATE site_settings SET label='About OG Title', field_type='text', sort_order=7, description='' WHERE key='seo_about_og_title';
UPDATE site_settings SET label='About OG Description', field_type='textarea', sort_order=8, description='' WHERE key='seo_about_og_description';
UPDATE site_settings SET label='Blog Title', field_type='text', sort_order=9, description='' WHERE key='seo_blog_title';
UPDATE site_settings SET label='Blog Description', field_type='textarea', sort_order=10, description='' WHERE key='seo_blog_description';
UPDATE site_settings SET label='Blog OG Title', field_type='text', sort_order=11, description='' WHERE key='seo_blog_og_title';
UPDATE site_settings SET label='Blog OG Description', field_type='textarea', sort_order=12, description='' WHERE key='seo_blog_og_description';
UPDATE site_settings SET label='Services Title', field_type='text', sort_order=13, description='' WHERE key='seo_services_title';
UPDATE site_settings SET label='Services Description', field_type='textarea', sort_order=14, description='' WHERE key='seo_services_description';
UPDATE site_settings SET label='Services OG Title', field_type='text', sort_order=15, description='' WHERE key='seo_services_og_title';
UPDATE site_settings SET label='Services OG Description', field_type='textarea', sort_order=16, description='' WHERE key='seo_services_og_description';
UPDATE site_settings SET label='Team Title', field_type='text', sort_order=17, description='' WHERE key='seo_team_title';
UPDATE site_settings SET label='Team Description', field_type='textarea', sort_order=18, description='' WHERE key='seo_team_description';
UPDATE site_settings SET label='Team OG Title', field_type='text', sort_order=19, description='' WHERE key='seo_team_og_title';
UPDATE site_settings SET label='Team OG Description', field_type='textarea', sort_order=20, description='' WHERE key='seo_team_og_description';
UPDATE site_settings SET label='Career Title', field_type='text', sort_order=21, description='' WHERE key='seo_career_title';
UPDATE site_settings SET label='Career Description', field_type='textarea', sort_order=22, description='' WHERE key='seo_career_description';
UPDATE site_settings SET label='Career OG Title', field_type='text', sort_order=23, description='' WHERE key='seo_career_og_title';
UPDATE site_settings SET label='Career OG Description', field_type='textarea', sort_order=24, description='' WHERE key='seo_career_og_description';
UPDATE site_settings SET label='Contact Title', field_type='text', sort_order=25, description='' WHERE key='seo_contact_title';
UPDATE site_settings SET label='Contact Description', field_type='textarea', sort_order=26, description='' WHERE key='seo_contact_description';
UPDATE site_settings SET label='Contact OG Title', field_type='text', sort_order=27, description='' WHERE key='seo_contact_og_title';
UPDATE site_settings SET label='Contact OG Description', field_type='textarea', sort_order=28, description='' WHERE key='seo_contact_og_description';
UPDATE site_settings SET label='Guides Title', field_type='text', sort_order=29, description='' WHERE key='seo_guides_title';
UPDATE site_settings SET label='Guides Description', field_type='textarea', sort_order=30, description='' WHERE key='seo_guides_description';
UPDATE site_settings SET label='Guides OG Title', field_type='text', sort_order=31, description='' WHERE key='seo_guides_og_title';
UPDATE site_settings SET label='Guides OG Description', field_type='textarea', sort_order=32, description='' WHERE key='seo_guides_og_description';

-- === LEGAL ===
UPDATE site_settings SET label='Terms of Service', field_type='markdown', sort_order=1, description='Full terms of service content in Markdown' WHERE key='terms_content';
UPDATE site_settings SET label='Privacy Policy', field_type='markdown', sort_order=2, description='Full privacy policy content in Markdown' WHERE key='privacy_content';
UPDATE site_settings SET label='Refund Policy', field_type='markdown', sort_order=3, description='Full refund policy content in Markdown' WHERE key='refund_content';

-- === PRICING rows (update those with category pricing) ===
UPDATE site_settings SET label='Confirmation Title', field_type='text', sort_order=1, description='Title on pricing confirmation page' WHERE key='pricing_confirmation_title';
UPDATE site_settings SET label='Confirmation Subtitle', field_type='textarea', sort_order=2, description='Subtitle on pricing confirmation page' WHERE key='pricing_confirmation_subtitle';
UPDATE site_settings SET label='Whats Included JSON', field_type='json', sort_order=3, description='JSON array of included items' WHERE key='pricing_whats_included';
UPDATE site_settings SET label='Trust Note Title', field_type='text', sort_order=4, description='Trust section heading on pricing page' WHERE key='pricing_trust_note_title';
UPDATE site_settings SET label='Trust Note Description', field_type='textarea', sort_order=5, description='Trust section paragraph on pricing page' WHERE key='pricing_trust_note_desc';

-- Step 3: Seed Career + GuidesIndex content
INSERT INTO site_settings (key, value, category, label, field_type, sort_order, description)
VALUES
  ('career_highlights', '[{"icon":"Sparkles","title":"Real Exposure","description":"Work on actual startup problems, not simulated exercises"},{"icon":"Users","title":"Founder Access","description":"Learn directly from experienced entrepreneurs"},{"icon":"Rocket","title":"Startup Ecosystem","description":"Understand how early-stage businesses operate in India"},{"icon":"BookOpen","title":"Mentorship Driven","description":"Focused on learning and growth, not just tasks"}]', 'career', 'Highlight Cards JSON', 'json', 10, 'JSON array of highlight cards with icon/title/description'),
  ('career_badge_text', 'Now Accepting Applications', 'career', 'Badge Text', 'text', 4, 'Text shown in the badge above the title'),
  ('career_success_title', 'Application Received', 'career', 'Success Title', 'text', 5, 'Title shown after form submission'),
  ('career_success_desc', 'Thank you for applying to the Setupr Founders Fellowship.', 'career', 'Success Description', 'textarea', 6, 'Description shown after form submission'),
  ('career_success_note', 'Applications are reviewed based on intent, thinking, and fit — not resumes or grades. If shortlisted, we''ll reach out with next steps.', 'career', 'Success Note', 'textarea', 7, 'Additional note shown after form submission'),
  ('guides_page_title', 'Practical Guides for Early-Stage Founders', 'guides', 'Page Title', 'text', 1, 'Main heading on the guides index page'),
  ('guides_page_subtitle', 'Comprehensive, educational resources on business registration, compliance, and digital presence in India—written for freelancers, consultants, and startup founders.', 'guides', 'Page Subtitle', 'textarea', 2, 'Subtitle on the guides index page'),
  ('guides_cards', '[{"icon":"FileText","title":"Complete Guide to Starting a Business in India","description":"A step-by-step guide covering business registration, compliance, and digital presence for freelancers, startups, and small businesses.","link":"/guides/starting-business-india","readTime":"15 min read"},{"icon":"Building2","title":"Business Types Explained: Sole Prop vs LLP vs Pvt Ltd","description":"Understand the differences between business structures in India to make the right choice for your situation.","link":"/guides/business-types","readTime":"10 min read"},{"icon":"Shield","title":"Compliance Checklist for New Businesses","description":"What to do after company registration—ongoing compliance requirements for startups and small businesses.","link":"/blog/compliance-checklist-after-company-registration","readTime":"8 min read"},{"icon":"Globe","title":"Digital Presence Checklist for Startups","description":"Essential steps to establish online credibility—domain, email, website, and more.","link":"/blog/how-to-build-credibility-as-new-business-india","readTime":"6 min read"}]', 'guides', 'Guide Cards JSON', 'json', 3, 'JSON array of guide card objects with icon/title/description/link/readTime'),
  ('guides_cta_title', 'Need hands-on help?', 'guides', 'CTA Title', 'text', 10, 'Heading in the bottom CTA section'),
  ('guides_cta_desc', 'These guides give you the knowledge. Setupr gives you the execution—handling registration, compliance, and digital setup so you can focus on your work.', 'guides', 'CTA Description', 'textarea', 11, 'Description in the bottom CTA section')
ON CONFLICT (key) DO NOTHING;

-- Update category for pricing rows if they exist
UPDATE site_settings SET category = 'pricing' WHERE key IN ('pricing_confirmation_title', 'pricing_confirmation_subtitle', 'pricing_whats_included', 'pricing_trust_note_title', 'pricing_trust_note_desc') AND category != 'pricing';

-- Update category for blog rows
UPDATE site_settings SET category = 'content' WHERE key IN ('blog_page_title', 'blog_page_subtitle', 'blog_page_badge') AND category = 'content';
