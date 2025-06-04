import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface BookProps {
  id: number;
  title: string;
  coverImage: string;
  description: string;
  link: string;
}


export const books: BookProps[] = [
  {
    id: 1,
    title: "When The Sky Meets The Sea of Souls",
    coverImage: "/book3.png",
    description:
      "Love is both a whisper and a storm, a quiet ache and a force that shapes us. When the Sky Meets the Sea of Souls is my poetic odyssey — 49 moments of love in its rawest forms. From self-discovery to healing, from the depth of solitude to the luminous unity of souls, this collection explores the spaces where love lives",
    link: "/",
  },
  {
    id: 2,
    title: "The Jumbled Flow",
    coverImage: "/book2.jpg",
    description:
      "Have you ever noticed how thoughts rarely arrive in a straight line? They mostly weave, collide, and drift — much like life itself. The Jumbled Flow was born from this very nature, a collection of poems spanning five years of wandering through emotions, reflections, and the intricate dance of human connections.",
    link: "/",
  },
];