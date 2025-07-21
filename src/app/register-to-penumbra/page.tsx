"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthState from "@/hooks/useAuthState";
import { colors, fonts } from "@/styles/theme";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { signUp } from "@/api/backendService";
import CountdownTimer from "@/components/countdown-timer";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    const launchDate = new Date("2025-06-01T00:00:00");
    const now = new Date();

    if (now >= launchDate) {
      setShowAuthForm(true);
    } else {
      setShowAuthForm(false);
    }
  }, []);

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/penumbra-dashboard");
    }
  }, [user, authLoading, router]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 10);
    setPhone(numericValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (phone.length !== 10) {
        throw new Error("Phone number must be 10 digits");
      }

      // Add +91 prefix to phone number
      const phoneWithPrefix = `+91${phone}`;

      const result = await signUp(email, password, username, phoneWithPrefix);

      if (result?.error) {
        throw new Error(result.error);
      }

      setTimeout(() => {
        window.location.href = "/penumbra-dashboard";
      }, 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTimerComplete = () => {
    setShowAuthForm(true);
  };

  if (authLoading) {
    return (
      <div
        style={{ backgroundColor: colors.penumbraBlack, color: colors.cream }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="animate-pulse">
          <p style={{ fontFamily: fonts.body }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-stone-800">
      <div
        onClick={() => router.push("/")}
        className="absolute top-10 max-md:left-5 left-10 max-md:hidden cursor-pointer"
      >
        <Image
          src="/penumbra_penned.png"
          alt="Penumbra Penned"
          width={60}
          height={60}
          className="rounded-md"
        />
      </div>

      {showAuthForm ? (
        <div className="px-20 max-lg:px-10 max-md:px-5">
          <CountdownTimer
            targetDate="2025-07-21T17:00:00"
            onComplete={handleTimerComplete}
          />
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1
              style={{ fontFamily: fonts.heading, color: colors.parchment }}
              className="text-3xl md:text-4xl mb-2 "
            >
              Join The Shadow Script
            </h1>
            <p
              style={{ fontFamily: fonts.body, color: colors.lightSepia }}
              className="text-lg italic "
            >
              Create an account to participate
            </p>
          </div>

          <Card
            className="w-full border-2 shadow-md shadow-amber-900/20"
            style={{
              backgroundColor: colors.parchment,
              borderColor: colors.inkBrown,
            }}
          >
            <CardHeader>
              <CardTitle
                style={{ fontFamily: fonts.heading, color: colors.darkGray }}
              >
                Create Account
              </CardTitle>
              <CardDescription style={{ color: colors.darkSepia }}>
                Enter your details to register
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert
                  className="mb-4"
                  variant="destructive"
                  style={{
                    backgroundColor: "#fee2e2",
                    color: colors.unavailable,
                  }}
                >
                  <AlertDescription className="capitalize">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  {/* 2x2 Grid for desktop, column for mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email Field */}
                    <div className="grid gap-2">
                      <Label
                        htmlFor="email"
                        style={{ fontFamily: fonts.body, color: colors.inkBrown }}
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        style={{
                          borderColor: colors.mediumSepia,
                          color: colors.penumbraBlack,
                        }}
                        className="focus:ring-1 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    {/* Username Field */}
                    <div className="grid gap-2">
                      <Label
                        htmlFor="username"
                        style={{
                          fontFamily: fonts.body,
                          color: colors.inkBrown,
                        }}
                      >
                        Username
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        required
                        style={{
                          borderColor: colors.mediumSepia,
                          color: colors.penumbraBlack,
                        }}
                        className="focus:ring-2 focus:ring-deepSepia focus:border-transparent"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="grid gap-2">
                      <Label
                        htmlFor="password"
                        style={{
                          fontFamily: fonts.body,
                          color: colors.inkBrown,
                        }}
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          style={{
                            borderColor: colors.mediumSepia,
                            color: colors.penumbraBlack,
                          }}
                          className="pr-10 focus:ring-2 focus:ring-deepSepia focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="text-gray-500" />
                          ) : (
                            <Eye size={20} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="grid gap-2">
                      <Label
                        htmlFor="confirmPassword"
                        style={{
                          fontFamily: fonts.body,
                          color: colors.inkBrown,
                        }}
                      >
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          style={{
                            borderColor: colors.mediumSepia,
                            color: colors.penumbraBlack,
                          }}
                          className="pr-10 focus:ring-2 focus:ring-deepSepia focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} className="text-gray-500" />
                          ) : (
                            <Eye size={20} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number Field - Full width at bottom */}
                  <div className="grid gap-2">
                    <Label
                      htmlFor="phone"
                      style={{
                        fontFamily: fonts.body,
                        color: colors.inkBrown,
                      }}
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <div
                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        style={{ color: colors.mediumSepia }}
                      >
                        <span className="text-sm font-medium">+91</span>
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="9876543210"
                        required
                        maxLength={10}
                        style={{
                          borderColor: colors.mediumSepia,
                          color: colors.penumbraBlack,
                          paddingLeft: "3rem",
                        }}
                        className="focus:ring-2 focus:ring-deepSepia focus:border-transparent"
                      />
                    </div>
                    {phone && phone.length < 10 && (
                      <p className="text-xs text-red-600 mt-1">
                        Phone number must be 10 digits
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      fontFamily: fonts.button,
                      backgroundColor: loading
                        ? colors.gray500
                        : colors.deepSepia,
                      color: loading ? colors.gray200 : colors.cream,
                    }}
                    className={`w-full shadow-lg transition-all mt-4 duration-200 ${
                      loading ? "" : " hover:bg-opacity-90"
                    }`}
                  >
                    {loading ? "Processing..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <p style={{ color: colors.nightBlue }} className="text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login-to-penumbra"
                    style={{ color: colors.deepSepia }}
                    className="font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}