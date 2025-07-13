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
import CountdownTimer from "./countdown-timer";
import { resetPassword, signIn, signUp } from "@/api/backendService";

interface AuthFormProps {
  mode: "login" | "register" | "reset";
}

export default function AuthPage({ mode }: AuthFormProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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

  const getPageTitle = () => {
    switch (mode) {
      case "login":
        return "Welcome Back";
      case "register":
        return "Join The Shadow Script";
      case "reset":
        return "Reset Password";
      default:
        return "";
    }
  };

  const getPageSubtitle = () => {
    switch (mode) {
      case "login":
        return "Sign in to manage your submissions";
      case "register":
        return "Create an account to participate";
      case "reset":
        return "Enter your email to recover your account";
      default:
        return "";
    }
  };

  const getCardTitle = () => {
    switch (mode) {
      case "login":
        return "Sign In";
      case "register":
        return "Create Account";
      case "reset":
        return "Password Recovery";
      default:
        return "";
    }
  };

  const getCardDescription = () => {
    switch (mode) {
      case "login":
        return "Enter your credentials to access your account";
      case "register":
        return "Enter your details to register";
      case "reset":
        return "We will send you an email with a link to reset your password";
      default:
        return "";
    }
  };

  const getButtonText = () => {
    if (loading) return "Processing...";

    switch (mode) {
      case "login":
        return "Sign In";
      case "register":
        return "Create Account";
      case "reset":
        return "Send Reset Link";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "register" && password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      let result;

      switch (mode) {
        case "login":
          result = await signIn(email, password);
          break;
        case "register":
          result = await signUp(email, password, username);
          break;
        case "reset":
          result = await resetPassword(email);
          if (!result.error) {
            setSuccessMessage("Password reset email sent! Check your inbox.");
          }
          break;
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      if (mode === "login" || mode === "register") {
        setTimeout(() => {
          window.location.href = "/penumbra-dashboard";
        }, 100);
      }
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
        className="absolute top-10 max-md:left-5 left-10 cursor-pointer"
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
              {getPageTitle()}
            </h1>
            <p
              style={{ fontFamily: fonts.body, color: colors.lightSepia }}
              className="text-lg italic "
            >
              {getPageSubtitle()}
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
                {getCardTitle()}
              </CardTitle>
              <CardDescription style={{ color: colors.darkSepia }}>
                {getCardDescription()}
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

                  {mode === "register" && (
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
                  )}

                  {mode !== "reset" && (
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          style={{
                            fontFamily: fonts.body,
                            color: colors.inkBrown,
                          }}
                        >
                          Password
                        </Label>
                        {mode === "login" && (
                          <Link
                            href="/reset-password"
                            className="text-sm font-medium hover:underline"
                            style={{ color: colors.deepSepia }}
                          >
                            Forgot password?
                          </Link>
                        )}
                      </div>
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
                  )}

                  {mode === "register" && (
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
                  )}

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
                    {getButtonText()}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                {mode === "login" && (
                  <p style={{ color: colors.nightBlue }} className="text-sm">
                    {`Don't have an account?`}{" "}
                    <Link
                      href="/register-to-penumbra"
                      style={{ color: colors.deepSepia }}
                      className="font-medium hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                )}
                {mode === "register" && (
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
                )}
                {mode === "reset" && (
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
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
