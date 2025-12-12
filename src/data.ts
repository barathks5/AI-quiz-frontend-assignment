// src/data.ts
import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which planet is known as the Red Planet?",
    options: [
      { id: 1, text: "Earth" },
      { id: 2, text: "Mars" },
      { id: 3, text: "Jupiter" },
    ],
    correctId: 2,
  },
  {
    id: 2,
    text: "What is the largest ocean on Earth?",
    options: [
      { id: 1, text: "Indian Ocean" },
      { id: 2, text: "Atlantic Ocean" },
      { id: 3, text: "Pacific Ocean" },
    ],
    correctId: 3,
  },
  {
    id: 3,
    text: "Which gas do plants absorb from the atmosphere?",
    options: [
      { id: 1, text: "Oxygen" },
      { id: 2, text: "Carbon Dioxide" },
      { id: 3, text: "Nitrogen" },
    ],
    correctId: 2,
  },
];
