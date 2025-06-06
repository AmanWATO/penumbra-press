"use client";

import { ContactForm } from "@/components/contact-us/ContactForm";
import { ContactInfo } from "@/components/contact-us/ContactInfo";
import { ContactHeader } from "@/components/contact-us/ContacyHeader";
import { PageFooter } from "@/components/contact-us/PageFooter";
import { SuccessMessage } from "@/components/contact-us/SuccessMessage";
import { useTheme } from "@/context/ThemeProvider";
import { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactUsPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <section
        id="contact"
        className="py-12 md:py-16"
        style={{ backgroundColor: theme.background.primary }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContactHeader />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              <ContactInfo />

              <div>
                {formSubmitted ? (
                  <SuccessMessage />
                ) : (
                  <ContactForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>

            <PageFooter />
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUsPage;
