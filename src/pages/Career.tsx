import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Users, Rocket, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const fellowshipSchema = z.object({
  // Section 1: Basic Information
  fullName: z.string().min(1, "Full name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(1, "Phone number is required").max(20),
  cityState: z.string().max(100).optional(),
  currentStatus: z.string().min(1, "Please select your current status"),
  educationBackground: z.string().max(500).optional(),
  socialProfile: z.string().url("Please enter a valid URL").max(500).optional().or(z.literal("")),
  resumeLink: z.string().url("Please enter a valid URL").max(500).optional().or(z.literal("")),
  
  // Section 2: Fellowship Track
  preferredTracks: z.array(z.string()).optional(),
  trackInterestReason: z.string().min(1, "Please explain your interest").max(1000),
  
  // Section 3: Thinking & Intent
  businessPerspective: z.string().min(1, "Please share your perspective").max(1000),
  learningGoals: z.array(z.string()).optional(),
  unpaidComfort: z.string().min(1, "Please select an option"),
  
  // Section 4: Proof of Curiosity
  curiosityProof: z.string().max(1000).optional(),
  hoursPerWeek: z.string().min(1, "Please select hours per week"),
  additionalNotes: z.string().max(1000).optional(),
  
  // Section 5: Declarations
  declarationMentorship: z.boolean().refine(val => val === true, "You must accept this declaration"),
  declarationVoluntary: z.boolean().refine(val => val === true, "You must accept this declaration"),
  declarationGenuine: z.boolean().refine(val => val === true, "You must accept this declaration"),
});

type FellowshipFormData = z.infer<typeof fellowshipSchema>;

const trackOptions = [
  "Social Media & Content",
  "Market Research",
  "Product Operations",
  "Marketing – Vendors & Clients",
  "Customer Success",
  "Open to any track",
];

const learningGoalsOptions = [
  "Understanding startups",
  "Learning compliance",
  "Exposure to founders",
  "Career clarity",
  "Build my own startup",
];

const currentStatusOptions = [
  { value: "student", label: "Student" },
  { value: "recent_graduate", label: "Recent Graduate" },
  { value: "working_professional", label: "Working Professional" },
  { value: "freelancer", label: "Freelancer / Self-employed" },
];

const hoursOptions = [
  { value: "5-7", label: "5–7 hours" },
  { value: "8-10", label: "8–10 hours" },
  { value: "10-15", label: "10–15 hours" },
];

const highlights = [
  {
    icon: Sparkles,
    title: "Real Exposure",
    description: "Work on actual startup problems, not simulated exercises",
  },
  {
    icon: Users,
    title: "Founder Access",
    description: "Learn directly from experienced entrepreneurs",
  },
  {
    icon: Rocket,
    title: "Startup Ecosystem",
    description: "Understand how early-stage businesses operate in India",
  },
  {
    icon: BookOpen,
    title: "Mentorship Driven",
    description: "Focused on learning and growth, not just tasks",
  },
];

const Career = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("career");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const fellowshipTitle = getSetting("career_title", "Founders Fellowship");
  const fellowshipSubtitle = getSetting("career_subtitle", "Learn how startups, business registration platforms, and compliance ecosystems work in India. A mentorship program for students, recent graduates, and aspiring entrepreneurs.");
  const disclaimer = getSetting("career_disclaimer", "⚠️ This is a learning program, not a traditional internship. Focused on real startup exposure, not certificates.");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FellowshipFormData>({
    resolver: zodResolver(fellowshipSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      cityState: "",
      currentStatus: "",
      educationBackground: "",
      socialProfile: "",
      resumeLink: "",
      preferredTracks: [],
      trackInterestReason: "",
      businessPerspective: "",
      learningGoals: [],
      unpaidComfort: "",
      curiosityProof: "",
      hoursPerWeek: "",
      additionalNotes: "",
      declarationMentorship: false,
      declarationVoluntary: false,
      declarationGenuine: false,
    },
  });

  const unpaidComfort = form.watch("unpaidComfort");

  const onSubmit = async (data: FellowshipFormData) => {
    if (data.unpaidComfort === "no") {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data for Power Automate webhook
      const formattedData = {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        city_state: data.cityState || "",
        current_status: data.currentStatus,
        education_background: data.educationBackground || "",
        social_profile: data.socialProfile || "",
        resume_link: data.resumeLink || "",
        preferred_tracks: data.preferredTracks?.join(", ") || "",
        track_interest_reason: data.trackInterestReason,
        business_perspective: data.businessPerspective,
        learning_goals: data.learningGoals?.join(", ") || "",
        unpaid_comfort: data.unpaidComfort,
        curiosity_proof: data.curiosityProof || "",
        hours_per_week: data.hoursPerWeek,
        additional_notes: data.additionalNotes || "",
        declaration_mentorship: data.declarationMentorship ? "Yes" : "No",
        declaration_voluntary: data.declarationVoluntary ? "Yes" : "No",
        declaration_genuine: data.declarationGenuine ? "Yes" : "No",
        submitted_at: new Date().toISOString(),
      };

      // Submit via backend function (public endpoint - no auth header needed)
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-fellowship`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formattedData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

      setIsSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGridBackground className="opacity-40" />
      <Navbar />

      <main className="relative z-10 pt-24 md:pt-32 pb-16">
        <div className="container px-4 md:px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Now Accepting Applications
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Setupr{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                {fellowshipTitle}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              {fellowshipSubtitle}
            </p>
            <p className="text-sm text-muted-foreground/80 bg-secondary/30 rounded-xl px-4 py-3 inline-block">
              {disclaimer}
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12 md:mb-16"
          >
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className="bg-secondary/30 backdrop-blur-sm border border-border/20 rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <highlight.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{highlight.title}</h3>
                <p className="text-xs text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto text-center py-16"
              >
                <div className="bg-secondary/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 md:p-12">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    Application Received
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-2">
                    Thank you for applying to the Setupr Founders Fellowship.
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    Applications are reviewed based on intent, thinking, and fit — not resumes or grades. If shortlisted, we'll reach out with next steps.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-secondary/30 backdrop-blur-sm border border-border/20 rounded-2xl p-6 md:p-10 shadow-glow">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                      {/* Section 1: Basic Information */}
                      <motion.section
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                            1
                          </span>
                          Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your full name"
                                    className="bg-secondary/50 border-border/30 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="bg-secondary/50 border-border/30 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone / WhatsApp Number *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    className="bg-secondary/50 border-border/30 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cityState"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City & State</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Mumbai, Maharashtra"
                                    className="bg-secondary/50 border-border/30 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="currentStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Status *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-secondary/50 border-border/30 rounded-xl">
                                      <SelectValue placeholder="Select your status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {currentStatusOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="socialProfile"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Social Profile Link</FormLabel>
                                <FormControl>
                                  <Input
                                    type="url"
                                    placeholder="Add LinkedIn, Instagram, X, etc."
                                    className="bg-secondary/50 border-border/30 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="resumeLink"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Resume / Portfolio Link</FormLabel>
                                <FormControl>
                                  <Input
                                    type="url"
                                    placeholder="Your resume link with access"
                                    className="bg-secondary/50 border-border/30 rounded-xl"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="educationBackground"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Educational / Professional Background</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Brief description of your education or work experience"
                                    className="bg-secondary/50 border-border/30 rounded-xl resize-none"
                                    rows={2}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.section>

                      {/* Section 2: Fellowship Track */}
                      <motion.section
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                            2
                          </span>
                          Fellowship Track
                        </h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="preferredTracks"
                            render={() => (
                              <FormItem>
                                <FormLabel>Preferred Tracks (select all that interest you)</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                  {trackOptions.map((track) => (
                                    <FormField
                                      key={track}
                                      control={form.control}
                                      name="preferredTracks"
                                      render={({ field }) => (
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(track)}
                                              onCheckedChange={(checked) => {
                                                const current = field.value || [];
                                                if (checked) {
                                                  field.onChange([...current, track]);
                                                } else {
                                                  field.onChange(current.filter((t) => t !== track));
                                                }
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal text-sm cursor-pointer">
                                            {track}
                                          </FormLabel>
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="trackInterestReason"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Why does this track interest you? *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Share what draws you to this area and what you hope to learn"
                                    className="bg-secondary/50 border-border/30 rounded-xl resize-none"
                                    rows={3}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.section>

                      {/* Section 3: Thinking & Intent */}
                      <motion.section
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                            3
                          </span>
                          Thinking & Intent
                        </h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="businessPerspective"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>What does it mean to "build a business" in India? *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Share your perspective on entrepreneurship in India"
                                    className="bg-secondary/50 border-border/30 rounded-xl resize-none"
                                    rows={4}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="learningGoals"
                            render={() => (
                              <FormItem>
                                <FormLabel>What do you hope to learn? (select all that apply)</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                  {learningGoalsOptions.map((goal) => (
                                    <FormField
                                      key={goal}
                                      control={form.control}
                                      name="learningGoals"
                                      render={({ field }) => (
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(goal)}
                                              onCheckedChange={(checked) => {
                                                const current = field.value || [];
                                                if (checked) {
                                                  field.onChange([...current, goal]);
                                                } else {
                                                  field.onChange(current.filter((g) => g !== goal));
                                                }
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal text-sm cursor-pointer">
                                            {goal}
                                          </FormLabel>
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="unpaidComfort"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>This is unpaid. Are you comfortable? *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-secondary/50 border-border/30 rounded-xl">
                                      <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes, I understand and agree</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <AnimatePresence>
                            {unpaidComfort === "no" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                                  <p className="text-sm text-destructive">
                                    Thank you for your honesty. This fellowship may not be the right fit for you at this time.
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.section>

                      {/* Section 4: Proof of Curiosity */}
                      <motion.section
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                            4
                          </span>
                          Proof of Curiosity
                        </h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="curiosityProof"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Share anything that reflects how you think or learn</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="This could be a project, article, video, or anything that shows your curiosity"
                                    className="bg-secondary/50 border-border/30 rounded-xl resize-none"
                                    rows={3}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hoursPerWeek"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hours per week you can commit *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-secondary/50 border-border/30 rounded-xl">
                                      <SelectValue placeholder="Select hours" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {hoursOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="additionalNotes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Anything else you'd like to share?</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Optional: Any additional information"
                                    className="bg-secondary/50 border-border/30 rounded-xl resize-none"
                                    rows={2}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.section>

                      {/* Section 5: Declaration */}
                      <motion.section
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                            5
                          </span>
                          Declaration
                        </h3>
                        <div className="space-y-4 bg-secondary/20 rounded-xl p-4">
                          <FormField
                            control={form.control}
                            name="declarationMentorship"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal text-sm cursor-pointer">
                                    I understand this is mentorship focused *
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="declarationVoluntary"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal text-sm cursor-pointer">
                                    I am applying voluntarily *
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="declarationGenuine"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal text-sm cursor-pointer">
                                    I am genuinely interested in startups *
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.section>

                      {/* Submit Button */}
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          type="submit"
                          size="xl"
                          disabled={isSubmitting || unpaidComfort === "no"}
                          className="w-full rounded-full"
                        >
                          {isSubmitting ? (
                            "Submitting..."
                          ) : (
                            <>
                              Submit Application
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Career;
