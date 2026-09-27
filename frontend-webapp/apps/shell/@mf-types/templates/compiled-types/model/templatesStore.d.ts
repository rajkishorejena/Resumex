export interface ResumeTemplate {
    id: string;
    name: string;
    description: string;
}
export declare const TEMPLATES: ResumeTemplate[];
interface TemplatesState {
    selectedId: string;
    select: (id: string) => void;
}
export declare const useTemplatesStore: import("zustand").UseBoundStore<import("zustand").StoreApi<TemplatesState>>;
export {};
