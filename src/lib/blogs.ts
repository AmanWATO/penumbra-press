
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
    excerpt: "Exploring how contemporary authors craft compelling narratives that resonate with today's readers.",
    content: `In the ever-evolving landscape of modern literature, storytelling has transformed dramatically. Authors today navigate between traditional narrative structures and innovative approaches that challenge conventional boundaries.

The digital age has influenced how stories are told, with writers incorporating multimedia elements and interactive components. This evolution reflects our changing relationship with text and narrative consumption.

Modern storytelling often emphasizes authenticity and personal connection. Readers seek stories that reflect their experiences and validate their emotions. This has led to more diverse voices and perspectives in literature.

The rise of social media has also impacted storytelling, with authors using platforms to build communities around their narratives. This direct connection between writer and reader has created new opportunities for engagement and feedback.

Contemporary literature often blends genres, creating hybrid forms that defy traditional categorization. This flexibility allows authors to explore complex themes through multiple lenses, creating richer, more nuanced narratives.`,
    imageUrl: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg",
    readTime: "5 min read",
    publishedAt: "2024-01-15",
    tags: ["Literature", "Writing", "Storytelling"],
    slug: "art-of-storytelling-modern-literature"
  },
  {
    id: "2",
    title: "Poetry in the Digital Age",
    excerpt: "How social media platforms are revolutionizing poetry and creating new forms of literary expression.",
    content: `The digital revolution has breathed new life into poetry, transforming it from a traditionally elite art form into an accessible medium for mass expression. Social media platforms have become the new poetry journals.

Instagram poetry, characterized by its visual appeal and concise format, has introduced poetry to younger generations who might never have engaged with traditional verse. This accessibility has democratized poetry creation and consumption.

Digital platforms allow for immediate feedback and community building around poetic works. Poets can share their work instantly and receive responses from a global audience, creating dynamic conversations around their art.

The visual element of digital poetry has become increasingly important. Poets now consider typography, spacing, and visual design as integral parts of their artistic expression, blending visual art with literary craft.

While some critics argue that digital poetry lacks the depth of traditional forms, others celebrate its innovation and reach. The medium has created new opportunities for experimentation and cross-cultural exchange.`,
    imageUrl: "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg",
    readTime: "4 min read",
    publishedAt: "2024-01-10",
    tags: ["Poetry", "Digital", "Social Media"],
    slug: "poetry-digital-age"
  },
  {
    id: "3",
    title: "The Psychology of Character Development",
    excerpt: "Understanding the psychological foundations that make fictional characters feel real and relatable to readers.",
    content: `Creating believable characters is one of the most challenging aspects of writing fiction. The psychology behind character development involves understanding human motivation, behavior patterns, and emotional responses.

Successful characters often possess contradictions and internal conflicts that mirror real human complexity. These inconsistencies make characters feel authentic rather than perfect, allowing readers to connect with their struggles and growth.

Character arcs should reflect genuine psychological change. This transformation often involves overcoming internal obstacles, learning from mistakes, and developing new perspectives through experience and challenge.

The backstory of a character influences their present actions and decisions. Writers must understand their characters' histories, traumas, and formative experiences to create authentic behavioral patterns and responses.

Dialogue reveals character psychology through speech patterns, word choices, and communication styles. What characters don't say can be as revealing as what they do say, showing their internal states and hidden motivations.`,
    imageUrl: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg",
    readTime: "6 min read",
    publishedAt: "2024-01-05",
    tags: ["Writing", "Psychology", "Character"],
    slug: "psychology-character-development"
  },
  {
    id: "4",
    title: "The Power of Metaphor in Literary Expression",
    excerpt: "Examining how metaphors shape meaning and create deeper connections between writers and readers.",
    content: `Metaphors are the bridges that connect abstract concepts to concrete understanding. In literature, they serve as powerful tools for creating meaning, evoking emotion, and establishing connections between seemingly unrelated ideas.

The effectiveness of metaphor lies in its ability to make the unfamiliar familiar. By comparing new or complex concepts to known experiences, writers help readers grasp difficult ideas and emotional states.

Cultural context plays a crucial role in metaphor interpretation. What resonates with one audience may fall flat with another, highlighting the importance of understanding your readership when crafting figurative language.

Extended metaphors can structure entire works, providing a consistent framework for exploring themes. These sustained comparisons create cohesion and depth, allowing writers to explore multiple facets of their central ideas.

The evolution of metaphor reflects changing human experience. Digital age metaphors often draw from technology, while historical literature might use agricultural or maritime imagery, showing how our tools for understanding shift with our world.`,
    imageUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    readTime: "5 min read",
    publishedAt: "2023-12-28",
    tags: ["Literature", "Metaphor", "Writing"],
    slug: "power-of-metaphor-literary-expression"
  },
  {
    id: "5",
    title: "Writing Across Cultures: A Global Perspective",
    excerpt: "Exploring how cultural background influences storytelling and the challenges of cross-cultural communication.",
    content: `Writing across cultures requires sensitivity, research, and genuine respect for diverse perspectives. Authors who attempt to bridge cultural divides face unique challenges and opportunities in their creative work.

Cultural authenticity in writing goes beyond surface-level details. It requires understanding worldviews, values, communication styles, and social structures that shape how different groups experience and interpret reality.

Language itself carries cultural meaning. Translation between languages often involves cultural translation as well, adapting concepts and expressions that may not have direct equivalents in other linguistic traditions.

Collaboration with cultural consultants and sensitivity readers has become increasingly important. These partnerships help authors avoid harmful stereotypes while creating authentic, respectful representations of diverse communities.

The globalization of literature has created new opportunities for cross-cultural dialogue. Readers worldwide can access stories from different traditions, fostering understanding and empathy across cultural boundaries.`,
    imageUrl: "https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg",
    readTime: "7 min read",
    publishedAt: "2023-12-20",
    tags: ["Culture", "Writing", "Global"],
    slug: "writing-across-cultures-global-perspective"
  },
  {
    id: "6",
    title: "The Future of Reading: Digital vs. Physical Books",
    excerpt: "Analyzing the ongoing debate between digital and physical reading experiences and their impact on literacy.",
    content: `The debate between digital and physical books continues to evolve as technology advances and reading habits change. Each format offers unique advantages and challenges for readers and writers alike.

Digital books provide accessibility features that can enhance the reading experience for people with disabilities. Adjustable fonts, text-to-speech capabilities, and highlighting tools make literature more inclusive.

Physical books offer sensory experiences that digital formats cannot replicate. The tactile sensation of turning pages, the smell of paper, and the visual presence of books in physical space create emotional connections.

Environmental considerations factor into the digital versus physical debate. While e-books reduce paper consumption, they require electronic devices with their own environmental costs and energy consumption.

Reading comprehension and retention may vary between formats. Some studies suggest better comprehension with physical books, while others show no significant difference, indicating that individual preference plays a major role.

The future likely holds coexistence rather than replacement. Different reading contexts and purposes may favor different formats, with readers choosing based on their specific needs and circumstances.`,
    imageUrl: "https://images.pexels.com/photos/1005012/pexels-photo-1005012.jpeg",
    readTime: "6 min read",
    publishedAt: "2023-12-15",
    tags: ["Reading", "Technology", "Books"],
    slug: "future-reading-digital-vs-physical"
  },
  {
    id: "7",
    title: "The Role of Editing in Literary Excellence",
    excerpt: "Understanding how professional editing transforms good writing into exceptional literature.",
    content: `Editing is often the invisible force that transforms good writing into great literature. The collaborative relationship between writer and editor can elevate a work beyond its original conception.

Developmental editing focuses on big-picture elements: structure, character development, plot coherence, and thematic consistency. This stage often involves significant revisions and reimagining of major story elements.

Line editing examines sentence-level issues: clarity, flow, tone, and style. This detailed work ensures that each sentence serves the overall narrative purpose while maintaining readability and engagement.

Copy editing addresses grammar, punctuation, spelling, and factual accuracy. While these technical elements may seem mundane, they ensure that nothing distracts readers from the story itself.

The editing process is iterative, often involving multiple rounds of revision. Each pass through the manuscript can reveal new opportunities for improvement and refinement.

Self-editing skills are crucial for writers, but professional editing provides objective perspective and specialized expertise. The best writers understand that editing is not criticism but collaboration in service of the work.`,
    imageUrl: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
    readTime: "5 min read",
    publishedAt: "2023-12-10",
    tags: ["Editing", "Writing", "Publishing"],
    slug: "role-editing-literary-excellence"
  }
];

export const getBlogBySlug = (slug: string): Blog | undefined => {
  return blogs.find(blog => blog.slug === slug);
};

export const getRecentBlogs = (count: number = 3): Blog[] => {
  return blogs
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
};
