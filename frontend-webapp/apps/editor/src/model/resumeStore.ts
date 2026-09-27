import { create } from 'zustand';
import { ResumeDoc } from '@resumex/contracts';

interface EditorState {
  doc: ResumeDoc;
  updateSummary: (text: string) => void;
}

const initialDoc: ResumeDoc = {
  id: 'demo',
  locale: 'en',
  templateId: 'modern',
  version: 1,
  summary: '',
};

export const useResumeStore = create<EditorState>((set) => ({
  doc: initialDoc,
  updateSummary: (text) => set((state) => ({ doc: { ...state.doc, summary: text } })),
}));
