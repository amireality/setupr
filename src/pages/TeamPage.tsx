import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Twitter, Linkedin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useAuthors } from "@/hooks/useAuthors";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const teamSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Setupr",
  url: "https://setupr.com",
  description:
    "Setupr is a business setup platform that helps freelancers, consultants, and startups in India with company registration, GST, MSME, compliance, and digital presence.",
};

const TeamPage = () => {
  const { data: authors = [], isLoading } = useAuthors();
  const { data: settings = [] } = useSiteSettingsByCategory("team");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  const pageTitle = getSetting("team_page_title", "Meet the People Behind Setupr");
  const pageSubtitle = getSetting("team_page_subtitle", "We're building systems and resources to help early founders start their journey with clarity.");
  const aboutSetupr = getSetting("team_about_setupr", "Setupr is a business setup platform that helps freelancers, consultants, and startups in India with company registration, GST, MSME, compliance, and digital presence. Our mission is to simplify the early founder journey.");

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Our Team | Setupr</title>
        <meta
          name="description"
          content="Meet the team behind Setupr - simplifying business setup, compliance, and digital presence for freelancers, startups, and small teams in India."
        />
        <link rel="canonical" href="https://setupr.com/team" />
        <meta property="og:title" content="Our Team | Setupr" />
        <meta
          property="og:description"
          content="Meet the team behind Setupr - simplifying business setup for founders in India."
        />
        <meta property="og:url" content="https://setupr.com/team" />
        <script type="application/ld+json">{JSON.stringify(teamSchema)}</script>
      </Helmet>

      <AnimatedGridBackground />
      <Navbar />

      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Team</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {pageTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {pageSubtitle}
            </p>
          </motion.div>

          {/* Team Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : authors.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No team members yet.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {authors.map((author, index) => (
                <motion.div
                  key={author.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link
                    to={`/team/${author.slug}`}
                    className="block glass-card glass-card-hover rounded-2xl p-6 h-full"
                  >
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-display font-bold text-primary">
                        {author.avatar_initials}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="text-center">
                      <h2 className="text-lg font-display font-semibold mb-1">
                        <span className="text-primary">{author.name}</span>
                      </h2>
                      <p className="text-sm text-muted-foreground mb-3">
                        {author.title}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {author.bio}
                      </p>

                      {/* Social Links */}
                      <div className="flex items-center justify-center gap-2">
                        {author.twitter_url && (
                          <span
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <a
                              href={author.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Twitter"
                            >
                              <Twitter className="w-4 h-4 text-muted-foreground" />
                            </a>
                          </span>
                        )}
                        {author.linkedin_url && (
                          <span
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <a
                              href={author.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-4 h-4 text-muted-foreground" />
                            </a>
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* About Setupr */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 glass-card rounded-2xl p-6 text-center"
          >
            <h3 className="font-display font-semibold mb-2">About Setupr</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              {aboutSetupr}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
