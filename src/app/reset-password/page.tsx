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
import Image from "next/image";
import { resetPassword } from "@/api/backendService";
import CountdownTimer from "@/components/countdown-timer";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthState();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const result = await resetPassword(email);
      
      if (result?.error) {
        throw new Error(result.error);
      }

      setSuccessMessage("Password reset email sent! Check your inbox.");
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
            targetDate="2025-07-21T00:00:00"
            onComplete={handleTimerComplete}
          />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1
              style={{ fontFamily: fonts.heading, color: colors.parchment }}
              className="text-3xl md:text-4xl mb-2 "
            >
              Reset Password
            </h1>
            <p
              style={{ fontFamily: fonts.body, color: colors.lightSepia }}
              className="text-lg italic "
            >
              Enter your email to recover your account
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
                Password Recovery
              </CardTitle>
              <CardDescription style={{ color: colors.darkSepia }}>
                We will send you an email with a link to reset your password
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
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert
                  className="mb-4"
                  style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
                >
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
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
                      className="focus:ring-2 focus:ring-deepSepia focus:border-transparent"
                    />
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
                    {loading ? "Processing..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <p style={{ color: colors.nightBlue }} className="text-sm">
                  Remember your password?{" "}
                  <Link
                    href="/login-to-penumbra"
                    style={{ color: colors.deepSepia }}
                    className="font-medium hover:underline"
                  >
                    Back to login
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