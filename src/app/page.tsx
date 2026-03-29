"use client";

import { useState } from "react";
import { UserProfile } from "@/types";
import OnboardingCard from "@/components/OnboardingCard";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  function handleOnboardingSubmit(profile: UserProfile) {
    setTransitioning(true);
    setTimeout(() => {
      setUserProfile(profile);
    }, 400);
  }

  if (userProfile) {
    return (
      <div className="animate-fade-in">
        <Dashboard userProfile={userProfile} />
      </div>
    );
  }

  return (
    <div
      className={`relative h-screen w-screen transition-opacity duration-[400ms] ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background map placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
        {/* Faux map grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <OnboardingCard onSubmit={handleOnboardingSubmit} />
    </div>
  );
}
