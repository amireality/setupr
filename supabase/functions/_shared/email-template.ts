// Shared branded email template for Setupr
// Renders a complete HTML email with logo header, body, CTA, and footer.

const BRAND = {
  logoUrl: "https://setupr.com/setupr-logo-animated.gif",
  siteUrl: "https://setupr.com",
  contactEmail: "info@setupr.com",
  twitterUrl: "https://x.com/setuprhq",
  linkedinUrl: "https://www.linkedin.com/company/setupr/",
  primary: "#f97316", // brand orange
  primaryHover: "#ea6310",
  bg: "#ffffff",
  surface: "#0a0a0a",
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  fontStack:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

export function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface RenderEmailOptions {
  preheader?: string;
  heading: string;
  bodyHtml: string; // already-safe HTML for the main message
  ctaLabel?: string;
  ctaUrl?: string;
}

export function renderEmail(opts: RenderEmailOptions): string {
  const preheader = escapeHtml(opts.preheader || "");
  const heading = escapeHtml(opts.heading);
  const cta =
    opts.ctaLabel && opts.ctaUrl
      ? `
      <tr>
        <td style="padding: 8px 0 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="background-color: ${BRAND.primary}; border-radius: 8px;">
                <a href="${opts.ctaUrl}" target="_blank"
                  style="display:inline-block; padding: 14px 28px; font-family: ${BRAND.fontStack}; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">
                  ${escapeHtml(opts.ctaLabel)}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<title>${heading}</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f7; font-family:${BRAND.fontStack}; color:${BRAND.text};">
  <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden;">${preheader}</span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f7; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:${BRAND.bg}; border-radius:14px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">

          <!-- Header with animated logo on dark bg -->
          <tr>
            <td align="center" style="background-color:${BRAND.surface}; padding:28px 24px;">
              <a href="${BRAND.siteUrl}" target="_blank" style="text-decoration:none;">
                <img src="${BRAND.logoUrl}" alt="Setupr" width="64" height="64"
                  style="display:block; width:64px; height:64px; border:0; outline:none;" />
              </a>
              <div style="font-family:${BRAND.fontStack}; font-size:14px; font-weight:600; color:#ffffff; margin-top:10px; letter-spacing:0.4px;">
                SETUPR
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px 8px;">
              <h1 style="margin:0 0 16px; font-family:${BRAND.fontStack}; font-size:24px; line-height:1.3; font-weight:700; color:${BRAND.text};">
                ${heading}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 8px; font-family:${BRAND.fontStack}; font-size:15px; line-height:1.65; color:${BRAND.text};">
              ${opts.bodyHtml}
            </td>
          </tr>
          ${cta ? `<tr><td style="padding: 0 32px;"><table role="presentation" width="100%"><tbody>${cta}</tbody></table></td></tr>` : ""}

          <!-- Divider -->
          <tr>
            <td style="padding: 8px 32px 0;">
              <div style="height:1px; background-color:${BRAND.border}; line-height:1px; font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px 8px; font-family:${BRAND.fontStack}; font-size:13px; line-height:1.6; color:${BRAND.muted};">
              <p style="margin:0 0 8px;">Need help? Reply to this email or write to
                <a href="mailto:${BRAND.contactEmail}" style="color:${BRAND.primary}; text-decoration:none;">${BRAND.contactEmail}</a>.
              </p>
              <p style="margin:0;">Visit
                <a href="${BRAND.siteUrl}" style="color:${BRAND.primary}; text-decoration:none;">setupr.com</a>
                or our <a href="${BRAND.siteUrl}/contact" style="color:${BRAND.primary}; text-decoration:none;">contact page</a>.
              </p>
            </td>
          </tr>

          <!-- Social icons -->
          <tr>
            <td align="center" style="padding: 8px 32px 20px;">
              <a href="${BRAND.twitterUrl}" target="_blank" style="display:inline-block; margin:0 6px; text-decoration:none;">
                <span style="display:inline-block; width:34px; height:34px; line-height:34px; text-align:center; background:${BRAND.surface}; color:#ffffff; border-radius:50%; font-family:${BRAND.fontStack}; font-size:14px; font-weight:700;">X</span>
              </a>
              <a href="${BRAND.linkedinUrl}" target="_blank" style="display:inline-block; margin:0 6px; text-decoration:none;">
                <span style="display:inline-block; width:34px; height:34px; line-height:34px; text-align:center; background:${BRAND.surface}; color:#ffffff; border-radius:50%; font-family:${BRAND.fontStack}; font-size:11px; font-weight:700;">in</span>
              </a>
            </td>
          </tr>

          <!-- Legal -->
          <tr>
            <td align="center" style="padding: 0 32px 28px; font-family:${BRAND.fontStack}; font-size:11px; color:#9ca3af;">
              <p style="margin:0 0 6px;">
                <a href="${BRAND.siteUrl}/privacy" style="color:#9ca3af; text-decoration:none;">Privacy</a> &nbsp;|&nbsp;
                <a href="${BRAND.siteUrl}/terms" style="color:#9ca3af; text-decoration:none;">Terms</a> &nbsp;|&nbsp;
                <a href="${BRAND.siteUrl}/refund" style="color:#9ca3af; text-decoration:none;">Refund</a>
              </p>
              <p style="margin:0;">© ${new Date().getFullYear()} Setupr. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Plain-text fallback generator (improves deliverability)
export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>(\s*)/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ===== Pre-built helpers =====

export function welcomeEmail(name: string): { subject: string; html: string } {
  const safeName = escapeHtml(name?.split(" ")[0] || "there");
  const html = renderEmail({
    preheader: "Welcome to Setupr. Here is what to do next.",
    heading: `Welcome aboard, ${safeName}.`,
    bodyHtml: `
      <p>Thanks for signing up with Setupr. We help freelancers and founders set up their business, the right way, without the paperwork hassle.</p>
      <p>Here is what you can do next:</p>
      <ul style="padding-left: 20px; margin: 12px 0;">
        <li style="margin-bottom: 6px;">Browse our services and bundles</li>
        <li style="margin-bottom: 6px;">Use the intake form to get a tailored setup plan</li>
        <li style="margin-bottom: 6px;">Explore the cloud marketplace for tools your business needs</li>
      </ul>
      <p>If you have any questions, just reply to this email. We are real humans on the other side.</p>
    `,
    ctaLabel: "Explore Setupr",
    ctaUrl: "https://setupr.com/services",
  });
  return { subject: "Welcome to Setupr", html };
}

export function engagementEmail(
  name: string,
  subject: string,
  bodyHtml: string,
  ctaLabel?: string,
  ctaUrl?: string
): { subject: string; html: string } {
  const safeName = escapeHtml(name?.split(" ")[0] || "there");
  const html = renderEmail({
    preheader: subject,
    heading: `Hi ${safeName},`,
    bodyHtml,
    ctaLabel,
    ctaUrl,
  });
  return { subject, html };
}
