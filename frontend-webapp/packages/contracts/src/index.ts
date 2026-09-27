import { z } from 'zod';

// Minimal starter schema so the app runs today. The full multi-section
// ResumeDoc (summary/experience/skills…) is defined in 03-Architecture.md
// §9 and gets built out in Sprint 2 (see 06-Delivery-Plan.md, story RF-201).
export const ResumeDoc = z.object({
  id: z.string(),
  locale: z.string().default('en'),
  templateId: z.string(),
  version: z.number(),
  summary: z.string().default(''),
});
export type ResumeDoc = z.infer<typeof ResumeDoc>;

export const ResumePatch = z.object({
  op: z.enum(['replace', 'insert', 'remove']),
  path: z.string(),
  value: z.unknown().optional(),
});
export type ResumePatch = z.infer<typeof ResumePatch>;
