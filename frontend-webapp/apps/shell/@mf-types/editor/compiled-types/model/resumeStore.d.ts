import { ResumeDoc } from '@resumex/contracts';
interface EditorState {
    doc: ResumeDoc;
    updateSummary: (text: string) => void;
}
export declare const useResumeStore: import("zustand").UseBoundStore<import("zustand").StoreApi<EditorState>>;
export {};
