export interface Config {
  app: {
    name: string;
    description: string;
  };
  about_author: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

const config: Config = {
  app: {
    name: "Penumbra Press",
    description:
      "Where words dwell between light and shadow — a haven for poetry, storytelling, and literary reflections. Explore the interplay of ink and ether.",
  },
  about_author: {
    name: "Aman Srivastava",
    email: "penumbrapress22@gmail.com",
    phoneNumber: "+91 95802 99449",
  },
};

export default config;
