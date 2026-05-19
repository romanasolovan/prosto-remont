// import { openai } from "./openai";

// interface TranslationResult {
//   en: string;
//   pl: string;
//   uk: string;
//   ru: string;
// }

// export async function translateReview(
//   originalText: string,
// ): Promise<TranslationResult> {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4.1-mini",

//     messages: [
//       {
//         role: "system",
//         content: `
// You are a professional translation assistant.

// Translate the review into:
// - English
// - Polish
// - Ukrainian
// - Russian

// Return ONLY valid JSON in this exact format:

// {
//   "en": "...",
//   "pl": "...",
//   "uk": "...",
//   "ru": "..."
// }

// Do not add explanations.
//         `,
//       },
//       {
//         role: "user",
//         content: originalText,
//       },
//     ],

//     response_format: {
//       type: "json_object",
//     },
//   });

//   const content = response.choices[0].message.content;

//   if (!content) {
//     throw new Error("Translation response is empty.");
//   }

//   return JSON.parse(content);
// }
