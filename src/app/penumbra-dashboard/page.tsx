"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthState from "@/hooks/useAuthState";
import { logOut } from "@/lib/firebase";
import { colors, fonts } from "@/styles/theme";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuthState();
  const [countdown, setCountdown] = useState(10);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.replace("/login-to-penumbra");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logOut();
      router.push("/login-to-penumbra");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{ backgroundColor: colors.penumbraBlack, color: colors.gray100 }}
        className="min-h-screen flex items-center justify-center"
      >
        <p style={{ fontFamily: fonts.body }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{ backgroundColor: colors.penumbraBlack, color: colors.gray100 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <Card
          style={{
            backgroundColor: colors.parchment,
            borderColor: colors.inkBrown,
          }}
          className="w-full max-w-md"
        >
          <CardHeader>
            <CardTitle
              style={{ fontFamily: fonts.heading, color: colors.inkBrown }}
            >
              Authentication Required
            </CardTitle>
            <CardDescription style={{ color: colors.darkSepia }}>
              You need to be logged in to view this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center" style={{ color: colors.inkBrown }}>
              <p className="mb-4">
                You will be redirected to the login page in {countdown} seconds.
              </p>
              <Button
                onClick={() => router.push("/login-to-penumbra")}
                style={{
                  fontFamily: fonts.button,
                  backgroundColor: colors.deepSepia,
                  color: colors.cream,
                }}
                className="shadow-lg hover:brightness-110 transition-all duration-200"
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: colors.penumbraBlack, color: colors.gray100 }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1
              style={{ fontFamily: fonts.heading, color: colors.parchment }}
              className="text-3xl md:text-4xl mb-2"
            >
              Penumbra Dashboard
            </h1>
            <p
              style={{ fontFamily: fonts.body, color: colors.lightSepia }}
              className="text-lg italic"
            >
              Welcome, {user.email}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              fontFamily: fonts.button,
              backgroundColor: loggingOut ? colors.gray500 : colors.deepSepia,
              color: colors.cream,
            }}
            className="mt-4 md:mt-0 shadow-lg hover:brightness-110 transition-all duration-200"
          >
            {loggingOut ? "Logging out..." : "Sign Out"}
          </Button>
        </header>

        {/* Dashboard content would go here */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            style={{
              backgroundColor: colors.parchment,
              borderColor: colors.inkBrown,
            }}
          >
            <CardHeader>
              <CardTitle
                style={{ fontFamily: fonts.heading, color: colors.inkBrown }}
              >
                My Submissions
              </CardTitle>
              <CardDescription style={{ color: colors.darkSepia }}>
                Manage your contest entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: colors.moonGray }}>
                You have not submitted any entries yet.
              </p>
            </CardContent>
          </Card>

          <Card
            style={{
              backgroundColor: colors.parchment,
              borderColor: colors.inkBrown,
            }}
          >
            <CardHeader>
              <CardTitle
                style={{ fontFamily: fonts.heading, color: colors.inkBrown }}
              >
                Contest Status
              </CardTitle>
              <CardDescription style={{ color: colors.darkSepia }}>
                Current submissions and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: colors.moonGray }}>
                Submissions are open until July 25, 2025.
              </p>
            </CardContent>
          </Card>

          <Card
            style={{
              backgroundColor: colors.parchment,
              borderColor: colors.inkBrown,
            }}
          >
            <CardHeader>
              <CardTitle
                style={{ fontFamily: fonts.heading, color: colors.inkBrown }}
              >
                Account Settings
              </CardTitle>
              <CardDescription style={{ color: colors.darkSepia }}>
                Manage your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: colors.moonGray }}>
                Update your account details and preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
