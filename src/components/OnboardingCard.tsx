"use client";

import { useState } from "react";
import { UserProfile } from "@/types";
import { NYC_SCHOOLS } from "@/lib/schools";

interface OnboardingCardProps {
  readonly onSubmit: (profile: UserProfile) => void;
}

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
] as const;

const ETHNICITY_OPTIONS = [
  "Black/African American",
  "Hispanic/Latino",
  "Asian",
  "White",
  "Native American",
  "Pacific Islander",
  "Two or More Races",
  "Other",
  "Prefer not to say",
] as const;

export default function OnboardingCard({ onSubmit }: OnboardingCardProps) {
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [gender, setGender] = useState("");
  const [raceEthnicity, setRaceEthnicity] = useState("");

  const isValid =
    fullName.trim() !== "" &&
    school !== "" &&
    gender !== "" &&
    raceEthnicity !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({
      fullName: fullName.trim(),
      school,
      gender,
      raceEthnicity,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md animate-fade-in-up rounded-2xl bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]"
      >
        {/* Logo / Title */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-scholarship to-learning">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            StudentMap
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Discover resources tailored to you
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-scholarship focus:bg-white focus:outline-none focus:ring-2 focus:ring-scholarship/20"
            maxLength={100}
          />
        </div>

        {/* School */}
        <div className="mb-4">
          <label
            htmlFor="school"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            School
          </label>
          <select
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-scholarship focus:bg-white focus:outline-none focus:ring-2 focus:ring-scholarship/20"
          >
            <option value="">Select your school</option>
            {NYC_SCHOOLS.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-scholarship focus:bg-white focus:outline-none focus:ring-2 focus:ring-scholarship/20"
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Race/Ethnicity */}
        <div className="mb-6">
          <label
            htmlFor="raceEthnicity"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Race/Ethnicity
          </label>
          <select
            id="raceEthnicity"
            value={raceEthnicity}
            onChange={(e) => setRaceEthnicity(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-scholarship focus:bg-white focus:outline-none focus:ring-2 focus:ring-scholarship/20"
          >
            <option value="">Select race/ethnicity</option>
            {ETHNICITY_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-gradient-to-r from-scholarship to-learning px-4 py-3 text-sm font-semibold text-white shadow-md shadow-scholarship/25 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scholarship focus-visible:ring-offset-2 active:scale-[0.98] disabled:scale-100 disabled:opacity-40 disabled:shadow-none"
        >
          Show My Resources
        </button>
      </form>
    </div>
  );
}
