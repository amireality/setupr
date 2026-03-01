import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Smartphone, Monitor, Share, MoreVertical, PlusSquare } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
  };

  const steps = [
    {
      platform: "Android (Chrome)",
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      instructions: [
        "Open setupr.com in Chrome",
        "Tap the three-dot menu (⋮) at the top right",
        'Select "Add to Home Screen"',
        "Tap Add to confirm",
      ],
    },
    {
      platform: "iPhone / iPad (Safari)",
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      instructions: [
        "Open setupr.com in Safari",
        "Tap the Share button (□↑) at the bottom",
        'Scroll down and tap "Add to Home Screen"',
        "Tap Add to confirm",
      ],
    },
    {
      platform: "Desktop (Chrome / Edge)",
      icon: <Monitor className="w-6 h-6 text-primary" />,
      instructions: [
        "Open setupr.com in Chrome or Edge",
        "Click the install icon (⊕) in the address bar",
        'Or click the menu → "Install Setupr"',
        "Click Install to confirm",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-3xl px-4 mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Install Setupr
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Add Setupr to your home screen for instant access — no app store needed. Works on any device.
            </p>
          </div>

          {/* Quick install button */}
          {deferredPrompt && !isInstalled && (
            <div className="glass-card rounded-2xl p-6 mb-10 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your browser supports one-tap install
              </p>
              <Button size="lg" onClick={handleInstall} className="gap-2">
                <Download className="w-5 h-5" />
                Install Setupr Now
              </Button>
            </div>
          )}

          {isInstalled && (
            <div className="glass-card rounded-2xl p-6 mb-10 text-center border-primary/30">
              <p className="text-primary font-semibold">✓ Setupr is already installed on this device!</p>
            </div>
          )}

          {/* Manual instructions */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.platform} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  {step.icon}
                  <h2 className="font-display text-lg font-semibold">{step.platform}</h2>
                </div>
                <ol className="space-y-2 ml-9">
                  {step.instructions.map((instruction, i) => (
                    <li key={i} className="text-sm text-muted-foreground list-decimal">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Install;
