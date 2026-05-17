import { Linkedin } from "lucide-react";

interface LinkedInBadgeProps {
  vanity: string;
  name: string;
  url: string;
  theme?: "light" | "dark";
  size?: "medium" | "large";
  headline?: string;
  subline?: string;
  avatarUrl?: string;
}

export const LinkedInBadge = ({ 
  name, 
  url,
  theme = "dark",
  headline = "Founder @ Setupr | Technical Support Engineer | Vibecoder | Prompting things into existence",
  subline = "setupr | Sri Aurobindo College",
  avatarUrl
}: LinkedInBadgeProps) => {

  const isDark = theme === "dark";
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`w-full max-w-[320px] rounded-lg overflow-hidden border ${isDark ? 'bg-[#0f1115] border-gray-800' : 'bg-white border-gray-200'} shadow-lg font-sans mx-auto hover:shadow-xl transition-shadow duration-300`}>
      {/* Header */}
      <div className={`h-10 flex items-center px-4 border-b ${isDark ? 'bg-[#1b1f23] border-gray-800' : 'bg-[#f3f2ef] border-gray-200'}`}>
        <div className="flex items-center gap-0.5 font-bold text-sm tracking-wide">
          <span className={isDark ? 'text-white' : 'text-[#0a66c2]'}>Linked</span>
          <div className="bg-[#0a66c2] rounded-sm text-white p-[2px] ml-0.5 flex items-center justify-center">
            <Linkedin className="w-3.5 h-3.5 fill-current stroke-none" />
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center text-white text-xl font-bold shadow-md mb-4 ring-2 ring-transparent group-hover:ring-[#0a66c2]/50 transition-all overflow-hidden relative">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        
        {/* Name */}
        <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>
        
        {/* Headline */}
        <p className={`text-[13px] mb-3 line-clamp-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {headline}
        </p>
        
        {/* Subline */}
        <p className={`text-[11px] mb-5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {subline}
        </p>
        
        {/* CTA Button */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`w-full py-1.5 px-4 rounded-full font-semibold text-[15px] border-2 transition-colors duration-200 ${
            isDark 
              ? 'border-white text-white hover:bg-white hover:text-black' 
              : 'border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/10'
          }`}
        >
          View profile
        </a>
      </div>
    </div>
  );
};
