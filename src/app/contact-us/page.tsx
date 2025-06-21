import Head from "next/head";
import ContactUsPage from "./ContactUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Penumbra Penned",
  description:
    "Reach out to us with questions, feedback, or inquiries. We'd love to hear from you!",
  alternates: {
    canonical: "https://penumbrapenned.com/contact-us",
  },
};

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - Get in Touch</title>
        <meta
          name="description"
          content="Reach out to us with questions, feedback, or inquiries. We'd love to hear from you!"
        />
        <meta
          name="keywords"
          content="contact, contact form, get in touch, feedback, inquiries, support"
        />
        <meta property="og:title" content="Contact Us - Get in Touch" />
        <meta
          property="og:description"
          content="Reach out to us with questions, feedback, or inquiries. We'd love to hear from you!"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/contact-us`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact Us",
              url: `${process.env.NEXT_WEB_URL}/contact-us`,
              description:
                "Reach out to us with questions, feedback, or inquiries. We'd love to hear from you!",
              mainEntity: {
                "@type": "Organization",
                name: "Penumbra",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Support",
                  email: "penumbrapress22@gmail.com",
                  availableLanguage: "English",
                },
              },
            }),
          }}
        />
      </Head>
      <ContactUsPage />
    </>
  );
}

export default ContactPage;
