export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  slug: string;
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "The Art of Storytelling in Modern Literature",
    excerpt:
      "Exploring how contemporary authors craft compelling narratives that resonate with today's readers.",
    content: `In the ever-evolving landscape of modern literature, storytelling is no longer just an art — it’s a dynamic symphony of form, function, and feeling. Authors today navigate between the magnetic pull of classical narrative arcs and the chaos of experimental form, crafting stories that refuse to sit still.

The digital age has infused storytelling with new dimensions — multimedia, hypertextuality, even AI-driven collaborations. Readers aren’t just consuming stories; they’re immersed in experiences. From interactive web novels to serialized Instagram fiction, the stage has exploded.

What truly captivates modern audiences is authenticity. Today’s reader seeks vulnerability, cultural nuance, and truth-telling wrapped in lyrical prose. This demand has pushed literature into a golden renaissance of diverse voices and intimate, emotionally raw narratives.

Social media now serves as a global campfire, where readers and writers huddle close, share stories, and spark movements. The rise of “bookstagram” and “booktok” has shown how deeply readers crave connection not just to text, but to the storyteller behind the curtain.

Genre lines blur as authors embrace hybrid storytelling — memoirs dressed as fiction, sci-fi threaded with poetry, or speculative prose laced with historical gravitas. This fearless literary alchemy signals a bright, borderless future for storytelling.`,
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V3JpdGVyfGVufDB8fDB8fHww",
    readTime: "7 min read",
    publishedAt: "2025-06-15",
    tags: ["Literature", "Writing", "Storytelling"],
    slug: "art-of-storytelling-modern-literature",
  },
  {
    id: "2",
    title: "Poetry in the Digital Age",
    excerpt:
      "How social media platforms are revolutionizing poetry and creating new forms of literary expression.",
    content: `Poetry is no longer just on parchment — it pulses through pixels, dances on screens, and sings across swipes. In the digital age, poetry is having a punk rock moment: raw, fast, and everywhere.

Instagram poetry made brevity a virtue. A few lines framed in minimalist visuals can now travel further than an epic once could. Platforms like Twitter/X and Tumblr birthed entire poetic subcultures, and TikTok gave voice to verses through rhythm and voiceovers.

Digital platforms allow for unprecedented poetic dialogue. Comments, shares, duets — they’re not just reactions; they’re refrains in a living poem. This interactivity makes poetry feel communal, alive, and responsive to real-time emotions and world events.

What critics once called "fast food poetry" has matured into a movement. It's poetic populism — accessible, inclusive, often political. Poets from marginalized backgrounds now rise through digital channels, no gatekeepers in sight.

New media poetry also embraces motion and sound. Visual poems, kinetic typography, AI-collaborated stanzas — these hybrids are redefining what verse can be. The screen has become a stage, and the audience, a co-creator.`,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661483333244-faab301b281d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V3JpdGVyfGVufDB8fDB8fHww",
    readTime: "6 min read",
    publishedAt: "2025-06-12",
    tags: ["Poetry", "Digital", "Social Media"],
    slug: "poetry-digital-age",
  },
  {
    id: "3",
    title: "The Psychology of Character Development",
    excerpt:
      "Understanding the psychological foundations that make fictional characters feel real and relatable to readers.",
    content: `Characters live or die by the psychology beneath their skin. A well-written character is less a figment of imagination and more a mirror — cracked, polished, or darkly clouded — of human truth.

To craft realness, authors dive deep into motivations, traumas, fears, and desires. A protagonist isn’t simply brave or broken — they are a sum of contradictions, just like us. The flaws, the inconsistencies, the quiet doubts — that’s what hooks a reader’s heart.

Internal conflict is key. Growth isn't linear; it's laced with setbacks and regressions. The best character arcs feel earned, not engineered. Transformation stems from internal revolutions, often triggered by external pressures that test values and worldviews.

Backstory is more than exposition — it's emotional architecture. Writers must know their characters like shadow knows light — intimately and inversely. What they hide, what they fear, what they've survived — these shape how they speak, act, and evolve.

Dialogue is psychology made audible. Word choice, pauses, tangents, even silence — all reveal what's unsaid. It’s in the gaps that readers find the truth.`,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661603880712-ff0770c1476d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fFdyaXRlcnxlbnwwfHwwfHx8MA%3D%3D",
    readTime: "7 min read",
    publishedAt: "2025-06-10",
    tags: ["Writing", "Psychology", "Character"],
    slug: "psychology-character-development",
  },
  {
    id: "4",
    title: "The Power of Metaphor in Literary Expression",
    excerpt:
      "Examining how metaphors shape meaning and create deeper connections between writers and readers.",
    content: `Metaphors are shortcuts to the soul. They give wings to thoughts too heavy for literal language and pull readers into unspoken dimensions of feeling.

Good metaphors don’t just decorate a sentence — they detonate it. They plant seeds of imagery that bloom in a reader’s mind, long after the page is turned.

Writers use metaphor not to confuse, but to clarify — to link the abstract with the intimate. A heart isn't just broken, it's a clock stopped mid-tick. Time isn't passing, it's slipping like sand through fingers. These aren’t just phrases — they’re keys to understanding the human condition.

Extended metaphors can be scaffolding for entire novels. Consider Orwell’s *Animal Farm* or Atwood’s *The Handmaid’s Tale* — the metaphor isn't just within the text, it **is** the text.

And in a world powered by tech, today’s metaphors evolve. We sync like Bluetooth. Emotions buffer. Memories are backed up or corrupted. The metaphor mirrors the zeitgeist — and the reader’s inner world.`,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1744277029671-9c5209cf9ccf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ldHJ5JTIwbWV0YXBob3JzfGVufDB8fDB8fHww",
    readTime: "6 min read",
    publishedAt: "2025-06-08",
    tags: ["Literature", "Metaphor", "Writing"],
    slug: "power-of-metaphor-literary-expression",
  },
  {
    id: "5",
    title: "Writing Across Cultures: A Global Perspective",
    excerpt:
      "Exploring how cultural background influences storytelling and the challenges of cross-cultural communication.",
    content: `In a globalized world, the pen crosses borders — but it must tread gently. Writing across cultures isn’t just about inclusion; it’s about immersion, understanding, and respect.

Surface-level representation is easy. Authentic cultural storytelling requires deeper exploration — into belief systems, communication nuances, and even non-verbal cues. Stereotypes die when curiosity is genuine.

Translation, both linguistic and cultural, is a delicate act. What one culture sees as sacred, another might find casual. The challenge lies in conveying the **feeling** behind the word, not just its dictionary definition.

Sensitivity readers are no longer optional — they’re essential collaborators in creating accurate, respectful narratives. The goal isn't to sanitize but to contextualize — to avoid exoticism and embrace empathy.

When done right, writing across cultures creates literature that doesn’t just inform — it transforms. It bridges worlds and dissolves assumptions, fostering unity in the most human way: story by story.`,
    imageUrl:
      "https://images.unsplash.com/photo-1637263492665-9dadcac6089f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHdyaXRpbmclMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    readTime: "7 min read",
    publishedAt: "2025-06-05",
    tags: ["Culture", "Writing", "Global"],
    slug: "writing-across-cultures-global-perspective",
  },
];

export const getBlogBySlug = (slug: string): Blog | undefined => {
  return blogs.find((blog) => blog.slug === slug);
};

export const getRecentBlogs = (count: number = 3): Blog[] => {
  return blogs
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count);
};
