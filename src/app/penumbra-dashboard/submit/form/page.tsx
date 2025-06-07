"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";

interface SubmissionData {
  title: string;
  content: string;
  format: string;
}

export default function SubmissionFormPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [format, setFormat] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const submissionData: SubmissionData = { title, content, format };
    console.log(submissionData);
    // Submission logic here
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Submit Your Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 bg-[#2e2e2e] text-white border border-gray-600 rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full h-60 p-2 bg-[#2e2e2e] text-white border border-gray-600 rounded"
          placeholder="Your entry (1500 to 5000 words)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select
          className="w-full p-2 bg-[#2e2e2e] text-white border border-gray-600 rounded"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          required
        >
          <option value="">Select Format</option>
          <option value="Poetry">Poetry</option>
          <option value="Fiction">Fiction</option>
          <option value="Epistolary">Epistolary</option>
          <option value="Creative Non-fiction">Creative Non-fiction</option>
          <option value="Flash Fiction">Flash Fiction</option>
          <option value="Short Stories">Short Stories</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 text-white rounded"
        >
          Submit Entry
        </button>
      </form>
    </DashboardLayout>
  );
}
