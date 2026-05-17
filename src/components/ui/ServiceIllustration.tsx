"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceIllustrationProps {
  category: string;
  serviceId?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ServiceIllustration = ({
  category,
  serviceId = "",
  size = "md",
  className,
}: ServiceIllustrationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for premium scroll-driven assembly
  const { scrollY } = useScroll();

  const isLarge = size === "lg";

  // Assembly completes rapidly (within the first 160 pixels of scroll)
  // this ensures the viewer witnesses the entire transition before the hero scrolls out of view.
  const explodedY1 = useTransform(scrollY, [0, 160], [-75, 0]);
  const explodedX1 = useTransform(scrollY, [0, 160], [75, 0]);
  
  const explodedY2 = useTransform(scrollY, [0, 160], [75, 0]);
  const explodedX2 = useTransform(scrollY, [0, 160], [-75, 0]);

  const explodedRotate = useTransform(scrollY, [0, 180], [60, 0]);
  const assemblyScale = useTransform(scrollY, [0, 150], [0.8, 1]);
  const assemblyOpacity = useTransform(scrollY, [0, 120], [0.2, 1]);

  // Static/Scroll selector helpers
  const y1 = isLarge ? explodedY1 : 0;
  const x1 = isLarge ? explodedX1 : 0;
  const y2 = isLarge ? explodedY2 : 0;
  const x2 = isLarge ? explodedX2 : 0;
  const rotateVal = isLarge ? explodedRotate : 0;
  const scaleVal = isLarge ? assemblyScale : 1;
  const opacityVal = isLarge ? assemblyOpacity : 1;

  // Mouse tilt parameters for interactive 3D parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xCoord = e.clientX - rect.left;
    const yCoord = e.clientY - rect.top;
    mouseX.set(xCoord / width);
    mouseY.set(yCoord / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const scaleClasses = {
    sm: "w-28 h-20 text-sm",
    md: "w-48 h-36 text-base",
    lg: "w-full aspect-[4/3] max-w-[320px] text-lg",
  };

  // Shared gradients defined in the parent SVG `<defs>` block
  const GradientDefs = () => (
    <defs>
      {/* Premium Neon Orange Gradients */}
      <linearGradient id="neonOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="neonOrangeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EA580C" stopOpacity="0.0" />
      </linearGradient>
      
      {/* Dark Metallic Shading */}
      <linearGradient id="metallicDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#292524" />
        <stop offset="50%" stopColor="#1C1917" />
        <stop offset="100%" stopColor="#0C0A09" />
      </linearGradient>
      <linearGradient id="metallicLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#57534E" />
        <stop offset="100%" stopColor="#292524" />
      </linearGradient>
      
      {/* Soft Glow Radial Backdrops */}
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EA580C" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      
      {/* Holographic Violet-Orange blend for AI Category */}
      <linearGradient id="aiHolo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#F97316" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  );

  const categoryId = category.toLowerCase().trim();
  const normalizedServiceId = serviceId.toLowerCase().trim();

  // ----------------------------------------------------
  // DISTRICT A: BUSINESS FORMATION & LEGAL IDENTITY
  // ----------------------------------------------------
  const renderFormation = () => {
    // Subject Variation: LLP & Partnerships (Interlinked Partnerships)
    if (normalizedServiceId === "llp" || normalizedServiceId === "partnership") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <rect width="240" height="180" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            {/* Base Platform */}
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.2" strokeWidth="1.5" />
            
            {/* Partnership Interlocking rings assembling from sides */}
            <g>
              {/* Ring A (Framer Motion flies in from left) */}
              <motion.g style={{ x: x2, y: y2 }}>
                <circle cx="95" cy="90" r="24" stroke="url(#neonOrange)" strokeWidth="4" fill="none" />
                <circle cx="95" cy="90" r="24" stroke="#fff" strokeWidth="1" strokeOpacity="0.3" fill="none" />
              </motion.g>

              {/* Ring B (Framer Motion flies in from right) */}
              <motion.g style={{ x: x1, y: y1 }}>
                <circle cx="145" cy="90" r="24" stroke="url(#metallicLight)" strokeWidth="4" fill="none" />
                <circle cx="145" cy="90" r="24" stroke="#EA580C" strokeWidth="1" strokeOpacity="0.3" fill="none" />
              </motion.g>

              {/* Golden central intersection detail */}
              <motion.path
                d="M120,78 A24,24 0 0,1 120,102"
                stroke="#FFE5D9"
                strokeWidth="4.5"
                strokeLinecap="round"
                style={{ opacity: opacityVal }}
              />
            </g>
          </motion.g>
        </svg>
      );
    }

    // Subject Variation: MSME (3D Isometric Warehouse/Factory)
    if (normalizedServiceId === "msme") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <rect width="240" height="180" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.2" strokeWidth="1.5" />
            
            {/* Building assembly elements */}
            <motion.g style={{ y: y1, rotate: rotateVal }} className="origin-center">
              {/* Roof Block */}
              <polygon points="120,60 70,85 120,110 170,85" fill="url(#metallicLight)" stroke="#EA580C" strokeWidth="1" />
              {/* Walls */}
              <polygon points="70,85 70,115 120,140 120,110" fill="#1C1917" stroke="#EA580C" strokeOpacity="0.5" />
              <polygon points="120,110 120,140 170,115 170,85" fill="#0C0A09" stroke="#EA580C" strokeOpacity="0.5" />
              {/* Glowing window panels */}
              <polygon points="90,95 80,100 80,110 90,105" fill="url(#neonOrangeGlow)" opacity="0.8" />
              <polygon points="150,95 160,100 160,110 150,105" fill="url(#neonOrangeGlow)" opacity="0.8" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Subject Variation: Proprietorship & OPC (Glowing Dome of Protection)
    if (normalizedServiceId === "proprietorship" || normalizedServiceId === "opc") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <rect width="240" height="180" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.2" strokeWidth="1.5" />
            
            {/* Dome structure */}
            <motion.path
              d="M60,110 A60,60 0 0,1 180,110"
              stroke="url(#neonOrange)"
              strokeWidth="2"
              strokeDasharray="4 4"
              style={{ pathLength: opacityVal }}
            />
            
            {/* Central glowing founder block */}
            <motion.g style={{ y: y1 }}>
              <circle cx="120" cy="85" r="12" fill="url(#neonOrange)" stroke="#FFE5D9" strokeWidth="1.5" />
              <path d="M102,112 C102,98 110,98 120,98 C130,98 138,98 138,112 Z" fill="url(#metallicLight)" stroke="#EA580C" strokeWidth="1.5" />
              <circle cx="120" cy="85" r="5" fill="#fff" opacity="0.9" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Default High-Fidelity Rocket Formation
    return (
      <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <GradientDefs />
        <rect width="240" height="180" fill="url(#bgGlow)" />
        
        {/* Isometric Platform Base */}
        <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.3" strokeWidth="1.5" />
        
        <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
          {/* Base thickness */}
          <polygon points="40,110 40,118 120,158 120,150" fill="#1C1917" stroke="#EA580C" strokeOpacity="0.2" />
          <polygon points="120,150 120,158 200,118 200,110" fill="#0C0A09" stroke="#EA580C" strokeOpacity="0.2" />
          
          {/* Glowing Launch Ring assembling from below */}
          <motion.polygon 
            points="120,135 70,110 120,85 170,110" 
            fill="url(#neonOrangeGlow)" 
            stroke="#F97316" 
            strokeWidth="2" 
            strokeDasharray="6 3"
            style={{ y: y2 }}
          />
          
          {/* Rocket fuselage flying from top-right */}
          <motion.g style={{ y: y1, x: x1, rotate: rotateVal }}>
            <polygon points="106,95 96,105 106,100" fill="url(#metallicLight)" stroke="#EA580C" strokeWidth="0.5" />
            <polygon points="134,95 144,105 134,100" fill="url(#metallicLight)" stroke="#EA580C" strokeWidth="0.5" />
            <path d="M110,60 C110,40 120,30 120,30 C120,30 130,40 130,60 L130,95 L110,95 Z" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <path d="M114,45 C116,36 120,30 120,30 C120,30 124,36 126,45 Z" fill="url(#neonOrange)" />
            <circle cx="120" cy="65" r="5" fill="#1C1917" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <circle cx="120" cy="65" r="2" fill="#fff" opacity="0.8" />
          </motion.g>
        </motion.g>
      </svg>
    );
  };

  // ----------------------------------------------------
  // DISTRICT B: AI FOR BUSINESS & AUTOMATION
  // ----------------------------------------------------
  const renderAIBusiness = () => {
    // Subject Variation: AI Chatbot (Speech Bubble Bot)
    if (normalizedServiceId === "ai-chatbot") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <circle cx="120" cy="90" r="80" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#A78BFA" strokeOpacity="0.2" />
            
            {/* Assembling Chat Bubble Screen */}
            <motion.g style={{ y: y1, rotate: rotateVal }}>
              <rect x="65" y="40" width="110" height="70" rx="20" fill="url(#metallicLight)" stroke="url(#neonOrange)" strokeWidth="2" />
              <polygon points="110,110 120,125 130,110" fill="#EA580C" stroke="#EA580C" strokeWidth="2" />
              
              {/* LED Blinking eyes */}
              <motion.ellipse cx="95" cy="70" rx="5" ry="6" fill="#F97316"
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
              />
              <motion.ellipse cx="145" cy="70" rx="5" ry="6" fill="#F97316"
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
              />
              <path d="M110,85 Q120,93 130,85" stroke="#FFE5D9" strokeWidth="3" strokeLinecap="round" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Subject Variation: AI Agent & Tools (Digital Orbiting Core Brain)
    if (normalizedServiceId === "ai-agent" || normalizedServiceId === "ai-tools") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <circle cx="120" cy="90" r="80" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#A78BFA" strokeOpacity="0.2" />
            
            {/* Brain intelligence Core flying from top */}
            <motion.g style={{ y: y1 }}>
              <circle cx="120" cy="85" r="26" fill="url(#aiHolo)" stroke="url(#neonOrange)" strokeWidth="2" />
              <circle cx="120" cy="85" r="18" fill="#0C0A09" opacity="0.4" />
              <circle cx="120" cy="85" r="8" fill="#FFE5D9" />
            </motion.g>

            {/* Orbiting planet-style rings */}
            <motion.g 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "120px 85px" }}
            >
              <ellipse cx="120" cy="85" rx="55" ry="18" stroke="url(#aiHolo)" strokeWidth="1.5" strokeDasharray="10 5" />
              <circle cx="65" cy="85" r="5" fill="#EA580C" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Default Volumetric Robot helper
    return (
      <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <GradientDefs />
        <circle cx="120" cy="90" r="80" fill="url(#bgGlow)" />
        
        <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#A78BFA" strokeOpacity="0.2" strokeWidth="1.5" />
        
        <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
          {/* Main 3D Robot chest/body rising from below */}
          <motion.g style={{ y: y2 }}>
            <rect x="100" y="85" width="40" height="24" rx="6" fill="url(#metallicDark)" stroke="#F97316" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="104" y="89" width="32" height="6" rx="2" fill="#1C1917" />
          </motion.g>

          {/* Head flying down from top */}
          <motion.g style={{ y: y1, rotate: rotateVal }}>
            <rect x="90" y="48" width="60" height="42" rx="12" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <rect x="96" y="53" width="48" height="32" rx="8" fill="#0C0A09" stroke="#292524" strokeWidth="1" />
            <ellipse cx="110" cy="68" rx="4" ry="5" fill="#F97316" />
            <ellipse cx="130" cy="68" rx="4" ry="5" fill="#F97316" />
          </motion.g>
        </motion.g>
      </svg>
    );
  };

  // ----------------------------------------------------
  // DISTRICT C: DIGITAL PRESENCE & BUSINESS IDENTITY
  // ----------------------------------------------------
  const renderDigitalPresence = () => {
    // Subject Variation: Email Setup (3D Volumetric Flying Envelope)
    if (normalizedServiceId === "email") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <rect width="240" height="180" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" />
            
            {/* Envelope flying in */}
            <motion.g style={{ y: y1, x: x1, rotate: rotateVal }}>
              <rect x="70" y="50" width="100" height="65" rx="8" fill="url(#metallicLight)" stroke="url(#neonOrange)" strokeWidth="2.5" />
              <path d="M70,52 L120,88 L170,52" stroke="url(#neonOrange)" strokeWidth="3" strokeLinejoin="round" fill="none" />
              
              {/* Neon particles trails */}
              <circle cx="50" cy="70" r="3" fill="#EA580C" />
              <circle cx="40" cy="85" r="2" fill="#EA580C" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Subject Variation: Domain Hosting (Spinning Coordinate Globe)
    if (normalizedServiceId === "domain-hosting") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <rect width="240" height="180" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" />
            
            {/* Wireframe Spinning Globe */}
            <motion.g style={{ y: y1, rotate: rotateVal }}>
              <circle cx="120" cy="85" r="36" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="2" />
              <ellipse cx="120" cy="85" rx="36" ry="12" stroke="#EA580C" strokeWidth="1" strokeOpacity="0.6" />
              <ellipse cx="120" cy="85" rx="12" ry="36" stroke="#EA580C" strokeWidth="1" strokeOpacity="0.6" />
              
              {/* Satellite Node */}
              <circle cx="120" cy="49" r="4" fill="#FFE5D9" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Subject Variation: SSL Security (3D Metallic Padlock)
    if (normalizedServiceId === "ssl-security") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <rect width="240" height="180" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" />
            
            <g>
              {/* Shackle flying down */}
              <motion.path 
                d="M92,75 L92,50 A28,28 0 0,1 148,50 L148,75" 
                stroke="url(#neonOrange)" 
                strokeWidth="6" 
                strokeLinecap="round" 
                fill="none"
                style={{ y: y1 }}
              />
              
              {/* Lock Body rising from below */}
              <motion.g style={{ y: y2 }}>
                <rect x="80" y="70" width="80" height="60" rx="12" fill="url(#metallicLight)" stroke="url(#neonOrange)" strokeWidth="2" />
                <circle cx="120" cy="95" r="8" fill="url(#metallicDark)" />
                <polygon points="117,95 123,95 125,112 115,112" fill="url(#metallicDark)" />
                <circle cx="120" cy="95" r="3" fill="#FFE5D9" />
              </motion.g>
            </g>
          </motion.g>
        </svg>
      );
    }

    // Default Server Telecom Antenna + Floating Browser Frame
    return (
      <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <GradientDefs />
        <rect width="240" height="180" fill="url(#bgGlow)" />
        
        <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" />
        
        <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
          {/* Antenna structural pylons */}
          <motion.g style={{ y: y2 }}>
            <line x1="75" y1="120" x2="75" y2="50" stroke="url(#metallicLight)" strokeWidth="2.5" />
            <circle cx="75" cy="50" r="5" fill="url(#neonOrange)" />
          </motion.g>

          {/* Browser Window flying from top-right */}
          <motion.g style={{ x: x1, y: y1, rotate: rotateVal }}>
            <polygon points="170,110 100,75 170,40 240,75" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <polygon points="170,50 117,76 170,40 223,66" fill="#1C1917" opacity="0.9" />
            <circle cx="127" cy="71" r="1.5" fill="#EF4444" />
          </motion.g>
        </motion.g>
      </svg>
    );
  };

  // ----------------------------------------------------
  // DISTRICT D: TRUST, COMPLIANCE & RISK REDUCTION
  // ----------------------------------------------------
  const renderTrustCompliance = () => {
    // Subject Variation: GST (Gold Coin stacks with floating tax symbols)
    if (normalizedServiceId === "gst") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <circle cx="120" cy="90" r="75" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" />
            
            {/* Rising Gold Coin Stacks */}
            <motion.g style={{ y: y2 }}>
              <polygon points="100,115 70,100 100,85 130,100" fill="url(#neonOrange)" stroke="#FFE5D9" strokeWidth="1" />
              <path d="M70,100 L70,115 A30,15 0 0,0 130,115 L130,100 Z" fill="#EA580C" stroke="#FFE5D9" strokeWidth="0.8" />
              <path d="M70,115 L70,130 A30,15 0 0,0 130,130 L130,115 Z" fill="url(#metallicDark)" stroke="#EA580C" strokeWidth="0.8" />
            </motion.g>
            
            {/* Tax Percentage symbol flying down */}
            <motion.text 
              x="92" y="70" 
              fill="#FFE5D9" 
              fontSize="28" 
              fontWeight="bold" 
              fontFamily="monospace"
              style={{ y: y1, opacity: opacityVal }}
            >
              %
            </motion.text>
          </motion.g>
        </svg>
      );
    }

    // Subject Variation: Current Account (Secure Rotating Vault Safe Dial)
    if (normalizedServiceId === "current-account") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <circle cx="120" cy="90" r="75" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" />
            
            <motion.g style={{ y: y1, rotate: rotateVal }}>
              {/* Vault structure */}
              <rect x="75" y="45" width="90" height="90" rx="16" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="2.5" />
              
              {/* Secure Dial */}
              <circle cx="120" cy="90" r="28" fill="url(#metallicLight)" stroke="#EA580C" strokeWidth="2" />
              <line x1="120" y1="62" x2="120" y2="72" stroke="#FFE5D9" strokeWidth="3" />
              <circle cx="120" cy="90" r="10" fill="url(#metallicDark)" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Subject Variation: Invoice Setup (Scrolling Invoice Sheet)
    if (normalizedServiceId === "invoice-setup") {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <GradientDefs />
          <circle cx="120" cy="90" r="75" fill="url(#bgGlow)" />
          
          <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
            <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" />
            
            {/* Sheet flying down */}
            <motion.g style={{ y: y1 }}>
              <rect x="80" y="35" width="80" height="110" rx="8" fill="url(#metallicLight)" stroke="url(#neonOrange)" strokeWidth="1.5" />
              <rect x="90" y="48" width="30" height="6" rx="2" fill="url(#neonOrange)" />
              <line x1="90" y1="68" x2="150" y2="68" stroke="#000" strokeWidth="1.5" opacity="0.3" />
              <line x1="90" y1="80" x2="135" y2="80" stroke="#000" strokeWidth="1.5" opacity="0.3" />
            </motion.g>
          </motion.g>
        </svg>
      );
    }

    // Default Trust Compliance Shield & Balance scale
    return (
      <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <GradientDefs />
        <circle cx="120" cy="90" r="75" fill="url(#bgGlow)" />
        
        <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.1" strokeWidth="1.5" />
        
        <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
          {/* Balance Scale */}
          <motion.g style={{ y: y2 }}>
            <line x1="175" y1="125" x2="175" y2="60" stroke="url(#metallicLight)" strokeWidth="3" />
          </motion.g>

          {/* Shield flying from left */}
          <motion.g style={{ x: x2, y: y1, rotate: rotateVal }}>
            <path d="M80,30 L55,42 L55,75 L80,95 Z" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <path d="M80,30 L105,42 L105,75 L80,95 Z" fill="url(#metallicLight)" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <path d="M68,60 L76,68 L92,50" stroke="#FFE5D9" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </motion.g>
      </svg>
    );
  };

  // ----------------------------------------------------
  // DISTRICT E: VISIBILITY & DISCOVERABILITY SETUP
  // ----------------------------------------------------
  const renderVisibility = () => {
    return (
      <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <GradientDefs />
        <rect width="240" height="180" fill="url(#bgGlow)" />
        
        <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.05" />
        
        <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
          {/* Signal waves appearing from below */}
          <motion.g style={{ y: y2 }}>
            <polygon points="120,135 65,110 120,85 175,110" stroke="url(#neonOrange)" strokeWidth="0.8" strokeDasharray="4 4" />
          </motion.g>

          {/* Teardrop Pin flying from top */}
          <motion.g style={{ y: y1, rotate: rotateVal }}>
            <path d="M120,118 C120,118 100,90 100,70 C100,50 120,40 120,40 Z" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <path d="M120,118 C120,118 140,90 140,70 C140,50 120,40 120,40 Z" fill="url(#metallicLight)" stroke="url(#neonOrange)" strokeWidth="1.5" />
            <circle cx="120" cy="70" r="8" fill="url(#neonOrange)" stroke="#FFE5D9" strokeWidth="1.5" />
          </motion.g>
        </motion.g>
      </svg>
    );
  };

  // ----------------------------------------------------
  // DISTRICT F: BUSINESS OPERATIONS & ESSENTIALS
  // ----------------------------------------------------
  const renderOperations = () => {
    return (
      <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <GradientDefs />
        <rect width="240" height="180" fill="url(#bgGlow)" />
        
        <polygon points="120,150 40,110 120,70 200,110" fill="url(#metallicDark)" stroke="#EA580C" strokeOpacity="0.05" />
        
        <motion.g style={{ opacity: opacityVal, scale: scaleVal }}>
          {/* Conveyor track */}
          <motion.g style={{ y: y2 }}>
            <line x1="50" y1="110" x2="160" y2="130" stroke="url(#neonOrange)" strokeWidth="2.5" />
          </motion.g>

          {/* Mechanical Gears flying from top-right */}
          <motion.g style={{ x: x1, y: y1, rotate: rotateVal }}>
            <circle cx="90" cy="65" r="32" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="2.5" strokeDasharray="12 6" />
            <circle cx="90" cy="65" r="26" fill="url(#metallicLight)" stroke="#EA580C" strokeWidth="1" />
          </motion.g>
        </motion.g>
      </svg>
    );
  };

  const renderIllustration = () => {
    switch (categoryId) {
      case "business-formation":
      case "formation":
        return renderFormation();

      case "ai-business":
      case "ai":
        return renderAIBusiness();

      case "digital-presence":
      case "digital":
        return renderDigitalPresence();

      case "trust-compliance":
      case "compliance":
      case "tax tips":
        return renderTrustCompliance();

      case "visibility":
        return renderVisibility();

      case "operations":
        return renderOperations();

      default:
        // Clean high-fidelity fallback core
        return (
          <svg viewBox="0 0 240 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <GradientDefs />
            <circle cx="120" cy="90" r="60" fill="url(#bgGlow)" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "120px 90px" }}
            >
              <rect x="90" y="60" width="60" height="60" rx="8" fill="url(#metallicDark)" stroke="url(#neonOrange)" strokeWidth="1.5" />
              <rect x="95" y="65" width="50" height="50" rx="6" fill="#000" opacity="0.4" />
            </motion.g>
          </svg>
        );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn(
        "relative rounded-2xl flex items-center justify-center transition-all duration-300 group/illustration",
        "bg-secondary/5 border border-border/5 overflow-hidden shadow-inner",
        "hover:border-primary/20 hover:bg-secondary/15 hover:shadow-[0_0_40px_rgba(234,88,12,0.12)]",
        scaleClasses[size],
        className
      )}
    >
      {/* Background isometric grid texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none group-hover/illustration:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(60deg, hsl(24 95% 53% / 0.08) 1px, transparent 1px),
            linear-gradient(-60deg, hsl(24 95% 53% / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "20px 35px",
        }}
      />

      {/* The Dynamic SVG Graphics container */}
      <div className="w-full h-full flex items-center justify-center z-10 select-none">
        {renderIllustration()}
      </div>

      {/* Accent volumetric border shine overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(251,146,60,0.15) 50%, transparent 100%)",
        }}
      />
    </motion.div>
  );
};
