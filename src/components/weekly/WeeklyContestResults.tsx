'use client'

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Award,
  Star,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";
import { WeeklyContestStats } from "@/api/apiTypes";
import { fetchWeeklyContestEntries } from "@/api/apiService";

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
        // Call the actual API function directly
        const entries = await fetchWeeklyContestEntries();
       
        // Process the data locally
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
        

        console.log({stats})

        
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
    switch (rank) {
      case "FIRST":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "SECOND":
        return <Award className="w-5 h-5 text-gray-400" />;
      case "THIRD":
        return <Award className="w-5 h-5 text-amber-600" />;
      case "FOURTH":
        return <Star className="w-5 h-5 text-blue-500" />;
      case "FIFTH":
        return <Star className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank: string): string => {
    switch (rank) {
      case "FIRST":
        return "border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-white";
      case "SECOND":
        return "border-l-4 border-gray-400 bg-gradient-to-r from-gray-50 to-white";
      case "THIRD":
        return "border-l-4 border-amber-600 bg-gradient-to-r from-amber-50 to-white";
      case "FOURTH":
        return "border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white";
      case "FIFTH":
        return "border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-white";
      default:
        return "border border-gray-200 bg-white";
    }
  };

  const getRankDisplayName = (rank: string): string => {
    switch (rank) {
      case "FIRST":
        return "1st";
      case "SECOND":
        return "2nd";
      case "THIRD":
        return "3rd";
      case "FOURTH":
        return "4th";
      case "FIFTH":
        return "5th";
      default:
        return rank;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading contest results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Separate winners from regular entries
  const winnerIds = new Set(contestData.topFive.map((entry) => entry.id));
  const regularEntries = contestData.allEntries.filter(
    (entry) => !winnerIds.has(entry.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Weekly Contest Results
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <span className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg">
              Week 1
            </span>
          </div>
        </div>

        {/* Winners Section */}
        {contestData.topFive.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🏆 Winners
              </h2>
              <p className="text-gray-600">
                Congratulations to our top performers!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {contestData.topFive.map((entry) => {
                const isExpanded = expandedCards.has(entry.id);
                const displayContent = isExpanded
                  ? entry.content
                  : truncateText(entry.content);

                return (
                  <div
                    key={entry.id}
                    className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${getRankColor(
                      entry.spotlight_rank || ""
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(entry.spotlight_rank || "")}
                        <span className="font-bold text-lg text-gray-900">
                          {getRankDisplayName(entry.spotlight_rank || "")}{" "}
                          Place
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {entry.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 text-sm text-gray-600 space-y-1 sm:space-y-0">
                      <span className="font-medium">
                        by {entry.author_name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{entry.city}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {entry.genre}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                        {displayContent}
                      </p>

                      {entry.content && entry.content.length > 300 && (
                        <button
                          onClick={() => toggleCardExpansion(entry.id)}
                          className="mt-3 flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
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
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-blue-600 mb-2">Judge&apos;s Notes:</h4>
                        <p className="text-sm text-gray-600 italic leading-relaxed">
                          &quot;{entry.judge_notes}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {regularEntries.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                All Entries
              </h2>
              <p className="text-gray-600">Every story deserves to be read</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEntries.map((entry) => {
                const isExpanded = expandedCards.has(entry.id);
                const displayContent = isExpanded
                  ? entry.content
                  : truncateText(entry.content);

                return (
                  <div
                    key={entry.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {entry.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 text-sm text-gray-600 space-y-1 sm:space-y-0">
                      <span className="font-medium">
                        by {entry.author_name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{entry.city}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {entry.genre}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="leading-relaxed whitespace-pre-wrap text-gray-700 text-sm">
                        {displayContent}
                      </p>

                      {entry.content && entry.content.length > 300 && (
                        <button
                          onClick={() => toggleCardExpansion(entry.id)}
                          className="mt-3 flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
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
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-blue-600 mb-2">Judge&apos;s Notes:</h4>
                        <p className="text-sm text-gray-600 italic leading-relaxed">
                          &quot;{entry.judge_notes}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No entries message */}
        {contestData.allEntries.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Entries Yet
            </h3>
            <p className="text-gray-600">
              No entries found for Week 1. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyContestResults;