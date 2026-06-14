export interface DocumentSnapshot {
  id: string;
  title: string;
  content: string;
  language: string;
  updatedAt: number;
}

export interface AppState {
  documents: DocumentSnapshot[];
  activeDocumentId: string | null;
}
