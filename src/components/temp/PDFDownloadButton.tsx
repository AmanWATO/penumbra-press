'use client'

import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { db, WeeklyContestEntry } from "@/lib/firebase";

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PDFDownloadButtonProps {
  className?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  className = "",
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeek1Entries = async (): Promise<WeeklyContestEntry[]> => {
    try {
      const entriesRef = collection(db, "weekly-contests", "week-2", "entries");
      const querySnapshot = await getDocs(entriesRef);

      const entries: WeeklyContestEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as WeeklyContestEntry;
        entries.push(data);
      });

      return entries;
    } catch (error) {
      console.error("Error fetching week-1 entries:", error);
      throw error;
    }
  };

  const generatePDF = (entries: WeeklyContestEntry[]) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Penumbra Penned - Week 1 Contest Entries", 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Total entries: ${entries.length}`, 20, 35);

    let yPosition = 50;

    entries.forEach((entry, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text(`Entry ${index + 1}: ${entry.userStoryTitle}`, 20, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`Author: ${entry.userName} (${entry.userEmail})`, 20, yPosition);
      yPosition += 5;
      doc.text(`Genre: ${entry.userStoryGenre}`, 20, yPosition);
      yPosition += 5;
      if (entry.userCity) {
        doc.text(`City: ${entry.userCity}`, 20, yPosition);
        yPosition += 5;
      }

      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text(`Theme: ${entry.themeTitle}`, 20, yPosition);
      yPosition += 5;

      const promptLines = doc.splitTextToSize(
        `Prompt: ${entry.themePrompt}`,
        170
      );
      doc.text(promptLines, 20, yPosition);
      yPosition += promptLines.length * 5 + 5;

      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const storyLines = doc.splitTextToSize(entry.userStoryContent, 170);

      if (yPosition + storyLines.length * 4 > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.text(storyLines, 20, yPosition);
      yPosition += storyLines.length * 4 + 15;

      if (index < entries.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPosition - 5, 190, yPosition - 5);
        yPosition += 5;
      }
    });

    return doc;
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);

    try {
      const entries = await fetchWeek1Entries();

      if (entries.length === 0) {
        setError("No entries found for week-1");
        return;
      }

      const pdf = generatePDF(entries);
      pdf.save(
        `penumbra-penned-week1-entries-${
          new Date().toISOString().split("T")[0]
        }.pdf`
      );
    } catch (err) {
      setError("Failed to download PDF. Please try again.");
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`
          px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
          disabled:bg-gray-400 disabled:cursor-not-allowed
          transition-colors duration-200
          ${className}
        `}
      >
        {isDownloading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating PDF...
          </span>
        ) : (
          "Download Week 1 Entries (PDF)"
        )}
      </button>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PDFDownloadButton;
