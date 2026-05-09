import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, Eye, History } from "lucide-react";

const TEMPLATES: Record<string, { heading: string; body: string; cta?: string; ctaUrl?: string }> = {
  blank: { heading: "", body: "" },
  welcome: {
    heading: "Welcome aboard.",
    body: "<p>Thanks for joining Setupr. Here is what you can do next.</p><p>Browse our services or hop into the dashboard whenever you are ready.</p>",
    cta: "Go to dashboard",
    ctaUrl: "https://setupr.com/store/dashboard",
  },
  followup: {
    heading: "Just checking in.",
    body: "<p>Hope your setup is going smoothly. We wanted to follow up and see if there is anything we can help with.</p><p>Reply to this email and one of our team will get back to you.</p>",
  },
  announcement: {
    heading: "Something new from Setupr.",
    body: "<p>We have some news to share with you.</p><p>Read on for details.</p>",
    cta: "Learn more",
    ctaUrl: "https://setupr.com",
  },
  engagement: {
    heading: "We have ideas for you.",
    body: "<p>Based on what you set up with us, here are a few next steps that might help your business grow.</p>",
    cta: "Talk to us",
    ctaUrl: "https://setupr.com/contact",
  },
};

interface CustomerOption {
  email: string;
  name: string;
}

const EmailComposer = () => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [template, setTemplate] = useState("blank");
  const [sending, setSending] = useState(false);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    loadCustomers();
    loadLogs();
  }, []);

  const loadCustomers = async () => {
    const { data: intakes } = await supabase
      .from("intake_submissions")
      .select("email, full_name")
      .order("created_at", { ascending: false })
      .limit(200);
    const map = new Map<string, CustomerOption>();
    (intakes || []).forEach((r: any) => {
      if (r.email && !map.has(r.email)) {
        map.set(r.email, { email: r.email, name: r.full_name });
      }
    });
    setCustomers(Array.from(map.values()));
  };

  const loadLogs = async () => {
    const { data } = await supabase
      .from("email_log")
      .select("*")
      .order("sent_at", { ascending: false })
      .limit(20);
    setRecentLogs(data || []);
  };

  const applyTemplate = (key: string) => {
    setTemplate(key);
    const t = TEMPLATES[key];
    if (!t) return;
    setHeading(t.heading);
    setBody(t.body);
    setCtaLabel(t.cta || "");
    setCtaUrl(t.ctaUrl || "");
  };

  const sendEmail = async (testMode: boolean) => {
    if (!testMode && !recipient) {
      toast({ title: "Recipient required", variant: "destructive" });
      return;
    }
    if (!subject || !heading || !body) {
      toast({ title: "Subject, heading and body are all required", variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-custom-email", {
        body: {
          to: recipient,
          subject,
          heading,
          bodyHtml: body,
          ctaLabel: ctaLabel || undefined,
          ctaUrl: ctaUrl || undefined,
          templateType: template,
          testMode,
        },
      });

      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      toast({
        title: testMode ? "Test email sent" : "Email sent",
        description: testMode
          ? "Check the admin inbox for the preview."
          : `Sent to ${recipient}`,
      });
      loadLogs();
    } catch (e: any) {
      toast({
        title: "Failed to send",
        description: e.message || "Try again",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // Escape user-controlled strings before injecting into preview HTML
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  const safeHeading = escapeHtml(heading || "Heading goes here");
  const safeCtaLabel = escapeHtml(ctaLabel);
  const safeCtaUrl = /^https:\/\//i.test(ctaUrl) ? escapeHtml(ctaUrl) : "#";
  // Body is admin-authored HTML; rendered inside a sandboxed iframe below so scripts cannot execute.
  const previewHtml = `
    <div style="background:#f5f5f7; padding:20px; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
      <div style="max-width:560px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="background:#0a0a0a; padding:24px; text-align:center;">
          <img src="/setupr-logo-animated.gif" width="56" height="56" style="display:inline-block;" alt="Setupr"/>
          <div style="color:#fff; font-size:13px; font-weight:600; margin-top:8px; letter-spacing:0.4px;">SETUPR</div>
        </div>
        <div style="padding:28px 24px;">
          <h1 style="margin:0 0 14px; font-size:22px; color:#111827;">${safeHeading}</h1>
          <div style="font-size:14px; line-height:1.6; color:#111827;">${body || "<p>Body content will appear here...</p>"}</div>
          ${
            ctaLabel && ctaUrl
              ? `<div style="margin-top:20px;"><a href="${safeCtaUrl}" style="display:inline-block; background:#f97316; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600; font-size:14px;">${safeCtaLabel}</a></div>`
              : ""
          }
        </div>
        <div style="border-top:1px solid #e5e7eb; padding:18px 24px; font-size:12px; color:#6b7280;">
          Reply to this email or write to <a href="mailto:info@setupr.com" style="color:#f97316;">info@setupr.com</a>
        </div>
        <div style="background:#0a0a0a; padding:14px; text-align:center;">
          <span style="color:#fff; font-size:11px;">© ${new Date().getFullYear()} Setupr</span>
        </div>
      </div>
    </div>
  `;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold">Email Composer</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Send branded emails to clients. Templates and footer are added automatically.
        </p>
      </div>

      <Tabs defaultValue="compose">
        <TabsList>
          <TabsTrigger value="compose" className="gap-2">
            <Send className="w-4 h-4" />
            Compose
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="w-4 h-4" />
            Sent History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compose</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Template</Label>
                  <Select value={template} onValueChange={applyTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blank">Blank</SelectItem>
                      <SelectItem value="welcome">Welcome / Onboarding</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Recipient</Label>
                  <Input
                    type="email"
                    placeholder="client@example.com"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                  {customers.length > 0 && (
                    <Select onValueChange={(v) => setRecipient(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Or pick from ${customers.length} known customers`} />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((c) => (
                          <SelectItem key={c.email} value={c.email}>
                            {c.name} | {c.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject line"
                    maxLength={200}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Heading (large title in email)</Label>
                  <Input
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Welcome aboard, John."
                    maxLength={200}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Body (HTML allowed: p, strong, em, ul, li, a, br)</Label>
                  <Textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                    placeholder="<p>Hi there,</p><p>Your message here...</p>"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>CTA Button Label (optional)</Label>
                    <Input
                      value={ctaLabel}
                      onChange={(e) => setCtaLabel(e.target.value)}
                      placeholder="Get started"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CTA Button URL</Label>
                    <Input
                      value={ctaUrl}
                      onChange={(e) => setCtaUrl(e.target.value)}
                      placeholder="https://setupr.com/..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => sendEmail(true)}
                    variant="outline"
                    disabled={sending}
                    className="flex-1"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                    Send test to me
                  </Button>
                  <Button
                    onClick={() => sendEmail(false)}
                    disabled={sending || !recipient}
                    className="flex-1 gradient-accent"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    Send email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Live preview</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  title="Email preview"
                  sandbox=""
                  srcDoc={previewHtml}
                  className="w-full h-[700px] border-0 rounded-md bg-white"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent sends</CardTitle>
            </CardHeader>
            <CardContent>
              {recentLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No emails sent yet.</p>
              ) : (
                <div className="space-y-2">
                  {recentLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between gap-4 p-3 rounded-lg border border-border/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{log.subject}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          To: {log.recipient} | {log.template_type}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                            log.status === "sent"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {log.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(log.sent_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailComposer;
