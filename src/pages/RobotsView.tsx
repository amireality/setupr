import { useEffect, useState } from "react";

export default function RobotsView() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    // If the browser reached this React route due to ServiceWorker navigation fallback,
    // fetch the real raw robots.txt and display it cleanly as plain text.
    fetch("/robots.txt", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then((text) => {
        // If it accidentally returned index.html, force hard reload from server
        if (text.includes("<!DOCTYPE html") || text.includes("<html")) {
          window.location.href = "/robots.txt";
        } else {
          setContent(text);
        }
      })
      .catch(() => {
        window.location.href = "/robots.txt";
      });
  }, []);

  return (
    <pre className="min-h-screen bg-[#090a0d] text-zinc-300 font-mono text-xs md:text-sm p-6 overflow-x-auto whitespace-pre selection:bg-orange-500 selection:text-white">
      {content || "Loading robots.txt..."}
    </pre>
  );
}
