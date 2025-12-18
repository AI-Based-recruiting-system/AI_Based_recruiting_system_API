// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export interface RankedCV {
//   cv_index: number;
//   score: number;
//   match_reason: string;
// }

// export async function rankCVsWithOpenAI(
//   jobDescription: string,
//   cvTexts: string[]
// ): Promise<RankedCV[]> {
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error("OPENAI_API_KEY is not set in environment variables");
//   }

//   // Build a compact block of CVs for the prompt
//   const cvBlock = cvTexts
//     .map((cv, index) => CV ${index}:\n${cv}\n)
//     .join("\n");

//   const systemInstructions = `
// You are an AI assistant that evaluates how well CVs match a job description.
// Compare each CV to the job description and assign a score from 0 to 100.
// 100 = perfect match, 0 = no match.
// Be strict but fair. Consider skills, experience, technologies, domain, and responsibilities.
// Return ONLY valid JSON with this structure:
// {
//   "ranked": [
//     {"cv_index": <int>, "score": <int>, "match_reason": "<short explanation>"}
//   ]
// }
// Do NOT include any extra text outside the JSON.
// `;

//   const userContent = `
// Job description:
// """${jobDescription}"""

// Candidate CVs:
// ${cvBlock}
// `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4.1-mini", // cheap + good for this use case
//     response_format: { type: "json_object" },
//     messages: [
//       { role: "system", content: systemInstructions },
//       { role: "user", content: userContent },
//     ],
//   });

//   const content = response.choices[0]?.message?.content ?? "{}";

//   let parsed: { ranked?: RankedCV[] };

//   try {
//     parsed = JSON.parse(content);
//   } catch (err) {
//     console.error("Failed to parse OpenAI JSON:", err, "content:", content);
//     // Fallback: return empty list if something goes wrong
//     return [];
//   }

//   const ranked = parsed.ranked ?? [];

//   // Sort from highest to lowest score just in case
//   return ranked.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
// }