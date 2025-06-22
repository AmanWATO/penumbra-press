
'use client'

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Award,
  Star,
  MapPin,
  Eye,
  EyeOff,
  Users,
  PenTool,
  Calendar,
  Medal,
} from "lucide-react";
import { WeeklyContestStats } from "@/api/apiTypes";
import { fetchWeeklyContestEntries } from "@/api/apiService";
import { dashboardTheme } from "@/styles/theme";
import { motion } from "framer-motion";

const WeeklyContestResults = () => {
  const [contestData, setContestData] = useState<WeeklyContestStats>({
    totalEntries: 0,
    uniqueEntries: 0,
    uniqueAuthors: 0,
    winners: [],
    topFive: [],
    allEntries: [],
  });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContestData = async () => {
      setLoading(true);
      setError(null);

      try {
        const entries = await fetchWeeklyContestEntries();
       
        const uniqueEmails = new Set(entries.map((entry) => entry.author_email));
        const uniqueAuthors = new Set(
          entries.map((entry) => entry.author_name.toLowerCase())
        );

        const stats = {
          totalEntries: entries.length,
          uniqueEntries: uniqueEmails.size,
          uniqueAuthors: uniqueAuthors.size,
          winners: entries.filter((entry) => entry.is_winner),
          topFive: entries
            .filter(
              (entry) => entry.spotlight_rank && 
                        entry.spotlight_rank !== "NONE" && 
                        entry.spotlight_rank !== null
            )
            .sort((a, b) => {
              const rankOrder = {
                FIRST: 1,
                SECOND: 2,
                THIRD: 3,
                FOURTH: 4,
                FIFTH: 5,
              };
              const aRank =
                rankOrder[a.spotlight_rank as keyof typeof rankOrder] || 6;
              const bRank =
                rankOrder[b.spotlight_rank as keyof typeof rankOrder] || 6;
              return aRank - bRank;
            }),
          allEntries: entries,
        };

        setContestData(stats);
      } catch (err) {
        setError("Failed to load contest data");
        console.error("Error loading contest data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContestData();
  }, []);

  const toggleCardExpansion = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 300): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getRankIcon = (rank: string) => {
    const iconProps = { className: "w-5 h-5 sm:w-6 sm:h-6" };
    switch (rank) {
      case "FIRST":
        return <Trophy {...iconProps} style={{ color: "#FFD700" }} />;
      case "SECOND":
        return <Medal {...iconProps} style={{ color: "#C0C0C0" }} />;
      case "THIRD":
        return <Medal {...iconProps} style={{ color: "#CD7F32" }} />;
      case "FOURTH":
        return <Star {...iconProps} style={{ color: dashboardTheme.colors.info }} />;
      case "FIFTH":
        return <Star {...iconProps} style={{ color: dashboardTheme.colors.accent }} />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: string) => {
    const baseStyle = {
      borderRadius: dashboardTheme.radius.lg,
      boxShadow: dashboardTheme.components.button.primary.shadow,
    };

    switch (rank) {
      case "FIRST":
        return {
          ...baseStyle,
          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
          borderLeft: "4px solid #FFD700",
        };
      case "SECOND":
        return {
          ...baseStyle,
          background: "linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)",
          borderLeft: "4px solid #C0C0C0",
        };
      case "THIRD":
        return {
          ...baseStyle,
          background: "linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)",
          borderLeft: "4px solid #CD7F32",
        };
      case "FOURTH":
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${dashboardTheme.colors.info} 0%, #87CEEB 100%)`,
          borderLeft: `4px solid ${dashboardTheme.colors.info}`,
        };
      case "FIFTH":
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, ${dashboardTheme.colors.accentLight} 100%)`,
          borderLeft: `4px solid ${dashboardTheme.colors.accent}`,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: dashboardTheme.colors.cardBg,
          border: `1px solid ${dashboardTheme.colors.cardBorder}`,
        };
    }
  };

  const getRankDisplayName = (rank: string): string => {
    switch (rank) {
      case "FIRST": return "1st Place";
      case "SECOND": return "2nd Place";
      case "THIRD": return "3rd Place";
      case "FOURTH": return "4th Place";
      case "FIFTH": return "5th Place";
      default: return rank;
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: dashboardTheme.colors.primary }}
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div 
            className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"
            style={{ borderColor: dashboardTheme.colors.accent }}
          />
          <p 
            className="text-lg"
            style={{ 
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body 
            }}
          >
            Loading contest results...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: dashboardTheme.colors.primary }}
      >
        <div className="text-center p-6">
          <p 
            className="text-xl mb-4"
            style={{ 
              color: dashboardTheme.colors.error,
              fontFamily: dashboardTheme.fonts.heading 
            }}
          >
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: dashboardTheme.colors.accent,
              color: dashboardTheme.colors.activeText,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const winnerIds = new Set(contestData.topFive.map((entry) => entry.id));
  const regularEntries = contestData.allEntries.filter(
    (entry) => !winnerIds.has(entry.id)
  );

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ 
              color: dashboardTheme.colors.textPrimary,
              fontFamily: dashboardTheme.fonts.heading 
            }}
          >
            Weekly Contest Results
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <span 
              className="px-6 py-2 rounded-lg font-semibold text-lg"
              style={{
                backgroundColor: dashboardTheme.colors.accent,
                color: dashboardTheme.colors.activeText,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              Week 1
            </span>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: PenTool, label: "Total Entries", value: contestData.totalEntries },
              { icon: Users, label: "Authors", value: contestData.uniqueAuthors },
              { icon: Trophy, label: "Winners", value: contestData.topFive.length },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-4 rounded-lg text-center"
                style={{
                  backgroundColor: dashboardTheme.colors.cardBg,
                  border: `1px solid ${dashboardTheme.colors.cardBorder}`,
                  boxShadow: dashboardTheme.colors.cardShadow,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <stat.icon 
                  className="w-6 h-6 mx-auto mb-2"
                  style={{ color: dashboardTheme.colors.accent }}
                />
                <div 
                  className="text-2xl font-bold"
                  style={{ 
                    color: dashboardTheme.colors.textPrimary,
                    fontFamily: dashboardTheme.fonts.heading 
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm"
                  style={{ 
                    color: dashboardTheme.colors.textSecondary,
                    fontFamily: dashboardTheme.fonts.body 
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Winners Section */}
        {contestData.topFive.length > 0 && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ 
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.heading 
                }}
              >
                🏆 Contest Winners
              </h2>
              <p 
                style={{ 
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body 
                }}
              >
                Congratulations to our outstanding performers!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {contestData.topFive.map((entry, index) => {
                const isExpanded = expandedCards.has(entry.id);
                const displayContent = isExpanded
                  ? entry.content
                  : truncateText(entry.content);

                return (
                  <motion.div
                    key={entry.id}
                    className="p-6 transition-all duration-300 hover:scale-105"
                    style={getRankStyle(entry.spotlight_rank || "")}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(entry.spotlight_rank || "")}
                        <span 
                          className="font-bold text-lg"
                          style={{ 
                            color: dashboardTheme.colors.textPrimary,
                            fontFamily: dashboardTheme.fonts.heading 
                          }}
                        >
                          {getRankDisplayName(entry.spotlight_rank || "")}
                        </span>
                      </div>
                    </div>

                    <h3 
                      className="text-xl font-bold mb-3 leading-tight"
                      style={{ 
                        color: dashboardTheme.colors.textPrimary,
                        fontFamily: dashboardTheme.fonts.heading 
                      }}
                    >
                      {entry.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 text-sm space-y-1 sm:space-y-0">
                      <span 
                        className="font-medium"
                        style={{ 
                          color: dashboardTheme.colors.textSecondary,
                          fontFamily: dashboardTheme.fonts.body 
                        }}
                      >
                        by {entry.author_name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <MapPin 
                          className="w-4 h-4"
                          style={{ color: dashboardTheme.colors.textTertiary }}
                        />
                        <span 
                          style={{ 
                            color: dashboardTheme.colors.textTertiary,
                            fontFamily: dashboardTheme.fonts.body 
                          }}
                        >
                          {entry.city}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${dashboardTheme.colors.accent}20`,
                          color: dashboardTheme.colors.accent,
                          fontFamily: dashboardTheme.fonts.body,
                        }}
                      >
                        {entry.genre}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p 
                        className="leading-relaxed whitespace-pre-wrap"
                        style={{ 
                          color: dashboardTheme.colors.textSecondary,
                          fontFamily: dashboardTheme.fonts.body 
                        }}
                      >
                        {displayContent}
                      </p>

                      {entry.content && entry.content.length > 300 && (
                        <button
                          onClick={() => toggleCardExpansion(entry.id)}
                          className="mt-3 flex items-center space-x-1 text-sm font-medium transition-colors"
                          style={{ 
                            color: dashboardTheme.colors.accent,
                            fontFamily: dashboardTheme.fonts.body 
                          }}
                        >
                          {isExpanded ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              <span>Show Less</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              <span>Read More</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {entry.judge_notes && (
                      <div 
                        className="border-t pt-4"
                        style={{ borderColor: dashboardTheme.colors.border }}
                      >
                        <h4 
                          className="font-semibold mb-2"
                          style={{ 
                            color: dashboardTheme.colors.accent,
                            fontFamily: dashboardTheme.fonts.heading 
                          }}
                        >
                          Judge&apos;s Notes:
                        </h4>
                        <p 
                          className="text-sm italic leading-relaxed"
                          style={{ 
                            color: dashboardTheme.colors.textTertiary,
                            fontFamily: dashboardTheme.fonts.body 
                          }}
                        >
                          &quot;{entry.judge_notes}&quot;
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Entries Section */}
        {regularEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ 
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.heading 
                }}
              >
                All Entries
              </h2>
              <p 
                style={{ 
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body 
                }}
              >
                Every story deserves to be read
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEntries.map((entry, index) => {
                const isExpanded = expandedCards.has(entry.id);
                const displayContent = isExpanded
                  ? entry.content
                  : truncateText(entry.content);

                return (
                  <motion.div
                    key={entry.id}
                    className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: dashboardTheme.colors.cardBg,
                      border: `1px solid ${dashboardTheme.colors.cardBorder}`,
                      boxShadow: dashboardTheme.colors.cardShadow,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <h3 
                      className="text-lg font-bold mb-3"
                      style={{ 
                        color: dashboardTheme.colors.textPrimary,
                        fontFamily: dashboardTheme.fonts.heading 
                      }}
                    >
                      {entry.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 text-sm space-y-1 sm:space-y-0">
                      <span 
                        className="font-medium"
                        style={{ 
                          color: dashboardTheme.colors.textSecondary,
                          fontFamily: dashboardTheme.fonts.body 
                        }}
                      >
                        by {entry.author_name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <MapPin 
                          className="w-4 h-4"
                          style={{ color: dashboardTheme.colors.textTertiary }}
                        />
                        <span 
                          style={{ 
                            color: dashboardTheme.colors.textTertiary,
                            fontFamily: dashboardTheme.fonts.body 
                          }}
                        >
                          {entry.city}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${dashboardTheme.colors.textTertiary}20`,
                          color: dashboardTheme.colors.textSecondary,
                          fontFamily: dashboardTheme.fonts.body,
                        }}
                      >
                        {entry.genre}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p 
                        className="leading-relaxed whitespace-pre-wrap text-sm"
                        style={{ 
                          color: dashboardTheme.colors.textSecondary,
                          fontFamily: dashboardTheme.fonts.body 
                        }}
                      >
                        {displayContent}
                      </p>

                      {entry.content && entry.content.length > 300 && (
                        <button
                          onClick={() => toggleCardExpansion(entry.id)}
                          className="mt-3 flex items-center space-x-1 text-sm font-medium transition-colors"
                          style={{ 
                            color: dashboardTheme.colors.accent,
                            fontFamily: dashboardTheme.fonts.body 
                          }}
                        >
                          {isExpanded ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              <span>Show Less</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              <span>Read More</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {entry.judge_notes && (
                      <div 
                        className="border-t pt-4"
                        style={{ borderColor: dashboardTheme.colors.border }}
                      >
                        <h4 
                          className="font-semibold mb-2"
                          style={{ 
                            color: dashboardTheme.colors.accent,
                            fontFamily: dashboardTheme.fonts.heading 
                          }}
                        >
                          Judge&apos;s Notes:
                        </h4>
                        <p 
                          className="text-sm italic leading-relaxed"
                          style={{ 
                            color: dashboardTheme.colors.textTertiary,
                            fontFamily: dashboardTheme.fonts.body 
                          }}
                        >
                          &quot;{entry.judge_notes}&quot;
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* No entries message */}
        {contestData.allEntries.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.heading 
              }}
            >
              No Entries Yet
            </h3>
            <p 
              style={{ 
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body 
              }}
            >
              No entries found for Week 1. Check back later!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WeeklyContestResults;
