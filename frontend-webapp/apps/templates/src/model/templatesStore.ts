import { create } from 'zustand';

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
}

export const TEMPLATES: ResumeTemplate[] = [
  { id: 'modern', name: 'Modern', description: 'Clean single-column layout with an accent header.' },
  { id: 'classic', name: 'Classic', description: 'Traditional two-column layout for print-friendly resumes.' },
  { id: 'compact', name: 'Compact', description: 'Dense layout for candidates with extensive experience.' },
];

interface TemplatesState {
  selectedId: string;
  select: (id: string) => void;
}

export const useTemplatesStore = create<TemplatesState>((set) => ({
  selectedId: TEMPLATES[0]?.id ?? 'modern',
  select: (id) => set({ selectedId: id }),
}));
